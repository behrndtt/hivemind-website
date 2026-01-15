import { IconName } from "../icons";

// Shared post types for insights and case studies
export type PostType = "insight" | "case-study";

export interface PostAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface PostResult {
  metric: string;
  label: string;
}

export interface PostTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Post {
  /** Unique identifier (used in URL slug) */
  id: string;
  /** Post type determines styling and URL structure */
  type: PostType;
  /** Post title */
  title: string;
  /** Category or industry */
  category: string;
  /** Short summary/excerpt for card display */
  summary: string;
  /** Full post content (markdown supported) */
  content?: string;
  /** Featured image URL */
  image?: string;
  /** Tags for filtering */
  tags: string[];
  /** Post author */
  author?: PostAuthor;
  /** Publication date */
  publishedAt?: string;
  /** Reading time in minutes */
  readingTime?: number;
  /** Featured posts get special treatment */
  featured?: boolean;
  /** Draft posts are not displayed */
  draft?: boolean;

  // Case study specific fields
  /** The challenge/problem (case studies) */
  challenge?: string;
  /** The solution implemented (case studies) */
  solution?: string;
  /** Measurable results (case studies) */
  results?: PostResult[];
  /** Client testimonial (case studies) */
  testimonial?: PostTestimonial;
}

export interface PostCategory {
  name: string;
  slug: string;
  count: number;
}

// Helper to get post URL based on type
export function getPostUrl(post: Post): string {
  const basePath = post.type === "case-study" ? "/case-studies" : "/insights";
  return `${basePath}/${post.id}`;
}

// Helper to filter posts
export function filterPosts(
  posts: Post[],
  options: {
    type?: PostType;
    category?: string;
    featured?: boolean;
    draft?: boolean;
    tag?: string;
  } = {}
): Post[] {
  return posts.filter((post) => {
    if (options.type && post.type !== options.type) return false;
    if (options.category && post.category !== options.category) return false;
    if (options.featured !== undefined && post.featured !== options.featured)
      return false;
    if (options.draft === false && post.draft) return false;
    if (options.tag && !post.tags.includes(options.tag)) return false;
    return true;
  });
}

// Helper to get categories with counts
export function getPostCategories(posts: Post[]): PostCategory[] {
  const categoryCounts = posts.reduce(
    (acc, post) => {
      const category = post.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    count,
  }));
}

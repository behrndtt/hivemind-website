'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icon';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { InView } from '@/components/motion-primitives/in-view';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { highlightWordsField, badgeField, buttonsListField } from '@/tina/fields/shared';
import type {
  PageBlocksPostsGrid,
  Insight,
  CaseStudy,
} from '@/tina/__generated__/types';

// Post type union for insights and case studies
type Post = Insight | CaseStudy;

/**
 * Render title with highlighted words
 */
function renderTitle(title: string, highlightWords?: string) {
  if (!highlightWords) return title;

  const words = highlightWords.split(',').map((w) => w.trim());
  const regex = new RegExp(`(${words.join('|')})`, 'gi');
  const parts = title.split(regex);

  return parts.map((part, index) =>
    words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <span key={index} className="text-primary">
        {part}
      </span>
    ) : (
      part
    )
  );
}

/**
 * Format date for display
 */
function formatDate(dateString?: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get post URL based on content type
 */
function getPostUrl(post: Post, contentType: string): string {
  if (!post._sys?.filename) return '#';
  const basePath = contentType === 'case-studies' ? '/case-studies' : '/insights';
  return `${basePath}/${post._sys.filename}`;
}

interface PostCardProps {
  post: Post;
  variant: 'card' | 'list' | 'featured' | 'compact';
  contentType: string;
}

function CardVariant({ post, contentType }: Omit<PostCardProps, 'variant'>) {
  const url = getPostUrl(post, contentType);

  return (
    <Card className="overflow-hidden">
      {post.heroImg && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.heroImg}
            alt={post.title || ''}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
        </div>
      )}
      <CardHeader className="gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {post.date && (
            <>
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </>
          )}
        </div>
        <h3 className="text-foreground group-hover:text-primary transition-colors">
          <Link href={url}>{post.title}</Link>
        </h3>
      </CardHeader>
      <CardContent>
        {post.excerpt && (
          <div className="text-muted-foreground line-clamp-3">
            <TinaMarkdown content={post.excerpt} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="text-primary p-0 hover:bg-transparent" asChild>
          <Link href={url}>
            Read more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function ListVariant({ post, contentType }: Omit<PostCardProps, 'variant'>) {
  const url = getPostUrl(post, contentType);

  return (
    <div className="group flex gap-6 py-6 border-b border-border last:border-0">
      {post.heroImg && (
        <div className="relative w-48 shrink-0 overflow-hidden rounded-lg">
          <img
            src={post.heroImg}
            alt={post.title || ''}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col justify-center">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          {post.date && (
            <>
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </>
          )}
        </div>
        <h3 className="mb-2 text-foreground group-hover:text-primary transition-colors">
          <Link href={url}>{post.title}</Link>
        </h3>
        {post.excerpt && (
          <div className="text-muted-foreground line-clamp-2">
            <TinaMarkdown content={post.excerpt} />
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedVariant({ post, contentType }: Omit<PostCardProps, 'variant'>) {
  const url = getPostUrl(post, contentType);

  return (
    <Card className="group col-span-full border-border bg-card/50 hover:border-primary/50 transition-all duration-500 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6">
        {post.heroImg && (
          <div className="relative aspect-video md:aspect-auto overflow-hidden">
            <img
              src={post.heroImg}
              alt={post.title || ''}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-background/80 hidden md:block" />
          </div>
        )}
        <div className="flex flex-col justify-center p-6">
          <Badge variant="secondary" className="mb-4 w-fit">
            Featured
          </Badge>
          <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
            {post.date && (
              <>
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </>
            )}
          </div>
          <h3 className="mb-4 text-foreground group-hover:text-primary transition-colors">
            <Link href={url}>{post.title}</Link>
          </h3>
          {post.excerpt && (
            <div className="mb-6 text-muted-foreground">
              <TinaMarkdown content={post.excerpt} />
            </div>
          )}
          <Button variant="default" asChild>
            <Link href={url}>
              Read full story <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function CompactVariant({ post, contentType }: Omit<PostCardProps, 'variant'>) {
  const url = getPostUrl(post, contentType);

  return (
    <Link
      href={url}
      className="group flex items-center gap-4 py-4 border-b border-border last:border-0 hover:bg-card/30 px-2 -mx-2 rounded-lg transition-colors"
    >
      <div className="flex-1">
        <h3 className="text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        {post.date && (
          <span className="text-sm text-muted-foreground">{formatDate(post.date)}</span>
        )}
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </Link>
  );
}

function PostCard({ post, variant, contentType }: PostCardProps) {
  switch (variant) {
    case 'list':
      return <ListVariant post={post} contentType={contentType} />;
    case 'featured':
      return <FeaturedVariant post={post} contentType={contentType} />;
    case 'compact':
      return <CompactVariant post={post} contentType={contentType} />;
    case 'card':
    default:
      return <CardVariant post={post} contentType={contentType} />;
  }
}

export interface PostsGridProps {
  data: PageBlocksPostsGrid;
  posts?: Post[];
  /**
   * Optional sidebar content to render alongside posts.
   * When provided with showSidebar=true, displays a two-column layout.
   */
  sidebarContent?: React.ReactNode;
  /**
   * List of unique tags from all posts for the TagsSidebar.
   */
  tags?: Array<{ name: string; slug: string; count?: number }>;
}

type PostVariant = 'card' | 'list' | 'featured' | 'compact';

/**
 * PostsGrid component
 * NOTE: Posts should be fetched server-side and passed as props.
 * This component handles rendering only.
 */
export function PostsGrid({ data, posts = [], sidebarContent, tags }: PostsGridProps) {
  const variant = (data.variant || 'card') as PostVariant;
  const columns = data.columns || 3;
  const contentType = data.contentType || 'insights';
  const limit = data.limit || 6;
  const showSidebar = data.showSidebar && sidebarContent;

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(limit);

  // Sort posts: featured first (newest featured post), then all posts by date
  const sortedPosts = (() => {
    // Find newest featured post
    const featuredPosts = posts
      .filter((post) => (post as any).featured === true)
      .sort((a, b) => {
        const dateA = new Date(a.date || '').getTime();
        const dateB = new Date(b.date || '').getTime();
        return dateB - dateA;
      });
    
    const newestFeatured = featuredPosts[0];
    
    // Sort all posts by date
    const allPostsByDate = [...posts].sort((a, b) => {
      const dateA = new Date(a.date || '').getTime();
      const dateB = new Date(b.date || '').getTime();
      return dateB - dateA;
    });
    
    // If there's a featured post, put it first, then all posts
    if (newestFeatured) {
      return [newestFeatured, ...allPostsByDate];
    }
    
    return allPostsByDate;
  })();

  // Limit visible posts based on pagination
  const displayPosts = sortedPosts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + limit);
  };

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const hasHeader = data.badge || data.title || data.subtitle;

  // For list and compact variants, use single column
  // When showing sidebar, reduce columns by 1 on large screens
  let effectiveColumns = variant === 'list' || variant === 'compact' ? 1 : columns;
  if (showSidebar && effectiveColumns > 2) {
    effectiveColumns = effectiveColumns - 1;
  }

  // Build post grid content
  const postsContent = displayPosts.length > 0 ? (
    <AnimatedGroup
      preset="blur-slide"
      className={cn(
        'grid gap-6',
        columnClasses[effectiveColumns as keyof typeof columnClasses]
      )}
    >
      {displayPosts.map((post, index) => {
        // First post is featured if it has featured flag, rest use normal variant
        const postVariant = index === 0 && (post as any).featured === true ? 'featured' : variant;
        
        return (
          <PostCard
            key={`${post._sys?.filename || index}-${index}`}
            post={post}
            variant={postVariant}
            contentType={contentType}
          />
        );
      })}
    </AnimatedGroup>
  ) : (
    <div className="text-center py-12">
      <p className="text-muted-foreground">No posts found.</p>
    </div>
  );

  return (
    <section className={cn('py-24 lg:py-32', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {hasHeader && (
          <InView
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true, margin: '-100px' }}
          >
            <div className="mb-12 text-center mx-auto max-w-3xl">
              {data.badge?.text && (
                <div data-tina-field={tinaField(data, 'badge')}>
                  <Badge
                    variant="outline"
                    className="mb-4 border-border text-muted-foreground inline-flex items-center gap-2"
                  >
                    {data.badge.icon && <Icon data={data.badge.icon} className="w-3 h-3" />}
                    {data.badge.text}
                  </Badge>
                </div>
              )}
              {data.title && (
                <h2
                  data-tina-field={tinaField(data, 'title')}
                  className="mb-4 text-3xl tracking-tight md:text-4xl text-foreground"
                >
                  {renderTitle(data.title, data.highlightWords || undefined)}
                </h2>
              )}
              {data.subtitle && (
                <p
                  data-tina-field={tinaField(data, 'subtitle')}
                  className="text-muted-foreground"
                >
                  {data.subtitle}
                </p>
              )}
            </div>
          </InView>
        )}

        {showSidebar ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            <div>
              {postsContent}
            </div>
            <aside className="space-y-6">
              {sidebarContent}
            </aside>
          </div>
        ) : (
          postsContent
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="min-w-[200px]"
            >
              Load More Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {data.buttons && data.buttons.length > 0 && (
          <div className="mt-12 flex justify-center gap-4">
            {data.buttons.map((button, index) => (
              <Button
                key={index}
                variant={(button?.variant as 'default' | 'outline' | 'ghost' | 'secondary') || 'default'}
                asChild
                data-tina-field={tinaField(button)}
              >
                <Link href={button?.href || '#'}>
                  {button?.icon && <Icon data={button.icon} className="w-4 h-4" />}
                  {button?.label}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for PostsGrid block
 */
export const postsGridBlockSchema: Template = {
  name: 'postsGrid',
  label: 'Posts Grid',
  ui: {
    defaultItem: {
      title: 'Latest Insights',
      subtitle: 'Stay updated with our latest articles and news.',
      variant: 'card',
      columns: 3,
      limit: 6,
      contentType: 'insights',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Layout Variant',
      name: 'variant',
      options: [
        { value: 'card', label: 'Card Grid' },
        { value: 'list', label: 'List View' },
        { value: 'featured', label: 'Featured (First Post Large)' },
        { value: 'compact', label: 'Compact List' },
      ],
    },
    {
      type: 'string',
      label: 'Content Type',
      name: 'contentType',
      description: 'Which content collection to display',
      options: [
        { value: 'insights', label: 'Insights (Blog Posts)' },
        { value: 'case-studies', label: 'Case Studies' },
      ],
    },
    {
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Number of columns (1-4). Ignored for list/compact variants.',
    },
    {
      type: 'number',
      label: 'Limit',
      name: 'limit',
      description: 'Maximum number of posts to display',
    },
    {
      type: 'boolean',
      label: 'Show Sidebar',
      name: 'showSidebar',
      description: 'Display a sidebar with tags and CTAs alongside posts',
    },
    badgeField as any,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    highlightWordsField as any,
    {
      type: 'string',
      label: 'Subtitle',
      name: 'subtitle',
      ui: {
        component: 'textarea',
      },
    },
    buttonsListField as any,
  ],
};

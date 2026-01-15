/**
 * Centralized Tag Definitions and Utilities
 *
 * This file replaces the separate Tag collection in TinaCMS.
 * All tag data is defined statically here for better performance and reliability.
 */

export interface TagDefinition {
  slug: string;
  name: string;
}

export interface TagInfo extends TagDefinition {
  count: number;
}

/**
 * Complete list of all available tags
 * Sorted alphabetically by slug for maintainability
 */
export const TAGS: TagDefinition[] = [
  { slug: 'acsc', name: 'ACSC' },
  { slug: 'ai', name: 'AI' },
  { slug: 'autopilot', name: 'Autopilot' },
  { slug: 'azure', name: 'Azure' },
  { slug: 'azure-virtual-desktop', name: 'Azure Virtual Desktop' },
  { slug: 'backup', name: 'Backup' },
  { slug: 'best-practices', name: 'Best Practices' },
  { slug: 'cloud-migration', name: 'Cloud Migration' },
  { slug: 'compliance', name: 'Compliance' },
  { slug: 'copilot', name: 'Copilot' },
  { slug: 'cost-optimisation', name: 'Cost Optimisation' },
  { slug: 'cybersecurity', name: 'Cybersecurity' },
  { slug: 'data-governance', name: 'Data Governance' },
  { slug: 'defender', name: 'Defender' },
  { slug: 'device-management', name: 'Device Management' },
  { slug: 'disaster-recovery', name: 'Disaster Recovery' },
  { slug: 'email-security', name: 'Email Security' },
  { slug: 'endpoint-security', name: 'Endpoint Security' },
  { slug: 'entra-id', name: 'Entra ID' },
  { slug: 'essential-eight', name: 'Essential Eight' },
  { slug: 'governance', name: 'Governance' },
  { slug: 'hybrid-cloud', name: 'Hybrid Cloud' },
  { slug: 'identity-management', name: 'Identity Management' },
  { slug: 'infrastructure', name: 'Infrastructure' },
  { slug: 'intune', name: 'Intune' },
  { slug: 'it-support', name: 'IT Support' },
  { slug: 'managed-services', name: 'Managed Services' },
  { slug: 'mfa', name: 'MFA' },
  { slug: 'microsoft-365', name: 'Microsoft 365' },
  { slug: 'onedrive', name: 'OneDrive' },
  { slug: 'security', name: 'Security' },
  { slug: 'sharepoint', name: 'SharePoint' },
  { slug: 'teams', name: 'Teams' },
  { slug: 'zero-trust', name: 'Zero Trust' },
];

// Build lookup maps for fast access
const tagsBySlug = new Map<string, TagDefinition>(
  TAGS.map((tag) => [tag.slug, tag])
);
const tagsByName = new Map<string, TagDefinition>(
  TAGS.map((tag) => [tag.name, tag])
);

/**
 * Get a tag by its slug
 */
export function getTagBySlug(slug: string): TagDefinition | undefined {
  return tagsBySlug.get(slug);
}

/**
 * Get a tag by its display name
 */
export function getTagByName(name: string): TagDefinition | undefined {
  return tagsByName.get(name);
}

/**
 * Get all tag slugs (for generateStaticParams)
 */
export function getAllTagSlugs(): string[] {
  return TAGS.map((tag) => tag.slug);
}

/**
 * Get all tags as options for the picker (value is slug, label is name)
 */
export function getTagOptions(): Array<{ value: string; label: string }> {
  return TAGS.map((tag) => ({ value: tag.slug, label: tag.name }));
}

/**
 * Tag object format stored in content files
 * Matches TinaCMS generated types like CaseStudyTags, InsightTags
 */
export interface TagObject {
  __typename?: string;
  tag?: string | null;
}

/**
 * Generic post type with tags - accepts all TinaCMS tag formats
 * TinaCMS generates: Maybe<Array<Maybe<{ tag?: string | null }>>>
 * Which expands to: (TagObject | null)[] | null | undefined
 */
export interface PostWithTags {
  tags?: (TagObject | null)[] | (string | null)[] | null;
}

/**
 * Extract and count tags from an array of posts
 * Returns tags sorted by count (descending)
 */
export function extractTagsFromPosts<T extends PostWithTags>(
  posts: T[]
): TagInfo[] {
  const tagCounts = new Map<string, TagInfo>();

  for (const post of posts) {
    if (!post.tags) continue;

    for (const tagItem of post.tags) {
      // Handle both object format { tag: 'slug' } and string format 'slug'
      const tagSlug = typeof tagItem === 'string' ? tagItem : tagItem?.tag;
      if (!tagSlug) continue;

      const existing = tagCounts.get(tagSlug);
      if (existing) {
        existing.count++;
      } else {
        // Get display name from our static definitions
        const tagDef = getTagBySlug(tagSlug);
        const name = tagDef?.name ?? formatTagSlug(tagSlug);
        tagCounts.set(tagSlug, { slug: tagSlug, name, count: 1 });
      }
    }
  }

  return Array.from(tagCounts.values()).sort((a, b) => b.count - a.count);
}

/**
 * Filter posts by tag slug
 */
export function filterPostsByTag<T extends PostWithTags>(
  posts: T[],
  tagSlug: string
): T[] {
  return posts.filter((post) => {
    if (!post.tags) return false;

    return post.tags.some((tagItem) => {
      const slug = typeof tagItem === 'string' ? tagItem : tagItem?.tag;
      return slug === tagSlug;
    });
  });
}

/**
 * Format a tag slug as a display name (fallback when not in TAGS)
 * Converts 'cost-optimisation' to 'Cost Optimisation'
 */
export function formatTagSlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

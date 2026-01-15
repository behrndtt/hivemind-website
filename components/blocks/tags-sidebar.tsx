'use client';

import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { PageBlocksTagsSidebar } from '@/tina/__generated__/types';

export interface TagsSidebarProps {
  data: PageBlocksTagsSidebar;
  /**
   * Optional list of tags to display.
   * If not provided, uses the tags configured in the block.
   */
  tags?: Array<{
    name: string;
    slug: string;
    count?: number;
  }>;
  /**
   * Base URL for tag links. Defaults to '/insights/tag'
   */
  basePath?: string;
}

/**
 * Tags Sidebar block - Displays a list of tags for filtering content.
 * Used in sidebar layouts to allow users to filter posts by tag.
 */
export function TagsSidebar({ data, tags, basePath = '/insights/tag' }: TagsSidebarProps) {
  const title = data.title || 'Tags';
  const displayTags = tags || [];

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4">
      <div className="mb-4 flex items-center gap-2 px-2">
        <Tag className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3
          data-tina-field={tinaField(data, 'title')}
          className="text-sm font-semibold text-foreground"
        >
          {title}
        </h3>
      </div>

      {displayTags.length > 0 ? (
        <nav aria-label="Filter by tag" className="flex flex-wrap gap-2 px-2">
          {displayTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`${basePath}/${tag.slug}`}
              className="group"
            >
              <Badge
                variant="outline"
                className={cn(
                  'cursor-pointer transition-colors',
                  'hover:bg-primary hover:text-primary-foreground hover:border-primary'
                )}
              >
                {tag.name}
                {typeof tag.count === 'number' && (
                  <span className="ml-1.5 text-xs opacity-60">
                    ({tag.count})
                  </span>
                )}
              </Badge>
            </Link>
          ))}
        </nav>
      ) : (
        <p className="px-2 text-sm text-muted-foreground">
          No tags available
        </p>
      )}

      {data.showAllLink && (
        <Link
          href={data.allTagsHref || basePath}
          className="mt-4 block px-2 text-sm text-primary hover:underline"
        >
          View all tags →
        </Link>
      )}
    </div>
  );
}

/**
 * TinaCMS Schema for TagsSidebar block
 */
export const tagsSidebarBlockSchema: Template = {
  name: 'tagsSidebar',
  label: 'Tags Sidebar',
  ui: {
    previewSrc: '/blocks/tags-sidebar.png',
    defaultItem: {
      title: 'Tags',
      showAllLink: false,
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      description: 'Heading for the tags section',
    },
    {
      type: 'string',
      label: 'Content Type',
      name: 'contentType',
      description: 'Which content type to show tags for',
      options: [
        { label: 'Insights', value: 'insights' },
        { label: 'Case Studies', value: 'case-studies' },
      ],
    },
    {
      type: 'boolean',
      label: 'Show All Tags Link',
      name: 'showAllLink',
      description: 'Show a link to view all tags',
    },
    {
      type: 'string',
      label: 'All Tags Link',
      name: 'allTagsHref',
      description: 'URL for the "View all tags" link',
    },
  ],
};

'use client';

import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { InView } from '@/components/motion-primitives/in-view';
import { Card, CardContent } from '@/components/ui/card';
import { sectionBlockSchemaField } from '@/components/layout/section';

// Type definitions - will be replaced by generated types after `tinacms build`
interface DraftTopicItem {
  [key: string]: unknown;
  title?: string | null;
  category?: string | null;
}

interface DraftTopicsData {
  [key: string]: unknown;
  section?: {
    padding?: string | null;
    width?: string | null;
  } | null;
  title?: string | null;
  items?: (DraftTopicItem | null)[] | null;
}

export interface DraftTopicsProps {
  data: DraftTopicsData;
}

/**
 * DraftTopics Block
 * 
 * Displays a grid of upcoming/draft content topics with numbered badges.
 * Useful for showing "Coming Soon" content or topics in progress.
 */
export function DraftTopics({ data }: DraftTopicsProps) {
  if (!data.items || data.items.length === 0) {
    return null;
  }

  return (
    <div
      data-tina-field={tinaField(data)}
      className={data.section?.padding || 'py-16'}
    >
      <div className={data.section?.width === 'full' ? 'w-full' : 'container mx-auto px-4'}>
        <InView
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          viewOptions={{ once: true }}
        >
          {data.title && (
            <h3
              data-tina-field={tinaField(data, 'title')}
              className="mb-6 text-lg font-medium text-foreground"
            >
              {data.title}
            </h3>
          )}

          <AnimatedGroup preset="fade" className="grid gap-4 sm:grid-cols-2">
            {data.items?.map((item, index) => (
              item && <DraftTopicCard key={index} item={item} index={index} />
            ))}
          </AnimatedGroup>
        </InView>
      </div>
    </div>
  );
}

interface DraftTopicCardProps {
  item: DraftTopicItem;
  index: number;
}

function DraftTopicCard({ item, index }: DraftTopicCardProps) {
  return (
    <Card
      data-tina-field={tinaField(item)}
      className="border-border bg-card/50 hover:border-primary/50 transition-all duration-300"
    >
      <CardContent className="flex items-start gap-3 p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10 text-sm font-bold text-primary">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div>
          <h5
            data-tina-field={tinaField(item, 'title')}
            className="text-sm font-medium text-foreground"
          >
            {item.title}
          </h5>
          {item.category && (
            <p
              data-tina-field={tinaField(item, 'category')}
              className="mt-1 text-xs text-muted-foreground"
            >
              {item.category}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * TinaCMS Block Schema for DraftTopics
 */
export const draftTopicsBlockSchema: Template = {
  name: 'draftTopics',
  label: 'Draft Topics',
  ui: {
    defaultItem: {
      title: 'Topics We\'re Working On',
      items: [
        { title: 'Sample Topic', category: 'Technology' },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField as unknown as Template['fields'][number],
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      description: 'Section heading above the draft topics',
    },
    {
      type: 'object',
      label: 'Items',
      name: 'items',
      list: true,
      ui: {
        itemProps: (item: Record<string, string>) => ({
          label: item?.title || 'Draft Topic',
        }),
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Category',
          name: 'category',
        },
      ],
    },
  ],
};

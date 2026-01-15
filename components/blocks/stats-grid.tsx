'use client';

import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icon';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { InView } from '@/components/motion-primitives/in-view';
import { Card, CardContent } from '@/components/ui/card';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from '@/components/blocks/shared/block-header';
import { statsListField, badgeField, highlightWordsField } from '@/tina/fields/shared';
import type {
  PageBlocksStatsGrid,
  PageBlocksStatsGridStats,
} from '@/tina/__generated__/types';

interface StatItemProps {
  stat: PageBlocksStatsGridStats;
  variant: string;
}

/**
 * Inline strip stat - Simple row layout
 */
function InlineStripStat({ stat }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <data
        value={stat.value || ''}
        data-tina-field={tinaField(stat, 'value')}
        className="block text-primary font-serif"
      >
        {stat.value}
      </data>
      <div
        data-tina-field={tinaField(stat, 'label')}
        className="text-sm text-muted-foreground"
      >
        {stat.label}
      </div>
    </div>
  );
}

/**
 * Card grid stat - Card-based layout with optional icon
 */
function CardGridStat({ stat }: StatItemProps) {
  return (
    <Card className="text-center">
      <CardContent>
        {stat.icon && (
          <div
            data-tina-field={tinaField(stat, 'icon')}
            className="flex justify-center"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon data={stat.icon} className="w-6 h-6 text-primary" />
            </div>
          </div>
        )}
        <data
          value={stat.value || ''}
          data-tina-field={tinaField(stat, 'value')}
          className="block text-primary font-serif"
        >
          {stat.value}
        </data>
        <div
          data-tina-field={tinaField(stat, 'label')}
          className="text-sm text-muted-foreground"
        >
          {stat.label}
        </div>
        {stat.statDescription && (
          <p
            data-tina-field={tinaField(stat, 'statDescription')}
            className="text-xs text-muted-foreground"
          >
            {stat.statDescription}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export interface StatsGridProps {
  data: PageBlocksStatsGrid;
}

export function StatsGrid({ data }: StatsGridProps) {
  const variant = data.variant || 'card-grid';
  const columns = data.columns || 4;

  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-5',
  };

  // Inline strip variant - horizontal strip with border
  if (variant === 'inline-strip') {
    return (
      <section className={cn('py-12 md:py-16 border-y border-border/50', data.background || 'bg-background')}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlockHeader data={data} className="mb-8" />
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true, margin: '-100px' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.stats?.map((stat, index) => (
                <div key={index} data-tina-field={tinaField(stat)}>
                  <InlineStripStat stat={stat!} variant={variant} />
                </div>
              ))}
            </div>
          </InView>
        </div>
      </section>
    );
  }

  // Card grid variant (default)
  return (
    <section className={cn('py-12 md:py-16', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlockHeader data={data} />
        <AnimatedGroup
          preset="scale"
          className={cn(
            'grid gap-6',
            columnClasses[columns as keyof typeof columnClasses]
          )}
        >
          {data.stats?.map((stat, index) => (
            <div key={index} data-tina-field={tinaField(stat)}>
              <CardGridStat stat={stat!} variant={variant} />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for StatsGrid block
 */
export const statsGridBlockSchema: Template = {
  name: 'statsGrid',
  label: 'Stats Grid',
  ui: {
    defaultItem: {
      variant: 'card-grid',
      columns: 4,
    },
  },
  fields: [
    sectionBlockSchemaField as any,
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
    {
      type: 'string',
      label: 'Variant',
      name: 'variant',
      options: [
        { label: 'Card Grid', value: 'card-grid' },
        { label: 'Inline Strip', value: 'inline-strip' },
      ],
    },
    {
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Number of columns (2-5)',
    },
    statsListField as any,
  ],
};

'use client';

import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icon';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from '@/components/blocks/shared/block-header';
import { headerSchemaFields } from '@/tina/fields/header';
import { iconSchema } from '@/tina/fields/icon';
import { components } from '@/components/mdx-components';
import type { PageBlocksLinkCards, PageBlocksLinkCardsCards } from '@/tina/__generated__/types';

interface LinkCardProps {
  card: PageBlocksLinkCardsCards;
}

/**
 * Individual horizontal link card with icon, content, and arrow.
 * Always links to another page.
 */
function LinkCard({ card }: LinkCardProps) {
  return (
    <Link
      href={card.href || '#'}
      className="group block"
      aria-label={card.title || 'Link card'}
    >
      <Card>
        <CardContent className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            {card.icon && (
              <div
                data-tina-field={tinaField(card, 'icon')}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10"
              >
                <Icon data={card.icon} className="h-6 w-6 text-primary" />
              </div>
            )}
            <div className='flex flex-col gap-2'>
              <CardTitle
                data-tina-field={tinaField(card, 'title')}
                className="text-foreground group-hover:text-primary transition-colors"
              >
                {card.title}
              </CardTitle>
              {card.description && (
                <div
                  data-tina-field={tinaField(card, 'description')}
                  className="text-sm text-muted-foreground"
                >
                  <TinaMarkdown content={card.description} components={components} />
                </div>
              )}
            </div>
          </div>
          <ArrowRight
            className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
            aria-hidden="true"
          />
        </CardContent>
      </Card>
    </Link>
  );
}

export interface LinkCardsProps {
  data: PageBlocksLinkCards;
}

/**
 * Compact link card for sidebar use - smaller, vertical layout.
 */
function CompactLinkCard({ card }: LinkCardProps) {
  return (
    <Link
      href={card.href || '#'}
      className="group flex items-center gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors"
      aria-label={card.title || 'Link card'}
    >
      {card.icon && (
        <div
          data-tina-field={tinaField(card, 'icon')}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10"
        >
          <Icon data={card.icon} className="h-4 w-4 text-primary" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <span
          data-tina-field={tinaField(card, 'title')}
          className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate"
        >
          {card.title}
        </span>
        {card.description && (
          <div
            data-tina-field={tinaField(card, 'description')}
            className="text-xs text-muted-foreground line-clamp-1"
          >
            <TinaMarkdown content={card.description} components={components} />
          </div>
        )}
      </div>
      <ArrowRight
        className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
        aria-hidden="true"
      />
    </Link>
  );
}

/**
 * Link Cards block - Horizontal navigation cards with icon and arrow.
 * Ideal for quick navigation, category links, or action menus.
 */
export function LinkCards({ data }: LinkCardsProps) {
  const columns = data.columns || 2;
  const variant = data.variant || 'default';

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  // Compact variant for sidebars - no section wrapper, vertical list
  if (variant === 'compact') {
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4">
        {(data.title || data.subtitle) && (
          <div className="mb-3 px-3">
            {data.title && (
              <h3
                data-tina-field={tinaField(data, 'title')}
                className="text-sm font-semibold text-foreground"
              >
                {data.title}
              </h3>
            )}
            {data.subtitle && (
              <p
                data-tina-field={tinaField(data, 'subtitle')}
                className="text-xs text-muted-foreground mt-1"
              >
                {data.subtitle}
              </p>
            )}
          </div>
        )}
        <nav className="flex flex-col gap-1">
          {data.cards?.map((card, index) => (
            <div key={index} data-tina-field={tinaField(card)}>
              <CompactLinkCard card={card!} />
            </div>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <section className={cn('py-24 lg:py-32', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlockHeader data={data} />

        <AnimatedGroup
          preset="blur-slide"
          className={cn(
            'grid',
            columnClasses[columns as keyof typeof columnClasses] || columnClasses[2],
            gapClasses[(data.gap || 'md') as keyof typeof gapClasses]
          )}
        >
          {data.cards?.map((card, index) => (
            <div key={index} data-tina-field={tinaField(card)} className="h-full">
              <LinkCard card={card!} />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for LinkCards block
 */
export const linkCardsBlockSchema: Template = {
  name: 'linkCards',
  label: 'Link Cards',
  ui: {
    previewSrc: '/blocks/link-cards.png',
    defaultItem: {
      title: 'Quick Links',
      subtitle: 'Explore our offerings.',
      columns: 2,
      gap: 'md',
      variant: 'default',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Variant',
      name: 'variant',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Compact (Sidebar)', value: 'compact' },
      ],
    },
    {
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Number of columns (1-3)',
    },
    {
      type: 'string',
      label: 'Gap Size',
      name: 'gap',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    ...(headerSchemaFields.map((f) => ({ ...f })) as any[]),
    {
      type: 'object',
      label: 'Cards',
      name: 'cards',
      list: true,
      ui: {
        defaultItem: {
          title: 'Link Title',
          href: '/',
        },
        itemProps: (item: Record<string, string>) => ({
          label: item?.title || 'Link Card',
        }),
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
          required: true,
        },
        {
          type: 'rich-text',
          label: 'Description',
          name: 'description',
        },
        {
          ...iconSchema,
          label: 'Icon',
          name: 'icon',
        } as any,
        {
          type: 'string',
          label: 'Link',
          name: 'href',
          description: 'Destination URL',
        },
      ],
    },
  ],
};

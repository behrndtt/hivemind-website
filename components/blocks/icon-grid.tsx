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
import { Button } from '@/components/ui/button';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from '@/components/blocks/shared/block-header';
import { headerSchemaFields } from '@/tina/fields/header';
import { iconSchema } from '@/tina/fields/icon';
import { components } from '@/components/mdx-components';
import type { PageBlocksIconGrid, PageBlocksIconGridCards } from '@/tina/__generated__/types';

interface IconCardProps {
  card: PageBlocksIconGridCards;
  layout?: 'vertical' | 'horizontal';
  showCardWrapper?: boolean;
  iconStyle?: 'rounded' | 'square' | 'none';
}

/**
 * Individual icon card with support for vertical (centered) or horizontal (icon-left) layouts.
 * Can optionally render without card wrapper for inline list styles.
 */
function IconCard({ card, layout = 'vertical', showCardWrapper = true, iconStyle = 'rounded' }: IconCardProps) {
  const isHorizontal = layout === 'horizontal';

  // Icon container classes based on style
  const iconContainerClasses = {
    rounded: 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10',
    square: 'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10',
    none: 'shrink-0 text-primary',
  };

  const iconClasses = iconStyle === 'none' ? 'h-6 w-6' : 'h-6 w-6 text-primary';

  const content = (
    <div
      className={cn(
        isHorizontal
          ? 'flex items-center gap-4'
          : 'flex flex-col items-center text-center'
      )}
    >
      {card.icon && (
        <div
          data-tina-field={tinaField(card, 'icon')}
          className={iconContainerClasses[iconStyle]}
        >
          <Icon data={card.icon} className={iconClasses} />
        </div>
      )}
      <div className='flex flex-col gap-2'>
        <CardTitle
          data-tina-field={tinaField(card, 'title')}
          className="text-foreground"
        >
          {card.title}
        </CardTitle>
        {card.description && (
          <div
            data-tina-field={tinaField(card, 'description')}
            className="text-sm text-muted-foreground prose dark:prose-invert prose-sm max-w-none"
          >
            <TinaMarkdown content={card.description} components={components} />
          </div>
        )}
        {(card as any).value && (
          <p className={cn('font-medium text-foreground', isHorizontal && 'mt-2')}>
            {(card as any).value}
          </p>
        )}
        {card.href && card.action && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(
              'rounded-full border-border text-foreground/80 hover:border-primary hover:text-foreground',
              isHorizontal && 'mt-3'
            )}
          >
            <Link href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined}>
              {card.action}
              <ArrowRight className="ml-2 h-3 w-3" aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );

  // Wrap in card if enabled
  const cardContent = showCardWrapper ? (
    <Card>
      <CardContent>{content}</CardContent>
    </Card>
  ) : (
    <div className="py-3">{content}</div>
  );

  // If href but no action button, make whole item clickable
  if (card.href && !card.action) {
    return (
      <Link
        href={card.href}
        className="block h-full group"
        aria-label={card.title || 'Icon card'}
      >
        {cardContent}
      </Link>
    );
  }

  return <div className="block h-full">{cardContent}</div>;
}

export interface IconGridProps {
  data: PageBlocksIconGrid;
}

/**
 * Icon Grid block - Centered icon cards with auto-fit responsive grid.
 * Ideal for contact methods, quick info, or icon-focused content.
 */
export function IconGrid({ data }: IconGridProps) {
  const layout = (data as any).itemLayout || 'vertical';
  const showCardWrapper = (data as any).cardWrapper !== false;
  const iconStyle = (data as any).iconStyle || 'rounded';
  const isHorizontal = layout === 'horizontal';

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  // For horizontal layout without cards, use a simple list layout
  const gridClasses = isHorizontal && !showCardWrapper
    ? 'flex flex-col'
    : 'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] justify-center';

  return (
    <section className={cn('py-24 lg:py-32', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlockHeader data={data} />

        <AnimatedGroup
          preset="blur-slide"
          className={cn(
            gridClasses,
            gapClasses[(data.gap || 'md') as keyof typeof gapClasses]
          )}
        >
          {data.cards?.map((card, index) => (
            <div key={index} data-tina-field={tinaField(card)} className="h-full">
              <IconCard
                card={card!}
                layout={layout}
                showCardWrapper={showCardWrapper}
                iconStyle={iconStyle}
              />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for IconGrid block
 */
export const iconGridBlockSchema: Template = {
  name: 'iconGrid',
  label: 'Icon Grid',
  ui: {
    previewSrc: '/blocks/icon-grid.png',
    defaultItem: {
      title: 'Get in Touch',
      subtitle: 'Multiple ways to reach us.',
      gap: 'md',
      itemLayout: 'vertical',
      cardWrapper: true,
      iconStyle: 'rounded',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Item Layout',
      name: 'itemLayout',
      description: 'Vertical = centered cards, Horizontal = icon-left list style',
      options: [
        { label: 'Vertical (Centered)', value: 'vertical' },
        { label: 'Horizontal (Icon Left)', value: 'horizontal' },
      ],
    },
    {
      type: 'boolean',
      label: 'Card Wrapper',
      name: 'cardWrapper',
      description: 'Wrap each item in a card container (disable for minimal list style)',
    },
    {
      type: 'string',
      label: 'Icon Style',
      name: 'iconStyle',
      options: [
        { label: 'Rounded (Circle)', value: 'rounded' },
        { label: 'Square (Rounded corners)', value: 'square' },
        { label: 'None (Icon only)', value: 'none' },
      ],
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
          title: 'Card Title',
        },
        itemProps: (item: Record<string, string>) => ({
          label: item?.title || 'Icon Card',
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
          type: 'string',
          label: 'Value',
          name: 'value',
          description: 'Displayed value (e.g., phone number, email)',
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
          description: 'Optional link URL',
        },
        {
          type: 'string',
          label: 'Action Text',
          name: 'action',
          description: 'Button text (if provided, shows button instead of card link)',
        },
      ],
    },
  ],
};

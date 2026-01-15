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
import type { PageBlocksServiceCards, PageBlocksServiceCardsCards } from '@/tina/__generated__/types';

interface ServiceCardProps {
  card: PageBlocksServiceCardsCards;
}

/**
 * Individual service card with larger icon and "Learn More" CTA (ServiceOverviewCard pattern).
 * Always links to a service detail page.
 */
function ServiceCard({ card }: ServiceCardProps) {
  const cardContent = (
    <Card>
      <CardContent>
        {card.icon && (
          <div
            data-tina-field={tinaField(card, 'icon')}
            className="text-primary"
          >
            <Icon data={card.icon} className="w-10 h-10" />
          </div>
        )}
        <CardTitle
          data-tina-field={tinaField(card, 'title')}
          className="text-foreground group-hover:text-primary transition-colors"
        >
          {card.title}
        </CardTitle>
        {card.description && (
          <div
            data-tina-field={tinaField(card, 'description')}
            className="text-muted-foreground prose dark:prose-invert prose-sm"
          >
            <TinaMarkdown content={card.description} components={components} />
          </div>
        )}
        {card.href && (
          <div className="flex items-center text-primary text-sm font-medium">
            {card.action || 'Learn More'}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (card.href) {
    return (
      <Link
        href={card.href}
        className="block h-full"
        aria-label={`${card.title || 'Service'}: ${card.action || 'Learn More'}`}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export interface ServiceCardsProps {
  data: PageBlocksServiceCards;
}

/**
 * Service Cards block - Grid of service overview cards with prominent icons.
 * Ideal for showcasing services, products, or offerings with "Learn More" CTAs.
 */
export function ServiceCards({ data }: ServiceCardsProps) {
  const columns = data.columns || 3;

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <section className={cn('py-24 lg:py-32', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlockHeader data={data} />

        <AnimatedGroup
          preset="blur-slide"
          className={cn(
            'grid',
            columnClasses[columns as keyof typeof columnClasses] || columnClasses[3],
            gapClasses[(data.gap || 'md') as keyof typeof gapClasses]
          )}
        >
          {data.cards?.map((card, index) => (
            <div key={index} data-tina-field={tinaField(card)} className="h-full">
              <ServiceCard card={card!} />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for ServiceCards block
 */
export const serviceCardsBlockSchema: Template = {
  name: 'serviceCards',
  label: 'Service Cards',
  ui: {
    previewSrc: '/blocks/service-cards.png',
    defaultItem: {
      title: 'Our Services',
      subtitle: 'Comprehensive solutions for your business.',
      columns: 3,
      gap: 'md',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Number of columns (1-4)',
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
          title: 'Service Title',
          action: 'Learn More',
        },
        itemProps: (item: Record<string, string>) => ({
          label: item?.title || 'Service Card',
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
          description: 'Link to service detail page',
        },
        {
          type: 'string',
          label: 'Action Text',
          name: 'action',
          description: 'CTA text (default: "Learn More")',
        },
      ],
    },
  ],
};

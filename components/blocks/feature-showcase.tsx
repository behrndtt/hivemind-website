'use client';

import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icon';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from '@/components/blocks/shared/block-header';
import { headerSchemaFields } from '@/tina/fields/header';
import { iconSchema } from '@/tina/fields/icon';
import { components } from '@/components/mdx-components';
import type {
  PageBlocksFeatureShowcase,
  PageBlocksFeatureShowcaseCards,
  PageBlocksFeatureShowcaseCardsFeatures,
} from '@/tina/__generated__/types';

interface ShowcaseCardProps {
  card: PageBlocksFeatureShowcaseCards;
}

/**
 * Individual showcase card with horizontal layout - icon/title on left, description/features on right.
 * Implements the HorizontalCard pattern for detailed feature presentation.
 */
function ShowcaseCard({ card }: ShowcaseCardProps) {
  const cardContent = (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-3 gap-6">
        <CardHeader className="md:col-span-1 bg-muted/30 p-6 gap-4">
          {card.icon && (
            <div
              data-tina-field={tinaField(card, 'icon')}
              className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 border border-primary/20"
            >
              <Icon data={card.icon} className="h-7 w-7 text-primary" />
            </div>
          )}
          <CardTitle
            data-tina-field={tinaField(card, 'title')}
            className="text-xl text-foreground"
          >
            {card.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="md:col-span-2">
          {card.description && (
            <div
              data-tina-field={tinaField(card, 'description')}
              className="text-muted-foreground prose dark:prose-invert"
            >
              <TinaMarkdown content={card.description} components={components} />
            </div>
          )}
          {card.features && card.features.length > 0 && (
            <ul className="grid gap-2 sm:grid-cols-2" aria-label="Features">
              {card.features.map((feature: PageBlocksFeatureShowcaseCardsFeatures | null, i: number) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  <span data-tina-field={tinaField(feature, 'text')}>{feature?.text}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </div>
    </Card>
  );

  if (card.href) {
    return (
      <Link
        href={card.href}
        className="block h-full group"
        aria-label={card.title || 'Feature showcase'}
      >
        {cardContent}
      </Link>
    );
  }

  return <div className="block h-full">{cardContent}</div>;
}

export interface FeatureShowcaseProps {
  data: PageBlocksFeatureShowcase;
}

/**
 * Feature Showcase block - Wide cards spanning two columns with benefits list.
 * Ideal for detailed feature presentations with checkmark bullet points.
 */
export function FeatureShowcase({ data }: FeatureShowcaseProps) {
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
            'space-y-6',
            gapClasses[(data.gap || 'md') as keyof typeof gapClasses]
          )}
        >
          {data.cards?.map((card, index) => (
            <div key={index} data-tina-field={tinaField(card)}>
              <ShowcaseCard card={card!} />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for FeatureShowcase block
 */
export const featureShowcaseBlockSchema: Template = {
  name: 'featureShowcase',
  label: 'Feature Showcase',
  ui: {
    previewSrc: '/blocks/feature-showcase.png',
    defaultItem: {
      title: 'How We Help',
      subtitle: 'Comprehensive solutions tailored to your needs.',
      gap: 'md',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
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
          title: 'Feature Title',
        },
        itemProps: (item: Record<string, string>) => ({
          label: item?.title || 'Showcase Card',
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
          description: 'Optional link URL',
        },
        {
          type: 'object',
          label: 'Benefits',
          name: 'features',
          list: true,
          ui: {
            defaultItem: {
              text: 'Benefit item',
            },
            itemProps: (item: Record<string, string>) => ({
              label: item?.text || 'Benefit',
            }),
          },
          fields: [
            {
              type: 'string',
              label: 'Text',
              name: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

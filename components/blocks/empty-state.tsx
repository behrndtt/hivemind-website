'use client';

import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Bell, Rss, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icon';
import { InView } from '@/components/motion-primitives/in-view';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { iconSchema } from '@/tina/fields/icon';

// Type definitions - will be replaced by generated types after `tinacms build`
interface IconData {
  [key: string]: unknown;
  name?: string | null;
  color?: string | null;
  style?: string | null;
}

interface CtaData {
  [key: string]: unknown;
  label?: string | null;
  href?: string | null;
  icon?: IconData | null;
}

interface EmptyStateData {
  [key: string]: unknown;
  section?: {
    padding?: string | null;
    width?: string | null;
  } | null;
  type?: string | null;
  icon?: IconData | null;
  title?: string | null;
  description?: string | null;
  primaryCta?: CtaData | null;
  secondaryCta?: CtaData | null;
}

export interface EmptyStateProps {
  data: EmptyStateData;
}

/**
 * EmptyState Block
 * 
 * Displays a placeholder card for empty content sections with CTAs.
 * Useful for "Coming Soon" pages, empty search results, or placeholder content.
 */
export function EmptyState({ data }: EmptyStateProps) {
  // Default icon based on type
  const getDefaultIcon = () => {
    switch (data.type) {
      case 'case-study':
        return <FileText className="h-10 w-10 text-primary" />;
      case 'insight':
      default:
        return <Rss className="h-10 w-10 text-primary" />;
    }
  };

  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      viewOptions={{ once: true }}
    >
      <Card
        data-tina-field={tinaField(data)}
        className={cn(
          'border-2 border-dashed border-border bg-card/50',
          data.section?.padding || 'p-0'
        )}
      >
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          {/* Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            {data.icon ? (
              <Icon data={data.icon} className="h-10 w-10 text-primary" />
            ) : (
              getDefaultIcon()
            )}
          </div>

          {/* Title */}
          {data.title && (
            <h2
              data-tina-field={tinaField(data, 'title')}
              className="mb-4 text-foreground"
            >
              {data.title}
            </h2>
          )}

          {/* Description */}
          {data.description && (
            <p
              data-tina-field={tinaField(data, 'description')}
              className="mb-8 max-w-md text-muted-foreground"
            >
              {data.description}
            </p>
          )}

          {/* CTAs */}
          {(data.primaryCta || data.secondaryCta) && (
            <div className="flex flex-col gap-4 sm:flex-row">
              {data.secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 rounded-full border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                >
                  <Link
                    href={data.secondaryCta.href || '#'}
                    data-tina-field={tinaField(data.secondaryCta)}
                  >
                    {data.secondaryCta.icon && (
                      <Icon data={data.secondaryCta.icon} className="h-4 w-4" />
                    )}
                    {data.secondaryCta.label}
                  </Link>
                </Button>
              )}
              {data.primaryCta && (
                <Button
                  asChild
                  className="rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Link
                    href={data.primaryCta.href || '#'}
                    data-tina-field={tinaField(data.primaryCta)}
                  >
                    {data.primaryCta.icon && (
                      <Icon data={data.primaryCta.icon} className="mr-2 h-4 w-4" />
                    )}
                    {data.primaryCta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </InView>
  );
}

/**
 * CTA field template for EmptyState
 */
const ctaFields = [
  {
    type: 'string',
    label: 'Label',
    name: 'label',
    required: true,
  },
  {
    type: 'string',
    label: 'Link',
    name: 'href',
    required: true,
  },
  {
    ...iconSchema,
    label: 'Icon',
    name: 'icon',
    description: 'Optional icon to display in button',
  },
];

/**
 * TinaCMS Block Schema for EmptyState
 */
export const emptyStateBlockSchema: Template = {
  name: 'emptyState',
  label: 'Empty State',
  ui: {
    defaultItem: {
      type: 'insight',
      title: 'Content Coming Soon',
      description: 'We\'re working on adding content here. Check back soon!',
      primaryCta: {
        label: 'Contact Us',
        href: '/contact',
      },
    },
  },
  fields: [
    sectionBlockSchemaField as unknown as Template['fields'][number],
    {
      type: 'string',
      label: 'Type',
      name: 'type',
      description: 'Content type context (affects default icon)',
      options: [
        { label: 'Insight', value: 'insight' },
        { label: 'Case Study', value: 'case-study' },
      ],
    },
    {
      ...iconSchema,
      label: 'Icon',
      name: 'icon',
      description: 'Custom icon (overrides type default)',
    } as unknown as Template['fields'][number],
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'object',
      label: 'Primary CTA',
      name: 'primaryCta',
      fields: ctaFields as unknown as Template['fields'],
    },
    {
      type: 'object',
      label: 'Secondary CTA',
      name: 'secondaryCta',
      fields: ctaFields as unknown as Template['fields'],
    },
  ],
};

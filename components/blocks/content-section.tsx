'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icon';
import { InView } from '@/components/motion-primitives/in-view';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { highlightWordsField, badgeField } from '@/tina/fields/shared';
import { iconSchema } from '@/tina/fields/icon';
import { components } from '@/components/mdx-components';
import type { PageBlocksContentSection } from '@/tina/__generated__/types';

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

export interface ContentSectionProps {
  data: PageBlocksContentSection;
}

export function ContentSection({ data }: ContentSectionProps) {
  const paddingClasses: Record<string, string> = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
  };

  const layout = data.layout || 'textOnly';
  const hasImage = data.image?.src && (layout === 'imageLeft' || layout === 'imageRight');

  // Render the text content block
  const renderTextContent = () => (
    <div className={cn(
      'flex flex-col gap-4',
      hasImage ? 'lg:w-1/2' : 'max-w-3xl mx-auto',
      !hasImage && data.align === 'center' && 'text-center'
    )}>
      {data.badge?.text && (
        <div data-tina-field={tinaField(data, 'badge')}>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground inline-flex items-center gap-2"
          >
            {data.badge.icon && <Icon data={data.badge.icon} className="w-3 h-3" />}
            {data.badge.text}
          </Badge>
        </div>
      )}

      {data.title && (
        <h2
          data-tina-field={tinaField(data, 'title')}
        >
          {renderTitle(data.title, data.highlightWords || undefined)}
        </h2>
      )}

      {data.subtitle && (
        <p
          data-tina-field={tinaField(data, 'subtitle')}
          className="text-muted-foreground text-lg"
        >
          {data.subtitle}
        </p>
      )}

      {data.body && (
        <div
          data-tina-field={tinaField(data, 'body')}
          className="prose dark:prose-invert prose-lg max-w-none"
        >
          <TinaMarkdown content={data.body} components={components} />
        </div>
      )}

      {data.actions && data.actions.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {data.actions.map((action, index) => (
            <div key={index} data-tina-field={tinaField(action)}>
              <Button
                asChild
                size="lg"
                variant={action?.type === 'link' ? 'ghost' : 'default'}
                className={cn(
                  'rounded-full px-8 font-semibold',
                  action?.type === 'link'
                    ? 'text-primary hover:text-primary/80 hover:bg-transparent px-0'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                )}
              >
                <Link href={action?.link || '/'}>
                  {action?.icon && <Icon data={action.icon} className="w-4 h-4" />}
                  <span className="text-nowrap">{action?.label}</span>
                  {action?.type !== 'link' && (
                    <ArrowRight className="ml-2 w-4 h-4" />
                  )}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render the image block
  const renderImageContent = () => {
    if (!data.image?.src) return null;

    return (
      <div className="lg:w-1/2" data-tina-field={tinaField(data, 'image')}>
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-muted">
          <Image
            src={data.image.src}
            alt={data.image.alt || ''}
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  };

  return (
    <section
      className={cn(
        paddingClasses[data.padding || 'md'],
        data.background || 'bg-background'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InView
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          viewOptions={{ once: true, margin: '-100px' }}
        >
          {hasImage ? (
            <div className={cn(
              'flex flex-col lg:flex-row gap-12 lg:gap-16 items-center',
              layout === 'imageLeft' && 'lg:flex-row-reverse'
            )}>
              {renderTextContent()}
              {renderImageContent()}
            </div>
          ) : (
            renderTextContent()
          )}
        </InView>
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for ContentSection block
 */
export const contentSectionBlockSchema: Template = {
  name: 'contentSection',
  label: 'Content Section',
  ui: {
    defaultItem: {
      title: 'Section Title',
      subtitle: 'A brief description of this section.',
      align: 'left',
      padding: 'md',
      layout: 'textOnly',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Layout',
      name: 'layout',
      options: [
        { label: 'Text Only', value: 'textOnly' },
        { label: 'Image Left', value: 'imageLeft' },
        { label: 'Image Right', value: 'imageRight' },
      ],
    },
    {
      type: 'string',
      label: 'Alignment',
      name: 'align',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
      ],
    },
    {
      type: 'string',
      label: 'Padding',
      name: 'padding',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
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
    {
      type: 'rich-text',
      label: 'Body Content',
      name: 'body',
    },
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        {
          type: 'image',
          label: 'Image Source',
          name: 'src',
        },
        {
          type: 'string',
          label: 'Alt Text',
          name: 'alt',
        },
      ],
    },
    {
      type: 'object',
      label: 'Actions',
      name: 'actions',
      list: true,
      ui: {
        defaultItem: {
          label: 'Learn More',
          type: 'button',
          link: '/',
        },
        itemProps: (item: Record<string, string>) => ({
          label: item?.label || 'Action',
        }),
      },
      fields: [
        {
          type: 'string',
          label: 'Label',
          name: 'label',
        },
        {
          type: 'string',
          label: 'Type',
          name: 'type',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        {
          type: 'string',
          label: 'Link',
          name: 'link',
        },
        {
          ...iconSchema,
          label: 'Icon',
          name: 'icon',
        } as any,
      ],
    },
  ],
};

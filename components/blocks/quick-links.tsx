'use client';

import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Link2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icon';
import { iconSchema } from '@/tina/fields/icon';
import type { PageBlocksQuickLinks, PageBlocksQuickLinksLinks } from '@/tina/__generated__/types';

interface QuickLinkItemProps {
  link: PageBlocksQuickLinksLinks;
}

/**
 * Individual quick link item with optional icon.
 */
function QuickLinkItem({ link }: QuickLinkItemProps) {
  const isExternal = link.href?.startsWith('http');

  return (
    <Link
      href={link.href || '#'}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors"
    >
      {link.icon ? (
        <div
          data-tina-field={tinaField(link, 'icon')}
          className="flex h-6 w-6 shrink-0 items-center justify-center"
        >
          <Icon data={link.icon} className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      ) : (
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      )}
      <span
        data-tina-field={tinaField(link, 'label')}
        className="text-sm text-foreground group-hover:text-primary transition-colors"
      >
        {link.label}
      </span>
    </Link>
  );
}

export interface QuickLinksProps {
  data: PageBlocksQuickLinks;
}

/**
 * Quick Links block - Simple vertical list of navigation links for sidebar.
 * Lightweight alternative to LinkCards for simple navigation.
 */
export function QuickLinks({ data }: QuickLinksProps) {
  const title = data.title || 'Quick Links';

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4">
      <div className="mb-3 flex items-center gap-2 px-3">
        <Link2 className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3
          data-tina-field={tinaField(data, 'title')}
          className="text-sm font-semibold text-foreground"
        >
          {title}
        </h3>
      </div>

      {data.links && data.links.length > 0 ? (
        <nav aria-label={title} className="flex flex-col gap-1">
          {data.links.map((link, index) => (
            <div key={index} data-tina-field={tinaField(link)}>
              <QuickLinkItem link={link!} />
            </div>
          ))}
        </nav>
      ) : (
        <p className="px-3 text-sm text-muted-foreground">
          No links configured
        </p>
      )}
    </div>
  );
}

/**
 * TinaCMS Schema for QuickLinks block
 */
export const quickLinksBlockSchema: Template = {
  name: 'quickLinks',
  label: 'Quick Links',
  ui: {
    previewSrc: '/blocks/quick-links.png',
    defaultItem: {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ],
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      description: 'Heading for the quick links section',
    },
    {
      type: 'object',
      label: 'Links',
      name: 'links',
      list: true,
      ui: {
        itemProps: (item: Record<string, string>) => ({
          label: item?.label || 'Link',
        }),
      },
      fields: [
        {
          type: 'string',
          label: 'Label',
          name: 'label',
          required: true,
        },
        {
          type: 'string',
          label: 'URL',
          name: 'href',
          required: true,
        },
        {
          ...iconSchema,
          label: 'Icon',
          name: 'icon',
          description: 'Optional icon to display before the link',
        } as any,
      ],
    },
  ],
};

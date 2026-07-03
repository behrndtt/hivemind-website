'use client';

import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Mail, Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { renderTitle } from '@/lib/render-title';
import { Icon } from '@/components/icon';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { InView } from '@/components/motion-primitives/in-view';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { highlightWordsField, badgeField, contactCardsListField } from '@/tina/fields/shared';
import type {
  PageBlocksContactCards,
  PageBlocksContactCardsCards,
} from '@/tina/__generated__/types';

/**
 * Get icon component based on contact type
 */
function getContactIcon(type?: string | null) {
  switch (type) {
    case 'email':
      return Mail;
    case 'phone':
      return Phone;
    case 'address':
      return MapPin;
    default:
      return Mail;
  }
}

/**
 * Get href for contact based on type
 */
function getContactHref(type?: string | null, value?: string | null): string | null {
  if (!value) return null;
  switch (type) {
    case 'email':
      return `mailto:${value}`;
    case 'phone':
      return `tel:${value.replace(/\s/g, '')}`;
    case 'address':
      return `https://maps.google.com/?q=${encodeURIComponent(value)}`;
    default:
      return null;
  }
}

interface ContactCardProps {
  card: PageBlocksContactCardsCards;
  variant: 'cards' | 'list' | 'minimal';
}

function CardVariant({ card }: Omit<ContactCardProps, 'variant'>) {
  const IconComponent = getContactIcon(card.type);
  const href = getContactHref(card.type, card.value);

  return (
    <Card
      data-tina-field={tinaField(card)}
    >
      <CardContent className="flex flex-col items-center text-center">
        {card.image ? (
          <img
            src={card.image}
            alt={card.title || ''}
            className="h-14 w-14 rounded-full object-cover"
            data-tina-field={tinaField(card, 'image')}
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            {card.icon ? (
              <Icon data={card.icon} className="h-7 w-7 text-primary" />
            ) : (
              <IconComponent className="h-7 w-7 text-primary" />
            )}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h3
            data-tina-field={tinaField(card, 'title')}
            className="text-foreground"
          >
            {card.title}
          </h3>
          {card.contactDescription && (
            <p
              data-tina-field={tinaField(card, 'contactDescription')}
              className="text-sm text-muted-foreground"
            >
              {card.contactDescription}
            </p>
          )}
        </div>
        {card.value && (
          <p
            data-tina-field={tinaField(card, 'value')}
            className="py-2 font-sans text-foreground"
          >
            {card.value}
          </p>
        )}
        {card.href && card.action && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-border text-muted-foreground hover:border-primary hover:text-foreground"
          >
            <Link
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              data-tina-field={tinaField(card, 'action')}
            >
              {card.action}
              <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function ListVariant({ card }: Omit<ContactCardProps, 'variant'>) {
  const IconComponent = getContactIcon(card.type);
  const href = getContactHref(card.type, card.value);

  return (
    <div
      data-tina-field={tinaField(card)}
      className="flex items-start gap-4 py-4 border-b border-border last:border-0"
    >
      {card.image ? (
        <img
          src={card.image}
          alt={card.title || ''}
          className="h-10 w-10 shrink-0 rounded-lg object-cover"
          data-tina-field={tinaField(card, 'image')}
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          {card.icon ? (
            <Icon data={card.icon} className="h-5 w-5 text-primary" />
          ) : (
            <IconComponent className="h-5 w-5 text-primary" />
          )}
        </div>
      )}
      <div className="flex-1">
        <h3
          data-tina-field={tinaField(card, 'title')}
          className="font-medium text-foreground"
        >
          {card.title}
        </h3>
        {card.contactDescription && (
          <p
            data-tina-field={tinaField(card, 'contactDescription')}
            className="text-sm text-muted-foreground"
          >
            {card.contactDescription}
          </p>
        )}
        {card.value && (
          href ? (
            <Link
              href={href}
              target={card.type === 'address' ? '_blank' : undefined}
              rel={card.type === 'address' ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1 text-primary hover:underline mt-1"
              data-tina-field={tinaField(card, 'value')}
            >
              {card.value}
              {card.type === 'address' && <ExternalLink className="h-3 w-3" />}
            </Link>
          ) : (
            <span
              data-tina-field={tinaField(card, 'value')}
              className="text-foreground font-sans block mt-1"
            >
              {card.value}
            </span>
          )
        )}
      </div>
    </div>
  );
}

function MinimalVariant({ card }: Omit<ContactCardProps, 'variant'>) {
  const IconComponent = getContactIcon(card.type);
  const href = getContactHref(card.type, card.value);

  return (
    <div
      data-tina-field={tinaField(card)}
      className="flex items-center gap-3"
    >
      {card.image ? (
        <img
          src={card.image}
          alt={card.title || ''}
          className="h-5 w-5 rounded object-cover"
          data-tina-field={tinaField(card, 'image')}
        />
      ) : card.icon ? (
        <Icon data={card.icon} className="h-5 w-5 text-primary" />
      ) : (
        <IconComponent className="h-5 w-5 text-primary" />
      )}
      <div>
        <span
          data-tina-field={tinaField(card, 'title')}
          className="text-sm text-muted-foreground mr-2"
        >
          {card.title}:
        </span>
        {card.value && (
          href ? (
            <Link
              href={href}
              target={card.type === 'address' ? '_blank' : undefined}
              rel={card.type === 'address' ? 'noopener noreferrer' : undefined}
              className="text-foreground hover:text-primary transition-colors"
              data-tina-field={tinaField(card, 'value')}
            >
              {card.value}
            </Link>
          ) : (
            <span
              data-tina-field={tinaField(card, 'value')}
              className="text-foreground"
            >
              {card.value}
            </span>
          )
        )}
      </div>
    </div>
  );
}

const imageTextRatioClasses: Record<string, { image: string; text: string }> = {
  '50-50': { image: 'lg:w-1/2', text: 'lg:w-1/2' },
  '60-40': { image: 'lg:w-3/5', text: 'lg:w-2/5' },
  '40-60': { image: 'lg:w-2/5', text: 'lg:w-3/5' },
  '66-33': { image: 'lg:w-2/3', text: 'lg:w-1/3' },
  '33-66': { image: 'lg:w-1/3', text: 'lg:w-2/3' },
};

const imageTextAlignClasses: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
};

interface ImageTextVariantProps {
  card: PageBlocksContactCardsCards;
  columnRatio: string;
  imagePosition: 'left' | 'right';
  verticalAlign: string;
}

/**
 * Image + Text row - image on one side, contact details on the other.
 * Column ratio, image position, and vertical alignment are configurable per block.
 */
function ImageTextVariant({ card, columnRatio, imagePosition, verticalAlign }: ImageTextVariantProps) {
  const IconComponent = getContactIcon(card.type);
  const href = getContactHref(card.type, card.value);
  const widths = imageTextRatioClasses[columnRatio] || imageTextRatioClasses['50-50'];

  return (
    <div
      data-tina-field={tinaField(card)}
      className={cn(
        'flex flex-col lg:flex-row gap-8 lg:gap-12',
        imageTextAlignClasses[verticalAlign] || imageTextAlignClasses.start,
        imagePosition === 'right' && 'lg:flex-row-reverse'
      )}
    >
      <div className={cn('w-full', widths.image)}>
        {card.image ? (
          <img
            src={card.image}
            alt={card.title || ''}
            className="aspect-square w-full rounded-lg object-cover"
            data-tina-field={tinaField(card, 'image')}
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-primary/10">
            {card.icon ? (
              <Icon data={card.icon} className="h-12 w-12 text-primary" />
            ) : (
              <IconComponent className="h-12 w-12 text-primary" />
            )}
          </div>
        )}
      </div>
      <div className={cn('flex w-full flex-col gap-2', widths.text)}>
        <h3
          data-tina-field={tinaField(card, 'title')}
          className="text-xl text-foreground"
        >
          {card.title}
        </h3>
        {card.contactDescription && (
          <p
            data-tina-field={tinaField(card, 'contactDescription')}
            className="text-muted-foreground"
          >
            {card.contactDescription}
          </p>
        )}
        {card.value && (
          href ? (
            <Link
              href={href}
              target={card.type === 'address' ? '_blank' : undefined}
              rel={card.type === 'address' ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1 text-primary hover:underline"
              data-tina-field={tinaField(card, 'value')}
            >
              {card.value}
              {card.type === 'address' && <ExternalLink className="h-3 w-3" />}
            </Link>
          ) : (
            <span
              data-tina-field={tinaField(card, 'value')}
              className="font-sans text-foreground"
            >
              {card.value}
            </span>
          )
        )}
        {card.href && card.action && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="mt-2 w-fit rounded-full border-border text-muted-foreground hover:border-primary hover:text-foreground"
          >
            <Link
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              data-tina-field={tinaField(card, 'action')}
            >
              {card.action}
              <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

function ContactCard({ card, variant }: ContactCardProps) {
  switch (variant) {
    case 'list':
      return <ListVariant card={card} />;
    case 'minimal':
      return <MinimalVariant card={card} />;
    case 'cards':
    default:
      return <CardVariant card={card} />;
  }
}

export interface ContactCardsProps {
  data: PageBlocksContactCards;
}

type ContactVariant = 'list' | 'cards' | 'minimal' | 'imageText';

export function ContactCards({ data }: ContactCardsProps) {
  const variant = (data.variant || 'cards') as ContactVariant;
  const columns = data.columns || 3;
  const cards = data.cards || [];
  const columnRatio = data.columnRatio || '50-50';
  const imagePosition = (data.imagePosition || 'left') as 'left' | 'right';
  const verticalAlign = data.verticalAlign || 'start';

  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const hasHeader = data.badge || data.title || data.subtitle;

  return (
    <section className={cn('py-24 lg:py-32', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {hasHeader && (
          <InView
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true, margin: '-100px' }}
          >
            <div className="mb-12 text-center mx-auto max-w-3xl">
              {data.badge?.text && (
                <div data-tina-field={tinaField(data, 'badge')}>
                  <Badge
                    variant="outline"
                    className="mb-4 border-border text-muted-foreground inline-flex items-center gap-2"
                  >
                    {data.badge.icon && <Icon data={data.badge.icon} className="w-3 h-3" />}
                    {data.badge.text}
                  </Badge>
                </div>
              )}
              {data.title && (
                <h2
                  data-tina-field={tinaField(data, 'title')}
                  className="mb-4 text-3xl tracking-tight md:text-4xl text-foreground"
                >
                  {renderTitle(data.title, data.highlightWords || undefined)}
                </h2>
              )}
              {data.subtitle && (
                <p
                  data-tina-field={tinaField(data, 'subtitle')}
                  className="text-muted-foreground whitespace-pre-line mb-4"
                >
                  {data.subtitle}
                </p>
              )}
            </div>
          </InView>
        )}

        {variant === 'cards' ? (
          <AnimatedGroup
            preset="blur-slide"
            className={cn('grid gap-6', columnClasses[columns as keyof typeof columnClasses])}
          >
            {cards.map((card, index) => (
              <div key={index} className="h-full">
                <ContactCard card={card!} variant={variant} />
              </div>
            ))}
          </AnimatedGroup>
        ) : variant === 'imageText' ? (
          <AnimatedGroup preset="blur-slide" className="space-y-12">
            {cards.map((card, index) => (
              <ImageTextVariant
                key={index}
                card={card!}
                columnRatio={columnRatio}
                imagePosition={imagePosition}
                verticalAlign={verticalAlign}
              />
            ))}
          </AnimatedGroup>
        ) : variant === 'list' ? (
          <AnimatedGroup
            preset="blur-slide"
            className="mx-auto max-w-2xl rounded-lg border border-border bg-card/50 p-6"
          >
            {cards.map((card, index) => (
              <ContactCard key={index} card={card!} variant={variant} />
            ))}
          </AnimatedGroup>
        ) : (
          <AnimatedGroup
            preset="blur-slide"
            className="flex flex-wrap justify-center gap-8"
          >
            {cards.map((card, index) => (
              <ContactCard key={index} card={card!} variant={variant} />
            ))}
          </AnimatedGroup>
        )}
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for ContactCards block
 */
export const contactCardsBlockSchema: Template = {
  name: 'contactCards',
  label: 'Contact Cards',
  ui: {
    defaultItem: {
      title: 'Get in Touch',
      subtitle: 'We\'d love to hear from you. Reach out through any of these channels.',
      variant: 'cards',
      columns: 3,
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Layout Variant',
      name: 'variant',
      options: [
        { value: 'cards', label: 'Cards Grid' },
        { value: 'list', label: 'List View' },
        { value: 'minimal', label: 'Minimal Inline' },
        { value: 'imageText', label: 'Image + Text Rows' },
      ],
    },
    {
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Number of columns (2-4). Only applies to Cards Grid variant.',
    },
    {
      type: 'string',
      label: 'Image/Text Column Ratio',
      name: 'columnRatio',
      options: [
        { value: '50-50', label: '50 / 50' },
        { value: '60-40', label: '60 / 40' },
        { value: '40-60', label: '40 / 60' },
        { value: '66-33', label: '66 / 33' },
        { value: '33-66', label: '33 / 66' },
      ],
      description: 'Width split between image and text. Only applies to Image + Text Rows variant.',
    },
    {
      type: 'string',
      label: 'Image Position',
      name: 'imagePosition',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
      description: 'Side the image appears on. Only applies to Image + Text Rows variant.',
    },
    {
      type: 'string',
      label: 'Vertical Alignment',
      name: 'verticalAlign',
      options: [
        { value: 'start', label: 'Top' },
        { value: 'center', label: 'Center' },
        { value: 'end', label: 'Bottom' },
      ],
      description: 'Vertical alignment of image and text. Only applies to Image + Text Rows variant.',
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
    contactCardsListField as any,
  ],
};

'use client';

import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
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
 * Render title with highlighted words
 */
function renderTitle(title: string, highlightWords?: string) {
  if (!highlightWords) return title;

  const words = highlightWords.split(',').map((w) => w.trim());
  let result = title;

  words.forEach((word) => {
    const regex = new RegExp(`(${word})`, 'gi');
    result = result.replace(regex, '<span class="text-primary">$1</span>');
  });

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

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
    case 'hours':
      return Clock;
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
      className="h-full border-border bg-card/50 hover:border-primary/50 transition-all duration-500"
    >
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          {card.icon ? (
            <Icon data={card.icon} className="h-6 w-6 text-primary" />
          ) : (
            <IconComponent className="h-6 w-6 text-primary" />
          )}
        </div>
        <CardTitle
          data-tina-field={tinaField(card, 'title')}
          className="text-lg text-foreground"
        >
          {card.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {card.contactDescription && (
          <p
            data-tina-field={tinaField(card, 'contactDescription')}
            className="mb-3 text-sm text-muted-foreground"
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
              {card.type === 'address' && <ExternalLink className="h-4 w-4" />}
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        {card.icon ? (
          <Icon data={card.icon} className="h-5 w-5 text-primary" />
        ) : (
          <IconComponent className="h-5 w-5 text-primary" />
        )}
      </div>
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
              className="text-foreground/80 block mt-1"
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
      {card.icon ? (
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

type ContactVariant = 'list' | 'cards' | 'minimal';

export function ContactCards({ data }: ContactCardsProps) {
  const variant = (data.variant || 'cards') as ContactVariant;
  const columns = data.columns || 3;
  const cards = data.cards || [];

  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const hasHeader = data.badge || data.title || data.subtitle;

  return (
    <section className={cn('py-20 md:py-28', data.background || 'bg-background')}>
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
                  className="text-muted-foreground"
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
      ],
    },
    {
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Number of columns (2-4). Only applies to cards variant.',
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

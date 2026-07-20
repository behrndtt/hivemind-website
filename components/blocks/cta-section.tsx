'use client';

import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { renderTitle } from '@/lib/render-title';
import { Icon } from '@/components/icon';
import { InView } from '@/components/motion-primitives/in-view';
import { Button } from '@/components/ui/button';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { iconSchema } from '@/tina/fields/icon';
import { highlightWordsField, buttonsListField } from '@/tina/fields/shared';
import type { PageBlocksCtaSection } from '@/tina/__generated__/types';

/**
 * Title size class mappings
 */
const titleSizeClasses = {
  sm: 'text-xl md:text-2xl',
  md: 'text-2xl md:text-3xl',
  lg: 'text-3xl md:text-4xl',
  xl: 'text-4xl md:text-5xl',
};

/**
 * Subtitle size class mappings
 */
const subtitleSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

/**
 * Alignment class mappings
 */
const alignmentClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

/**
 * Button alignment class mappings
 */
const buttonAlignmentClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

/**
 * Card background class mappings
 */
const cardBackgroundClasses = {
  default: 'bg-card',
  muted: 'bg-muted',
  primary: 'bg-primary/5',
  accent: 'bg-accent',
  transparent: 'bg-transparent',
  gradient: 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent',
};

/**
 * Padding class mappings
 */
const paddingClasses = {
  none: 'p-0',
  sm: 'p-6 lg:p-8',
  md: 'p-8 lg:p-12',
  lg: 'p-12 lg:p-16',
  xl: 'p-16 lg:p-20',
};

/**
 * Feature item type definition
 */
interface FeatureItemData {
  icon?: { name?: string | null; color?: string | null } | null;
  text?: string | null;
}

/**
 * Feature item component for displaying sub-items with icons
 */
interface FeatureItemProps {
  feature: FeatureItemData;
  alignment?: string;
}

function FeatureItem({ feature, alignment = 'left' }: FeatureItemProps) {
  const alignClass = alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start';
  
  return (
    <div
      data-tina-field={tinaField(feature as Record<string, unknown>)}
      className={cn('flex items-center gap-3', alignClass)}
    >
      {feature.icon && (
        <div className="shrink-0">
          <Icon data={feature.icon} className="w-5 h-5 text-primary" />
        </div>
      )}
      <span className="text-muted-foreground">{feature.text}</span>
    </div>
  );
}

/**
 * Features list component
 */
interface FeaturesListProps {
  features: (FeatureItemData | null)[] | null | undefined;
  alignment?: string;
}

function FeaturesList({ features, alignment = 'left' }: FeaturesListProps) {
  if (!features || features.length === 0) return null;

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3 mt-6 mb-8">
      {features.map((feature, index) => (
        feature && <FeatureItem key={index} feature={feature} alignment={alignment} />
      ))}
    </div>
  );
}

function HoneycombBackground({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full text-foreground opacity-[0.06]', className)}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
      }}
    >
      <defs>
        <pattern id="cta-honeycomb" width="28" height="49" patternUnits="userSpaceOnUse">
          <g fillRule="evenodd">
            <g fill="currentColor" fillRule="nonzero">
              <path d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cta-honeycomb)" />
    </svg>
  );
}

function getButtonVariant(variant?: string | null) {
  if (variant === 'outline') return 'outline' as const;
  if (variant === 'ghost' || variant === 'link') return 'ghost' as const;
  if (variant === 'secondary') return 'secondary' as const;
  return 'default' as const;
}

export interface CtaSectionProps {
  data: PageBlocksCtaSection;
}

export function CtaSection({ data }: CtaSectionProps) {
  const variant = data.variant || 'boxed';
  const alignment = data.alignment || 'center';
  const titleSize = data.titleSize || 'lg';
  const subtitleSize = data.subtitleSize || 'lg';
  const cardBackground = data.cardBackground || 'default';
  const padding = data.padding || 'lg';

  // Boxed variant - card-style with border
  if (variant === 'boxed') {
    return (
      <section className={cn('py-24 lg:py-32', data.background || 'bg-background')}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InView
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.6 }}
            viewOptions={{ once: true, margin: '-100px' }}
          >
            <div className={cn(
              "relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/20",
              paddingClasses[padding as keyof typeof paddingClasses],
              cardBackgroundClasses[cardBackground as keyof typeof cardBackgroundClasses],
              alignmentClasses[alignment as keyof typeof alignmentClasses]
            )}>
              <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
              <HoneycombBackground />

              <div className="relative z-10 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
                <div className={cn(
                  "row-start-1 flex min-w-0 w-full flex-col xl:col-start-1",
                  alignmentClasses[alignment as keyof typeof alignmentClasses]
                )}>
                {data.icon && (
                  <div
                    data-tina-field={tinaField(data, 'icon')}
                    className={cn(
                      "flex mb-6",
                      alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon data={data.icon} className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                )}

                {data.title && (
                  <h2
                    data-tina-field={tinaField(data, 'title')}
                    className={cn(
                      "mb-4 text-foreground",
                      titleSizeClasses[titleSize as keyof typeof titleSizeClasses]
                    )}
                  >
                    {renderTitle(data.title, data.highlightWords || undefined)}
                  </h2>
                )}

                {data.subtitle && (
                  <p
                    data-tina-field={tinaField(data, 'subtitle')}
                    className={cn(
                      "w-full max-w-2xl text-muted-foreground whitespace-pre-line mb-4",
                      alignment === 'center' && 'mx-auto'
                    )}
                  >
                    {data.subtitle}
                  </p>
                )}

                {data.features && data.features.length > 0 && (
                  <FeaturesList features={data.features} alignment={alignment} />
                )}

                </div>

                {data.buttons && data.buttons.length > 0 && (
                  <div className={cn(
                    "col-span-full row-start-2 flex w-full flex-col gap-4 sm:flex-row xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:w-auto",
                    buttonAlignmentClasses[alignment as keyof typeof buttonAlignmentClasses]
                  )}>
                    {data.buttons.map((button, index) => (
                      <div key={index} data-tina-field={tinaField(button)}>
                        <Button
                          asChild
                          size="lg"
                          variant={getButtonVariant(button?.variant)}
                          className={cn(
                            'rounded-full px-7 font-medium',
                            button?.variant === 'outline' && 'border-border hover:border-primary/50 hover:bg-muted',
                            (button?.variant === 'ghost' || button?.variant === 'link') && 'text-foreground hover:bg-muted'
                          )}
                        >
                          <Link href={button?.href || '/'}>
                            {button?.icon && <Icon data={button.icon} className="w-4 h-4" />}
                            {button?.label}
                            {(!button?.variant || button?.variant === 'default' || button?.variant === 'primary') && (
                              <ArrowRight className="ml-2 w-4 h-4" />
                            )}
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </InView>
        </div>
      </section>
    );
  }

  // Full-width variant
  if (variant === 'full-width') {
    return (
      <section
        className={cn(
          'relative py-20 md:py-28 overflow-hidden',
          data.background || 'bg-card'
        )}
      >
        <HoneycombBackground className="opacity-[0.08]" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/[0.04] via-transparent to-primary/[0.04]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InView
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true, margin: '-100px' }}
          >
            <div className={cn(
              "mx-auto max-w-3xl flex flex-col",
              alignmentClasses[alignment as keyof typeof alignmentClasses]
            )}>
              {data.title && (
                <h2
                  data-tina-field={tinaField(data, 'title')}
                  className={cn(
                    "mb-4 text-foreground",
                    titleSizeClasses[titleSize as keyof typeof titleSizeClasses]
                  )}
                >
                  {renderTitle(data.title, data.highlightWords || undefined)}
                </h2>
              )}

              {data.subtitle && (
                <p
                  data-tina-field={tinaField(data, 'subtitle')}
                  className={cn(
                    "text-muted-foreground whitespace-pre-line mb-4"
                  )}
                >
                  {data.subtitle}
                </p>
              )}

              {data.features && data.features.length > 0 && (
                <FeaturesList features={data.features} alignment={alignment} />
              )}

              {data.buttons && data.buttons.length > 0 && (
                <div className={cn(
                  "flex flex-col sm:flex-row items-center gap-4 mt-8",
                  buttonAlignmentClasses[alignment as keyof typeof buttonAlignmentClasses]
                )}>
                  {data.buttons.map((button, index) => (
                    <div key={index} data-tina-field={tinaField(button)}>
                      <Button
                        asChild
                        size="lg"
                        variant={getButtonVariant(button?.variant)}
                        className={cn(
                          'rounded-full px-8',
                          (button?.variant === 'ghost' || button?.variant === 'link') && 'text-foreground hover:bg-muted'
                        )}
                      >
                        <Link href={button?.href || '/'}>
                          {button?.icon && <Icon data={button.icon} className="w-4 h-4" />}
                          {button?.label}
                          {(!button?.variant || button?.variant === 'default' || button?.variant === 'primary') && (
                            <ArrowRight className="ml-2 w-4 h-4" />
                          )}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </InView>
        </div>
      </section>
    );
  }

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <section className={cn('py-12 md:py-16', data.background || 'bg-background')}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InView
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true, margin: '-100px' }}
          >
            <div className={cn(
              "flex flex-col md:flex-row gap-6",
              alignment === 'center' ? 'items-center justify-center' : 
              alignment === 'right' ? 'items-end justify-end' : 
              'items-start justify-between'
            )}>
              <div className={alignmentClasses[alignment as keyof typeof alignmentClasses]}>
                {data.title && (
                  <h3
                    data-tina-field={tinaField(data, 'title')}
                    className={cn(
                      "text-foreground",
                      titleSizeClasses[titleSize as keyof typeof titleSizeClasses]
                    )}
                  >
                    {renderTitle(data.title, data.highlightWords || undefined)}
                  </h3>
                )}
                {data.subtitle && (
                  <p
                    data-tina-field={tinaField(data, 'subtitle')}
                    className={cn(
                      "text-muted-foreground whitespace-pre-line mb-4",
                      subtitleSizeClasses[subtitleSize as keyof typeof subtitleSizeClasses]
                    )}
                  >
                    {data.subtitle}
                  </p>
                )}
                {data.features && data.features.length > 0 && (
                  <FeaturesList features={data.features} alignment={alignment} />
                )}
              </div>

              {data.buttons && data.buttons.length > 0 && (
                <div className="flex gap-4">
                  {data.buttons.map((button, index) => (
                    <div key={index} data-tina-field={tinaField(button)}>
                      <Button
                        asChild
                        variant={getButtonVariant(button?.variant)}
                      >
                        <Link href={button?.href || '/'}>
                          {button?.icon && <Icon data={button.icon} className="w-4 h-4" />}
                          {button?.label}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </InView>
        </div>
      </section>
    );
  }

  // Inline variant (default fallback)
  return (
    <section className={cn('py-8', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "flex items-center gap-4 flex-wrap",
          buttonAlignmentClasses[alignment as keyof typeof buttonAlignmentClasses]
        )}>
          {data.title && (
            <span
              data-tina-field={tinaField(data, 'title')}
              className="text-muted-foreground"
            >
              {data.title}
            </span>
          )}
          {data.buttons?.map((button, index) => (
            <div key={index} data-tina-field={tinaField(button)}>
              <Button asChild variant="link" className="text-primary">
                <Link href={button?.href || '/'}>
                  {button?.label}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for CtaSection block
 */
export const ctaSectionBlockSchema: Template = {
  name: 'ctaSection',
  label: 'CTA Section',
  ui: {
    defaultItem: {
      title: 'Ready to Get Started?',
      subtitle: 'Join thousands of satisfied customers today.',
      variant: 'boxed',
      alignment: 'center',
      titleSize: 'lg',
      subtitleSize: 'lg',
      cardBackground: 'default',
      padding: 'lg',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Variant',
      name: 'variant',
      options: [
        { label: 'Boxed', value: 'boxed' },
        { label: 'Full Width', value: 'full-width' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Inline', value: 'inline' },
      ],
    },
    {
      type: 'string',
      label: 'Alignment',
      name: 'alignment',
      description: 'Content alignment for the entire block',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      type: 'string',
      label: 'Card Background',
      name: 'cardBackground',
      description: 'Background style for the CTA card (boxed variant)',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Muted', value: 'muted' },
        { label: 'Primary Tint', value: 'primary' },
        { label: 'Accent', value: 'accent' },
        { label: 'Transparent', value: 'transparent' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
    {
      type: 'string',
      label: 'Padding',
      name: 'padding',
      description: 'Inner padding for the CTA content',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    {
      ...iconSchema,
      label: 'Section Icon',
      name: 'icon',
      description: 'Icon displayed above the title (boxed variant only)',
    } as any,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Title Size',
      name: 'titleSize',
      description: 'Font size for the title',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
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
      label: 'Subtitle Size',
      name: 'subtitleSize',
      description: 'Font size for the subtitle',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    {
      type: 'object',
      label: 'Feature Items',
      name: 'features',
      list: true,
      description: 'List of feature items with icons displayed below the subtitle',
      ui: {
        defaultItem: {
          text: 'Feature item',
        },
        itemProps: (item: Record<string, string>) => ({
          label: item?.text || 'Feature Item',
        }),
      },
      fields: [
        {
          ...iconSchema,
          label: 'Icon',
          name: 'icon',
          description: 'Icon for this feature item',
        } as any,
        {
          type: 'string',
          label: 'Text',
          name: 'text',
          required: true,
          description: 'Feature item text',
        },
      ],
    },
    {
      ...buttonsListField,
      label: 'CTA Buttons',
    } as any,
  ],
};

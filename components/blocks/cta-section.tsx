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
 * Overlay opacity class mappings
 */
const overlayOpacityClasses = {
  none: '',
  light: 'bg-background/30',
  medium: 'bg-background/50',
  heavy: 'bg-background/70',
  dark: 'bg-background/90',
};

/**
 * Hexagon SVG pattern background for full-width
 */
function HexagonBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
      }}
    >
      <defs>
        <pattern id="cta-hexagons-fullwidth" width="28" height="49" patternUnits="userSpaceOnUse">
          <g fillRule="evenodd">
            <g fill="white" fillRule="nonzero">
              <path d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cta-hexagons-fullwidth)" />
    </svg>
  );
}

/**
 * Animated orbs background
 */
function OrbsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary orb - top right */}
      <div
        className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-linear-to-br from-primary/20 via-primary/10 to-transparent blur-3xl"
        style={{ animation: 'float 8s ease-in-out infinite' }}
      />
      {/* Secondary orb - bottom left */}
      <div
        className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-linear-to-tr from-secondary/20 via-secondary/10 to-transparent blur-3xl"
        style={{ animation: 'float 10s ease-in-out infinite reverse' }}
      />
      {/* Accent orb - center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full bg-linear-to-r from-accent/15 to-transparent blur-2xl"
        style={{ animation: 'pulse 6s ease-in-out infinite' }}
      />
    </div>
  );
}

/**
 * Radial gradient background
 */
function RadialBackground() {
  return (
    <div
      className="absolute inset-0 opacity-30"
      style={{
        background: 'radial-gradient(ellipse at center, var(--primary) 0%, transparent 70%)',
      }}
    />
  );
}

/**
 * Background style renderer
 */
function BackgroundRenderer({ style }: { style?: string | null }) {
  if (!style || style === 'none') return null;
  
  switch (style) {
    case 'hexagon':
      return <HexagonBackground />;
    case 'orbs':
      return <OrbsBackground />;
    case 'radial':
      return <RadialBackground />;
    case 'hexagon-orbs':
      return (
        <>
          <HexagonBackground />
          <OrbsBackground />
        </>
      );
    default:
      return null;
  }
}

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
    <div className="flex flex-col gap-3 mt-6 mb-8">
      {features.map((feature, index) => (
        feature && <FeatureItem key={index} feature={feature} alignment={alignment} />
      ))}
    </div>
  );
}

/**
 * Hexagon SVG pattern background for CTA
 */
function HexagonPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
      }}
    >
      <defs>
        <pattern id="cta-hexagons" width="28" height="49" patternUnits="userSpaceOnUse">
          <g fillRule="evenodd">
            <g fill="white" fillRule="nonzero">
              <path d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cta-hexagons)" />
    </svg>
  );
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
              "relative overflow-hidden rounded-3xl border border-border",
              paddingClasses[padding as keyof typeof paddingClasses],
              cardBackgroundClasses[cardBackground as keyof typeof cardBackgroundClasses],
              alignmentClasses[alignment as keyof typeof alignmentClasses]
            )}>
              {/* Background effects */}
              {cardBackground === 'default' && (
                <>
                  <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10" />
                  <HexagonPattern />
                </>
              )}

              <div className={cn(
                "relative z-10 flex flex-col",
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
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon data={data.icon} className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                )}

                {data.title && (
                  <h2
                    data-tina-field={tinaField(data, 'title')}
                    className={cn(
                      "mb-4 tracking-tight text-foreground",
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
                      "text-muted-foreground max-w-2xl",
                      subtitleSizeClasses[subtitleSize as keyof typeof subtitleSizeClasses],
                      alignment === 'center' && 'mx-auto'
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
                    "flex flex-col sm:flex-row gap-4",
                    buttonAlignmentClasses[alignment as keyof typeof buttonAlignmentClasses]
                  )}>
                    {data.buttons.map((button, index) => (
                      <div key={index} data-tina-field={tinaField(button)}>
                        <Button
                          asChild
                          size="lg"
                          variant={button?.variant === 'outline' ? 'outline' : 'default'}
                          className={cn(
                            'rounded-full font-semibold px-8',
                            button?.variant === 'outline'
                              ? 'border-border hover:bg-muted hover:border-primary/50'
                              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                          )}
                        >
                          <Link href={button?.href || '/'}>
                            {button?.icon && <Icon data={button.icon} className="w-4 h-4" />}
                            {button?.label}
                            {button?.variant !== 'outline' && (
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
    const backgroundStyle = (data as Record<string, unknown>).backgroundStyle as string || 'hexagon';
    const overlayOpacity = (data as Record<string, unknown>).overlayOpacity as string || 'none';
    const overlayClass = overlayOpacityClasses[overlayOpacity as keyof typeof overlayOpacityClasses] || '';
    
    return (
      <section
        className={cn(
          'relative py-20 md:py-28 overflow-hidden',
          data.background || 'bg-card'
        )}
      >
        {/* Background style */}
        <BackgroundRenderer style={backgroundStyle} />
        
        {/* Overlay */}
        {overlayClass && (
          <div className={cn('absolute inset-0 z-1', overlayClass)} />
        )}
        
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
                    "mb-4 tracking-tight text-foreground",
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
                    "text-muted-foreground",
                    subtitleSizeClasses[subtitleSize as keyof typeof subtitleSizeClasses]
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
                        variant={button?.variant === 'outline' ? 'outline' : 'default'}
                        className="rounded-full px-8"
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
                      "text-muted-foreground",
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
                        variant={button?.variant === 'outline' ? 'outline' : 'default'}
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

  // Compact variant - for sidebars and narrow spaces
  if (variant === 'compact') {
    return (
      <div className={cn(
        'rounded-xl border border-border p-6',
        cardBackgroundClasses[cardBackground as keyof typeof cardBackgroundClasses] || 'bg-card/50'
      )}>
        {data.icon && (
          <div
            data-tina-field={tinaField(data, 'icon')}
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"
          >
            <Icon data={data.icon} className="h-6 w-6 text-primary" />
          </div>
        )}
        {data.title && (
          <h3
            data-tina-field={tinaField(data, 'title')}
            className="mb-2 text-lg font-semibold text-foreground"
          >
            {renderTitle(data.title, data.highlightWords || undefined)}
          </h3>
        )}
        {data.subtitle && (
          <p
            data-tina-field={tinaField(data, 'subtitle')}
            className="mb-4 text-sm text-muted-foreground"
          >
            {data.subtitle}
          </p>
        )}
        {data.buttons && data.buttons.length > 0 && (
          <div className="flex flex-col gap-2">
            {data.buttons.map((button, index) => (
              <div key={index} data-tina-field={tinaField(button)}>
                <Button
                  asChild
                  size="sm"
                  variant={button?.variant === 'outline' ? 'outline' : 'default'}
                  className="w-full justify-center"
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
        { label: 'Compact (Sidebar)', value: 'compact' },
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
      type: 'string',
      label: 'Background Style',
      name: 'backgroundStyle',
      description: 'Background style for full-width variant',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Hexagon Pattern', value: 'hexagon' },
        { label: 'Orbs', value: 'orbs' },
        { label: 'Radial Gradient', value: 'radial' },
        { label: 'Hexagon + Orbs', value: 'hexagon-orbs' },
      ],
    },
    {
      type: 'string',
      label: 'Overlay Opacity',
      name: 'overlayOpacity',
      description: 'Overlay opacity for full-width variant (darkens/lightens background)',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light (30%)', value: 'light' },
        { label: 'Medium (50%)', value: 'medium' },
        { label: 'Heavy (70%)', value: 'heavy' },
        { label: 'Dark (90%)', value: 'dark' },
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

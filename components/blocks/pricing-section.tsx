'use client';

import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { InView } from '@/components/motion-primitives/in-view';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icon';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from '@/components/blocks/shared/block-header';
import { highlightWordsField, badgeField, pricingPlansListField } from '@/tina/fields/shared';
import type {
  PageBlocksPricingSection,
  PageBlocksPricingSectionPlans,
  PageBlocksPricingSectionPlansFeatures,
  PageBlocksPricingSectionPlansButtons,
} from '@/tina/__generated__/types';

/**
 * Text size class mappings for features - text and icon inherit same sizing
 */
const featureTextSizeClasses = {
  sm: { text: 'text-xs', icon: 'w-3.5 h-3.5' },
  md: { text: 'text-sm', icon: 'w-4 h-4' },
  lg: { text: 'text-base', icon: 'w-5 h-5' },
  xl: { text: 'text-lg', icon: 'w-6 h-6' },
};

/**
 * Price color class mappings
 */
const priceColorClasses = {
  default: 'text-foreground',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  muted: 'text-muted-foreground',
};

/**
 * Column layout class mappings
 */
const columnClasses = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

/**
 * Format billing period from option value to display string
 */
function formatBillingPeriod(
  billingPeriod?: string | null,
  customBillingPeriod?: string | null
): string {
  switch (billingPeriod) {
    case 'monthly':
      return '/mo';
    case 'annually':
      return '/yr';
    case 'weekly':
      return '/wk';
    case 'one-time':
      return '';
    case 'custom':
      return customBillingPeriod || '';
    default:
      return '';
  }
}

/**
 * Pricing feature item component with icon support
 */
interface PricingFeatureItemProps {
  feature: PageBlocksPricingSectionPlansFeatures;
  size?: string | null;
}

function PricingFeatureItem({ feature, size = 'md' }: PricingFeatureItemProps) {
  const sizeKey = (size as keyof typeof featureTextSizeClasses) || 'md';
  const sizeClasses = featureTextSizeClasses[sizeKey] || featureTextSizeClasses.md;
  const isIncluded = feature.included !== false;
  const hasCustomIcon = feature.icon?.name;

  return (
    <li
      data-tina-field={tinaField(feature)}
      className={cn(
        'flex items-start gap-3',
        !isIncluded && 'opacity-75'
      )}
    >
      <span className={cn('shrink-0 mt-0.5', sizeClasses.icon)}>
        {hasCustomIcon ? (
          <Icon
            data={feature.icon}
            className={cn(
              sizeClasses.icon,
              isIncluded ? 'text-primary' : 'text-muted-foreground'
            )}
          />
        ) : isIncluded ? (
          <Check className={cn(sizeClasses.icon, 'text-primary')} />
        ) : (
          <X className={cn(sizeClasses.icon, 'text-muted-foreground')} />
        )}
      </span>
      <span
        data-tina-field={tinaField(feature, 'text')}
        className={cn(
          sizeClasses.text,
          isIncluded ? 'text-foreground/80' : 'text-muted-foreground/60'
        )}
      >
        {feature.text}
      </span>
    </li>
  );
}

/**
 * Pricing CTA button component with variant support
 */
interface PricingButtonProps {
  button: PageBlocksPricingSectionPlansButtons;
  isHighlighted?: boolean | null;
  isFirst?: boolean;
}

function PricingButton({ button, isHighlighted, isFirst }: PricingButtonProps) {
  const variant = button.variant || (isFirst && isHighlighted ? 'primary' : 'outline');

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border-border text-foreground hover:bg-muted hover:border-primary/50',
    ghost: 'text-foreground hover:bg-muted',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  };

  return (
    <Button
      asChild
      className={cn(
        'w-full rounded-full font-semibold',
        variantClasses[variant as keyof typeof variantClasses] || variantClasses.outline
      )}
      variant={variant === 'primary' ? 'default' : (variant as 'outline' | 'ghost' | 'secondary')}
    >
      <Link href={button.href || '/contact'}>
        {button.icon?.name && (
          <Icon data={button.icon} className="w-4 h-4 mr-2" />
        )}
        {button.label || 'Get Started'}
      </Link>
    </Button>
  );
}

/**
 * Pricing card component
 */
interface PricingCardProps {
  plan: PageBlocksPricingSectionPlans;
}

function PricingCard({ plan }: PricingCardProps) {
  const isHighlighted = plan.highlighted;
  const badgeText = plan.highlightBadgeText || 'Most Popular';
  const priceColorKey = (plan.priceColor as keyof typeof priceColorClasses) || 'default';
  const priceColor = priceColorClasses[priceColorKey] || priceColorClasses.default;

  const currencyPrefix = plan.currencyPrefix ?? '$';
  const currencySuffix = plan.currencySuffix ?? 'AUD';
  const billingPeriodText = formatBillingPeriod(plan.billingPeriod, plan.customBillingPeriod);

  const isSpecialPrice =
    plan.price?.toLowerCase() === 'free' ||
    plan.price?.toLowerCase() === 'custom' ||
    plan.price?.toLowerCase() === 'contact';

  return (
    <Card
      className={cn(
        'relative h-full transition-all duration-500 hover:scale-[1.02]',
        isHighlighted
          ? 'border-primary shadow-lg shadow-primary/20 bg-card/80'
          : 'border-border bg-card/50 hover:border-primary/50'
      )}
    >
      {isHighlighted && (
        <div
          data-tina-field={tinaField(plan, 'highlightBadgeText')}
          className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10"
        >
          <span className="bg-primary text-primary-foreground px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
            {badgeText}
          </span>
        </div>
      )}
      <CardContent className="p-6 sm:p-8 flex flex-col h-full">
        {/* Plan Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h3
            data-tina-field={tinaField(plan, 'name')}
            className="text-xl sm:text-2xl font-semibold text-foreground mb-4"
          >
            {plan.name}
          </h3>

          {/* Price Display */}
          <div data-tina-field={tinaField(plan, 'price')} className="mb-2">
            {isSpecialPrice ? (
              <data
                value={plan.price || ''}
                className={cn('text-4xl sm:text-5xl font-serif font-bold', priceColor)}
              >
                {plan.price}
              </data>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex items-baseline justify-center">
                  <span className={cn('text-2xl font-medium', priceColor)}>
                    {currencyPrefix}
                  </span>
                  <data
                    value={plan.price || ''}
                    className={cn('text-4xl sm:text-5xl font-serif font-bold mx-1', priceColor)}
                  >
                    {plan.price}
                  </data>
                  {billingPeriodText && (
                    <span className="text-lg text-muted-foreground">
                      {billingPeriodText}
                    </span>
                  )}
                </div>
                {currencySuffix && (
                  <span className="text-sm text-muted-foreground mt-1">
                    {currencySuffix}
                  </span>
                )}
              </div>
            )}
          </div>

          {plan.planDescription && (
            <p
              data-tina-field={tinaField(plan, 'planDescription')}
              className="text-sm sm:text-base text-muted-foreground mt-4"
            >
              {plan.planDescription}
            </p>
          )}
        </div>

        {/* Features List */}
        {plan.features && plan.features.length > 0 && (
          <ul
            data-tina-field={tinaField(plan, 'features')}
            className="mb-6 sm:mb-8 grow space-y-3 sm:space-y-4"
          >
            {plan.features.map((feature, index) => (
              <PricingFeatureItem
                key={index}
                feature={feature!}
                size={plan.featureTextSize}
              />
            ))}
          </ul>
        )}

        {/* CTA Buttons */}
        {plan.buttons && plan.buttons.length > 0 && (
          <div
            data-tina-field={tinaField(plan, 'buttons')}
            className="mt-auto space-y-3"
          >
            {plan.buttons.map((button, index) => (
              <PricingButton
                key={index}
                button={button!}
                isHighlighted={isHighlighted}
                isFirst={index === 0}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export interface PricingSectionProps {
  data: PageBlocksPricingSection;
}

export function PricingSection({ data }: PricingSectionProps) {
  const columnLayoutValue = data.columnLayout as string | undefined;
  const columns = (columnLayoutValue === '2' || columnLayoutValue === '3' || columnLayoutValue === '4')
    ? (Number(columnLayoutValue) as 2 | 3 | 4)
    : 3;
  const columnClass = columnClasses[columns];

  return (
    <section className={cn('py-20 md:py-28', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlockHeader data={data} />

        <AnimatedGroup
          preset="scale"
          className={cn(
            'grid grid-cols-1 gap-6 sm:gap-8 max-w-6xl mx-auto',
            columnClass
          )}
        >
          {data.plans?.map((plan, index) => (
            <div key={index} data-tina-field={tinaField(plan)}>
              <PricingCard plan={plan!} />
            </div>
          ))}
        </AnimatedGroup>

        {data.footer && (
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewOptions={{ once: true }}
          >
            <p
              data-tina-field={tinaField(data, 'footer')}
              className="mt-8 text-center text-sm text-muted-foreground"
            >
              {data.footer}
            </p>
          </InView>
        )}
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for PricingSection block
 */
export const pricingSectionBlockSchema: Template = {
  name: 'pricingSection',
  label: 'Pricing Section',
  ui: {
    defaultItem: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that works best for your business.',
      columnLayout: '3',
      alignment: 'center',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
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
      type: 'string',
      label: 'Column Layout',
      name: 'columnLayout',
      description: 'Number of pricing columns on large screens',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      type: 'string',
      label: 'Header Alignment',
      name: 'alignment',
      description: 'Alignment of title and subtitle',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    pricingPlansListField as any,
    {
      type: 'string',
      label: 'Footer Text',
      name: 'footer',
      description: 'Optional text below the pricing cards (e.g., "All plans include...")',
    },
  ],
};

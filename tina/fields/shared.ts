/**
 * Shared TinaCMS field definitions for use across multiple block schemas.
 * These fields provide consistency and reusability across the CMS.
 */

import type { TinaField } from 'tinacms';
import { iconSchema } from './icon';

/**
 * Highlight words field - Array of words to highlight with primary color in titles.
 * Used for visual emphasis on key terms.
 */
export const highlightWordsField: TinaField = {
  type: 'string',
  label: 'Highlight Words',
  name: 'highlightWords',
  description: 'Words in the title to highlight with primary color (comma-separated)',
};

/**
 * Badge field - Object with optional icon and text for section badges.
 * Commonly used above titles to categorise or label sections.
 */
export const badgeField: TinaField = {
  type: 'object',
  label: 'Badge',
  name: 'badge',
  fields: [
    {
      type: 'string',
      label: 'Text',
      name: 'text',
      description: 'Badge text to display',
    },
    {
      ...iconSchema,
      label: 'Badge Icon',
      name: 'icon',
      description: 'Optional icon to display before badge text',
    } as TinaField,
  ],
};

/**
 * Button/Action field template - Object with label, link, variant, and optional icon.
 * Used for CTA buttons across hero, CTA sections, and other blocks.
 */
export const buttonField: TinaField = {
  type: 'object',
  label: 'Button',
  name: 'button',
  fields: [
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
      type: 'string',
      label: 'Variant',
      name: 'variant',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Outline', value: 'outline' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Secondary', value: 'secondary' },
      ],
    },
    {
      ...iconSchema,
      label: 'Button Icon',
      name: 'icon',
      description: 'Optional icon to display in button',
    } as TinaField,
  ],
};

/**
 * Buttons list field - Array of button objects for multiple CTAs.
 * Used in hero sections, CTA sections, etc.
 */
export const buttonsListField: TinaField = {
  type: 'object',
  label: 'Buttons',
  name: 'buttons',
  list: true,
  ui: {
    defaultItem: {
      label: 'Get Started',
      href: '/',
      variant: 'primary',
    },
    itemProps: (item: Record<string, string>) => ({
      label: item?.label || 'Button',
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
      label: 'Link',
      name: 'href',
      required: true,
    },
    {
      type: 'string',
      label: 'Variant',
      name: 'variant',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Outline', value: 'outline' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Secondary', value: 'secondary' },
      ],
    },
    {
      ...iconSchema,
      label: 'Button Icon',
      name: 'icon',
      description: 'Optional icon to display in button',
    } as TinaField,
  ],
};

/**
 * Stat item field template - Object with value, label, and optional icon/description.
 * Used in stats grids and hero stat displays.
 */
export const statItemFields: TinaField[] = [
  {
    type: 'string',
    label: 'Value',
    name: 'value',
    required: true,
    description: 'The statistic value (e.g., "99%", "500+", "$1M")',
  },
  {
    type: 'string',
    label: 'Label',
    name: 'label',
    required: true,
    description: 'Description of what the stat represents',
  },
  {
    type: 'string',
    label: 'Description',
    name: 'statDescription',
    description: 'Optional additional context for the stat',
  },
  {
    ...iconSchema,
    label: 'Stat Icon',
    name: 'icon',
    description: 'Optional icon for the stat',
  } as TinaField,
];

/**
 * Stats list field - Array of stat items.
 * Used in hero sections, stats grids, etc.
 */
export const statsListField: TinaField = {
  type: 'object',
  label: 'Stats',
  name: 'stats',
  list: true,
  ui: {
    defaultItem: {
      value: '100+',
      label: 'Projects Completed',
    },
    itemProps: (item: Record<string, string>) => ({
      label: `${item?.value || ''} - ${item?.label || 'Stat'}`,
    }),
  },
  fields: statItemFields,
};

/**
 * Card item field template - Object with title, description, icon, and optional link.
 * Used in card grids, feature lists, etc.
 */
export const cardItemFields: TinaField[] = [
  {
    type: 'string',
    label: 'Title',
    name: 'title',
  },
  {
    type: 'rich-text',
    label: 'Description',
    name: 'description',
    description: 'Card description with rich text support',
  },
  {
    ...iconSchema,
    label: 'Card Icon',
    name: 'icon',
  } as TinaField,
  {
    type: 'string',
    label: 'Link',
    name: 'href',
    description: 'Optional link for the card',
  },
  {
    type: 'string',
    label: 'Action Text',
    name: 'action',
    description: 'Button text (defaults to "Learn more")',
  },
  {
    type: 'object',
    label: 'Features',
    name: 'features',
    list: true,
    description: 'Optional feature list for service-overview variant',
    fields: [
      {
        type: 'string',
        label: 'Feature',
        name: 'text',
      },
    ],
  },
];

/**
 * Cards list field - Array of card items.
 * Used in card grids, feature sections, etc.
 */
export const cardsListField: TinaField = {
  type: 'object',
  label: 'Cards',
  name: 'cards',
  list: true,
  ui: {
    defaultItem: {
      title: 'Card Title',
      description: { type: 'root', children: [{ type: 'p', children: [{ type: 'text', text: 'Card description goes here.' }] }] },
    },
    itemProps: (item: Record<string, string>) => ({
      label: item?.title || 'Card',
    }),
  },
  fields: cardItemFields,
};

/**
 * Testimonial item field template - Object with quote, author details, and optional rating.
 * Used in testimonial sections.
 */
export const testimonialItemFields: TinaField[] = [
  {
    type: 'string',
    label: 'Quote',
    name: 'quote',
    required: true,
    ui: {
      component: 'textarea',
    },
  },
  {
    type: 'string',
    label: 'Author Name',
    name: 'author',
    required: true,
  },
  {
    type: 'string',
    label: 'Author Role',
    name: 'role',
  },
  {
    type: 'string',
    label: 'Company',
    name: 'company',
  },
  {
    type: 'image',
    label: 'Avatar',
    name: 'avatar',
  },
  {
    type: 'number',
    label: 'Rating',
    name: 'rating',
    description: 'Star rating from 1-5 (optional)',
  },
];

/**
 * Testimonials list field - Array of testimonial items.
 * Used in testimonial sections.
 * Named 'items' to avoid GraphQL conflict with legacy testimonial block.
 */
export const testimonialsListField: TinaField = {
  type: 'object',
  label: 'Testimonials',
  name: 'items',
  list: true,
  ui: {
    defaultItem: {
      quote: 'This product has transformed how we work.',
      author: 'John Smith',
      role: 'CEO',
      company: 'Acme Corp',
      rating: 5,
    },
    itemProps: (item: Record<string, string>) => ({
      label: item?.author || 'Testimonial',
    }),
  },
  fields: testimonialItemFields,
};

/**
 * Team member item field template - Object with name, role, description, image, and social links.
 * Used in team grids.
 */
export const teamMemberFields: TinaField[] = [
  {
    type: 'string',
    label: 'Name',
    name: 'name',
    required: true,
  },
  {
    type: 'string',
    label: 'Role',
    name: 'role',
    required: true,
  },
  {
    type: 'rich-text',
    label: 'Description',
    name: 'description',
    description: 'Brief bio or description',
  },
  {
    type: 'image',
    label: 'Photo',
    name: 'image',
  },
  {
    type: 'string',
    label: 'LinkedIn URL',
    name: 'linkedin',
  },
];

/**
 * Team members list field - Array of team member items.
 * Used in team grid sections.
 */
export const teamMembersListField: TinaField = {
  type: 'object',
  label: 'Team Members',
  name: 'members',
  list: true,
  ui: {
    defaultItem: {
      name: 'Team Member',
      role: 'Role',
    },
    itemProps: (item: Record<string, string>) => ({
      label: item?.name || 'Member',
    }),
  },
  fields: teamMemberFields,
};

/**
 * Feature text size options for pricing plans
 */
export const featureTextSizeOptions = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
];

/**
 * Billing period options for pricing plans
 */
export const billingPeriodOptions = [
  { label: 'Monthly (/mo)', value: 'monthly' },
  { label: 'Annually (/yr)', value: 'annually' },
  { label: 'Weekly (/wk)', value: 'weekly' },
  { label: 'One-time', value: 'one-time' },
  { label: 'Custom', value: 'custom' },
];

/**
 * Pricing feature item fields - structured feature with icon and included status
 */
export const pricingFeatureFields: TinaField[] = [
  {
    type: 'string',
    label: 'Feature Text',
    name: 'text',
    required: true,
  },
  {
    type: 'boolean',
    label: 'Included',
    name: 'included',
    description: 'Is this feature included in the plan? Unchecked shows as excluded with X icon.',
  },
  {
    ...iconSchema,
    label: 'Custom Icon',
    name: 'icon',
    description: 'Optional custom icon (defaults to checkmark or X based on included status)',
  } as TinaField,
];

/**
 * Pricing plan CTA button fields - supports multiple buttons with variants
 */
export const pricingButtonFields: TinaField[] = [
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
    type: 'string',
    label: 'Variant',
    name: 'variant',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
      { label: 'Secondary', value: 'secondary' },
    ],
  },
  {
    ...iconSchema,
    label: 'Button Icon',
    name: 'icon',
    description: 'Optional icon to display in button',
  } as TinaField,
];

/**
 * Pricing plan item field template - Object with plan details, features, and CTA.
 * Used in pricing sections.
 */
export const pricingPlanFields: TinaField[] = [
  {
    type: 'string',
    label: 'Plan Name',
    name: 'name',
    required: true,
  },
  {
    type: 'string',
    label: 'Price',
    name: 'price',
    description: 'Numeric price value (e.g., "99", "149.99", "Free", "Custom")',
  },
  {
    type: 'string',
    label: 'Description',
    name: 'planDescription',
  },
  {
    type: 'string',
    label: 'Currency Prefix',
    name: 'currencyPrefix',
    description: 'Symbol before price (e.g., "$", "€", "£", "A$")',
  },
  {
    type: 'string',
    label: 'Currency Suffix',
    name: 'currencySuffix',
    description: 'Region/currency code after price (e.g., "AUD", "USD", "EUR")',
  },
  {
    type: 'string',
    label: 'Billing Period',
    name: 'billingPeriod',
    options: billingPeriodOptions,
  },
  {
    type: 'string',
    label: 'Custom Billing Period',
    name: 'customBillingPeriod',
    description: 'Custom billing period text (only used when Billing Period is "Custom")',
  },
  {
    type: 'string',
    label: 'Price Color',
    name: 'priceColor',
    description: 'Color for the price display',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Accent', value: 'accent' },
      { label: 'Muted', value: 'muted' },
    ],
  },
  {
    type: 'object',
    label: 'Features',
    name: 'features',
    list: true,
    description: 'List of features for this plan',
    ui: {
      max: 15,
      defaultItem: {
        text: 'Feature description',
        included: true,
      },
      itemProps: (item: Record<string, any>) => ({
        label: `${item?.included === false ? '✗' : '✓'} ${item?.text || 'Feature'}`,
      }),
    },
    fields: pricingFeatureFields,
  },
  {
    type: 'string',
    label: 'Feature Text Size',
    name: 'featureTextSize',
    description: 'Size of feature list text and icons',
    options: featureTextSizeOptions,
  },
  {
    type: 'boolean',
    label: 'Highlighted',
    name: 'highlighted',
    description: 'Highlight this plan as recommended/popular',
  },
  {
    type: 'string',
    label: 'Highlight Badge Text',
    name: 'highlightBadgeText',
    description: 'Custom badge text (defaults to "Most Popular")',
  },
  {
    type: 'object',
    label: 'CTA Buttons',
    name: 'buttons',
    list: true,
    ui: {
      max: 3,
      defaultItem: {
        label: 'Get Started',
        href: '/contact',
        variant: 'primary',
      },
      itemProps: (item: Record<string, string>) => ({
        label: item?.label || 'Button',
      }),
    },
    fields: pricingButtonFields,
  },
];

/**
 * Pricing plans list field - Array of pricing plan items.
 * Used in pricing sections.
 */
export const pricingPlansListField: TinaField = {
  type: 'object',
  label: 'Plans',
  name: 'plans',
  list: true,
  ui: {
    defaultItem: {
      name: 'Basic',
      price: '49',
      currencyPrefix: '$',
      currencySuffix: 'AUD',
      billingPeriod: 'monthly',
      featureTextSize: 'md',
      planDescription: 'Perfect for getting started',
      features: [
        { text: 'Core features included', included: true },
        { text: 'Email support', included: true },
        { text: 'Advanced analytics', included: false },
      ],
      buttons: [
        { label: 'Get Started', href: '/contact', variant: 'primary' },
      ],
    },
    itemProps: (item: Record<string, string>) => ({
      label: item?.name || 'Plan',
    }),
  },
  fields: pricingPlanFields,
};

/**
 * FAQ item field template - Object with question and answer.
 * Used in FAQ sections.
 */
export const faqItemFields: TinaField[] = [
  {
    type: 'string',
    label: 'Question',
    name: 'question',
    required: true,
  },
  {
    type: 'rich-text',
    label: 'Answer',
    name: 'answer',
    required: true,
  },
];

/**
 * FAQ list field - Array of FAQ items.
 * Used in FAQ sections.
 */
export const faqListField: TinaField = {
  type: 'object',
  label: 'FAQ Items',
  name: 'items',
  list: true,
  ui: {
    defaultItem: {
      question: 'What is your question?',
      answer: { type: 'root', children: [{ type: 'p', children: [{ type: 'text', text: 'Answer goes here.' }] }] },
    },
    itemProps: (item: Record<string, string>) => ({
      label: item?.question || 'FAQ',
    }),
  },
  fields: faqItemFields,
};

/**
 * Milestone/Timeline item field template - Object with year and event.
 * Used in timeline/milestones sections.
 */
export const milestoneItemFields: TinaField[] = [
  {
    type: 'string',
    label: 'Date',
    name: 'date',
    description: 'Display date for the milestone (e.g., "Q1 2024", "January 2024")',
    required: true,
  },
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
    type: 'string',
    label: 'Status',
    name: 'status',
    options: [
      { label: 'Upcoming', value: 'upcoming' },
      { label: 'In Progress', value: 'in-progress' },
      { label: 'Completed', value: 'completed' },
    ],
  },
];

/**
 * Milestones list field - Array of milestone items.
 * Used in timeline sections.
 */
export const milestonesListField: TinaField = {
  type: 'object',
  label: 'Milestones',
  name: 'milestones',
  list: true,
  ui: {
    defaultItem: {
      date: 'Q1 2024',
      title: 'Milestone title',
      status: 'upcoming',
    },
    itemProps: (item: Record<string, string>) => ({
      label: `${item?.date || ''} - ${item?.title || 'Milestone'}`,
    }),
  },
  fields: milestoneItemFields,
};

/**
 * Contact card item field template - Object with contact information.
 * Used in contact sections.
 */
export const contactCardFields: TinaField[] = [
  {
    type: 'string',
    label: 'Type',
    name: 'type',
    options: [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Address', value: 'address' },
      { label: 'Hours', value: 'hours' },
      { label: 'Social', value: 'social' },
      { label: 'Other', value: 'other' },
    ],
    description: 'Type of contact information (determines icon and link format)',
  },
  {
    ...iconSchema,
    label: 'Icon',
    name: 'icon',
  } as TinaField,
  {
    type: 'string',
    label: 'Title',
    name: 'title',
    required: true,
  },
  {
    type: 'string',
    label: 'Description',
    name: 'contactDescription',
  },
  {
    type: 'string',
    label: 'Value',
    name: 'value',
    description: 'The contact value (email, phone, etc.)',
  },
  {
    type: 'string',
    label: 'Link',
    name: 'href',
    description: 'Optional link (mailto:, tel:, etc.)',
  },
  {
    type: 'string',
    label: 'Action Text',
    name: 'action',
    description: 'Button/link text (e.g., "Send Email", "Call Now")',
  },
];

/**
 * Contact cards list field - Array of contact card items.
 * Used in contact sections.
 */
export const contactCardsListField: TinaField = {
  type: 'object',
  label: 'Contact Cards',
  name: 'cards',
  list: true,
  ui: {
    defaultItem: {
      title: 'Email Us',
      description: 'Send us a message',
      value: 'hello@example.com',
      href: 'mailto:hello@example.com',
      action: 'Send Email',
    },
    itemProps: (item: Record<string, string>) => ({
      label: item?.title || 'Contact Card',
    }),
  },
  fields: contactCardFields,
};

/**
 * Result/Metric item field template - Object with metric value and label.
 * Used in case study results and post sidebars.
 */
export const resultItemFields: TinaField[] = [
  {
    type: 'string',
    label: 'Metric',
    name: 'metric',
    required: true,
    description: 'The result value (e.g., "40%", "2x", "$500K")',
  },
  {
    type: 'string',
    label: 'Label',
    name: 'label',
    required: true,
    description: 'Description of what the metric represents',
  },
];

/**
 * Results list field - Array of result items.
 * Used in case study sidebars and results sections.
 */
export const resultsListField: TinaField = {
  type: 'object',
  label: 'Results',
  name: 'results',
  list: true,
  ui: {
    defaultItem: {
      metric: '50%',
      label: 'Improvement',
    },
    itemProps: (item: Record<string, string>) => ({
      label: `${item?.metric || ''} - ${item?.label || 'Result'}`,
    }),
  },
  fields: resultItemFields,
};

'use client';

import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { cn } from '@/lib/utils';
import { InView } from '@/components/motion-primitives/in-view';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from './shared/block-header';
import { headerSchemaFields } from '@/tina/fields/header';

// Import all block components for column rendering
import { PageHero } from './page-hero';
import { ContentSection } from './content-section';
import { CtaSection } from './cta-section';
import { TestimonialsSection } from './testimonials-section';
import { PricingSection } from './pricing-section';
import { StatsGrid } from './stats-grid';
import { TeamGrid } from './team-grid';
import { PostsGrid } from './posts-grid';
import { FaqSection } from './faq-section';
import { Milestones } from './milestones';
import { ContactCards } from './contact-cards';
import { DraftTopics } from './draft-topics';
import { EmptyState } from './empty-state';
import { ProcessSteps } from './process-steps';
import { ServiceCards } from './service-cards';
import { FeatureShowcase } from './feature-showcase';
import { LinkCards } from './link-cards';
import { IconGrid } from './icon-grid';
import { Video } from './video';
import { Callout } from './callout';

// Import all block schemas for column templates
import { pageHeroBlockSchema } from './page-hero';
import { contentSectionBlockSchema } from './content-section';
import { ctaSectionBlockSchema } from './cta-section';
import { testimonialsSectionBlockSchema } from './testimonials-section';
import { pricingSectionBlockSchema } from './pricing-section';
import { statsGridBlockSchema } from './stats-grid';
import { teamGridBlockSchema } from './team-grid';
import { postsGridBlockSchema } from './posts-grid';
import { faqSectionBlockSchema } from './faq-section';
import { milestonesBlockSchema } from './milestones';
import { contactCardsBlockSchema } from './contact-cards';
import { draftTopicsBlockSchema } from './draft-topics';
import { emptyStateBlockSchema } from './empty-state';
import { processStepsBlockSchema } from './process-steps';
import { serviceCardsBlockSchema } from './service-cards';
import { featureShowcaseBlockSchema } from './feature-showcase';
import { linkCardsBlockSchema } from './link-cards';
import { iconGridBlockSchema } from './icon-grid';
import { videoBlockSchema } from './video';
import { calloutBlockSchema } from './callout';

// Types will be generated after running `tinacms build` or `pnpm dev`
// Using inline type until generation completes
interface PageBlocksTwoColumn {
  __typename?: string;
  background?: string | null;
  badge?: { text?: string | null; icon?: any } | null;
  title?: string | null;
  highlightWords?: string | null;
  subtitle?: string | null;
  columnRatio?: string | null;
  gap?: string | null;
  padding?: string | null;
  verticalAlign?: string | null;
  reverseOnMobile?: boolean | null;
  leftColumn?: any[] | null;
  rightColumn?: any[] | null;
}

import type { Insight, CaseStudy } from '@/tina/__generated__/types';

interface ColumnBlockProps {
  block: any;
  posts?: (Insight | CaseStudy)[];
  tags?: Array<{ name: string; slug: string; count?: number }>;
}

/**
 * Renders a block within a column based on its __typename.
 * Reuses all existing block components from the main blocks index.
 */
function ColumnBlock({ block, posts, tags }: ColumnBlockProps) {
  if (!block) return null;

  // Extract the block type from __typename
  // e.g., "PageBlocksTwoColumnLeftColumnPageHero" -> need to map to component
  const typename = block.__typename || '';

  // Match patterns like PageBlocksTwoColumnLeftColumnXxx or PageBlocksTwoColumnRightColumnXxx
  // and render the appropriate block component
  if (typename.includes('PageHero')) {
    return <PageHero data={block} />;
  }
  if (typename.includes('ContentSection')) {
    return <ContentSection data={block} />;
  }
  if (typename.includes('CtaSection')) {
    return <CtaSection data={block} />;
  }
  if (typename.includes('TestimonialsSection')) {
    return <TestimonialsSection data={block} />;
  }
  if (typename.includes('PricingSection')) {
    return <PricingSection data={block} />;
  }
  if (typename.includes('StatsGrid')) {
    return <StatsGrid data={block} />;
  }
  if (typename.includes('TeamGrid')) {
    return <TeamGrid data={block} />;
  }
  if (typename.includes('PostsGrid')) {
    return <PostsGrid data={block} posts={posts} tags={tags} />;
  }
  if (typename.includes('FaqSection')) {
    return <FaqSection data={block} />;
  }
  if (typename.includes('Milestones')) {
    return <Milestones data={block} />;
  }
  if (typename.includes('ContactCards')) {
    return <ContactCards data={block} />;
  }
  if (typename.includes('DraftTopics')) {
    return <DraftTopics data={block} />;
  }
  if (typename.includes('EmptyState')) {
    return <EmptyState data={block} />;
  }
  if (typename.includes('ProcessSteps')) {
    return <ProcessSteps data={block} />;
  }
  if (typename.includes('ServiceCards')) {
    return <ServiceCards data={block} />;
  }
  if (typename.includes('FeatureShowcase')) {
    return <FeatureShowcase data={block} />;
  }
  if (typename.includes('LinkCards')) {
    return <LinkCards data={block} />;
  }
  if (typename.includes('IconGrid')) {
    return <IconGrid data={block} />;
  }
  if (typename.includes('Video')) {
    return <Video data={block} />;
  }
  if (typename.includes('Callout')) {
    return <Callout data={block} />;
  }

  // Fallback - log unknown block type for debugging
  console.warn('Unknown column block type:', typename);
  return null;
}

export interface TwoColumnProps {
  data: PageBlocksTwoColumn;
  posts?: (Insight | CaseStudy)[];
  tags?: Array<{ name: string; slug: string; count?: number }>;
}

/**
 * Two Column Layout block - Flexible container for arranging content side by side.
 * Supports all existing page blocks in each column for maximum flexibility.
 */
export function TwoColumn({ data, posts, tags }: TwoColumnProps) {
  const paddingClasses: Record<string, string> = {
    sm: 'py-12 md:py-16',
    md: 'py-24 lg:py-32',
    lg: 'py-20 md:py-32',
  };

  const columnWidthClasses: Record<string, { left: string; right: string }> = {
    '50-50': { left: 'lg:w-1/2', right: 'lg:w-1/2' },
    '60-40': { left: 'lg:w-3/5', right: 'lg:w-2/5' },
    '40-60': { left: 'lg:w-2/5', right: 'lg:w-3/5' },
    '66-33': { left: 'lg:w-2/3', right: 'lg:w-1/3' },
    '33-66': { left: 'lg:w-1/3', right: 'lg:w-2/3' },
  };

  const gapClasses: Record<string, string> = {
    sm: 'gap-8 lg:gap-12',
    md: 'gap-12 lg:gap-16',
    lg: 'gap-16 lg:gap-24',
  };

  const columnRatio = data.columnRatio || '50-50';
  const widthClasses = columnWidthClasses[columnRatio];
  const verticalAlign = data.verticalAlign || 'start';

  const alignClasses: Record<string, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };

  return (
    <section
      className={cn(
        paddingClasses[data.padding || 'md'],
        data.background || 'bg-background'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <BlockHeader data={data} align="center" />

        <InView
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          viewOptions={{ once: true, margin: '-100px' }}
        >
          <div
            className={cn(
              'flex flex-col lg:flex-row',
              gapClasses[data.gap || 'md'],
              alignClasses[verticalAlign],
              data.reverseOnMobile && 'flex-col-reverse'
            )}
          >
            {/* Left Column */}
            <div className={cn('w-full', widthClasses.left)}>
              {data.leftColumn?.map((block: any, index: number) => (
                <div 
                  key={index} 
                  data-tina-field={tinaField(block)} 
                  className="mb-6 last:mb-0 [&>section]:py-0 [&>section]:px-0 [&>section>div]:px-0 [&>section>div]:max-w-none"
                >
                  <ColumnBlock block={block} posts={posts} tags={tags} />
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className={cn('w-full', widthClasses.right)}>
              {data.rightColumn?.map((block: any, index: number) => (
                <div 
                  key={index} 
                  data-tina-field={tinaField(block)} 
                  className="mb-6 last:mb-0 [&>section]:py-0 [&>section]:px-0 [&>section>div]:px-0 [&>section>div]:max-w-none"
                >
                  <ColumnBlock block={block} posts={posts} tags={tags} />
                </div>
              ))}
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}

/**
 * All available block templates for columns (excludes twoColumn to prevent nesting)
 */
const columnBlockTemplates = [
  // Primary blocks
  pageHeroBlockSchema,
  contentSectionBlockSchema,
  ctaSectionBlockSchema,
  testimonialsSectionBlockSchema,
  pricingSectionBlockSchema,
  statsGridBlockSchema,
  teamGridBlockSchema,
  postsGridBlockSchema,
  faqSectionBlockSchema,
  milestonesBlockSchema,
  contactCardsBlockSchema,
  draftTopicsBlockSchema,
  emptyStateBlockSchema,
  // Purpose-specific card blocks
  processStepsBlockSchema,
  serviceCardsBlockSchema,
  featureShowcaseBlockSchema,
  linkCardsBlockSchema,
  iconGridBlockSchema,
  // Utility blocks
  videoBlockSchema,
  calloutBlockSchema,
];

/**
 * TinaCMS Schema for TwoColumn block
 */
export const twoColumnBlockSchema: Template = {
  name: 'twoColumn',
  label: 'Two Column Layout',
  ui: {
    previewSrc: '/blocks/two-column.png',
    defaultItem: {
      columnRatio: '60-40',
      gap: 'md',
      padding: 'md',
      verticalAlign: 'start',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    ...headerSchemaFields as any,
    {
      type: 'string',
      label: 'Column Ratio',
      name: 'columnRatio',
      options: [
        { label: '50% / 50%', value: '50-50' },
        { label: '60% / 40%', value: '60-40' },
        { label: '40% / 60%', value: '40-60' },
        { label: '66% / 33%', value: '66-33' },
        { label: '33% / 66%', value: '33-66' },
      ],
    },
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
    {
      type: 'string',
      label: 'Vertical Alignment',
      name: 'verticalAlign',
      options: [
        { label: 'Top', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'end' },
      ],
    },
    {
      type: 'boolean',
      label: 'Reverse on Mobile',
      name: 'reverseOnMobile',
      description: 'Show right column first on mobile devices',
    },
    {
      type: 'object',
      label: 'Left Column',
      name: 'leftColumn',
      list: true,
      templates: columnBlockTemplates as any,
    },
    {
      type: 'object',
      label: 'Right Column',
      name: 'rightColumn',
      list: true,
      templates: columnBlockTemplates as any,
    },
  ],
};

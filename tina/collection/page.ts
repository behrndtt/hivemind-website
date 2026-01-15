import type { Collection } from 'tinacms';
// Primary page block schemas
import { pageHeroBlockSchema } from '@/components/blocks/page-hero';
import { contentSectionBlockSchema } from '@/components/blocks/content-section';
import { ctaSectionBlockSchema } from '@/components/blocks/cta-section';
import { testimonialsSectionBlockSchema } from '@/components/blocks/testimonials-section';
import { pricingSectionBlockSchema } from '@/components/blocks/pricing-section';
import { statsGridBlockSchema } from '@/components/blocks/stats-grid';
import { teamGridBlockSchema } from '@/components/blocks/team-grid';
import { postsGridBlockSchema } from '@/components/blocks/posts-grid';
import { faqSectionBlockSchema } from '@/components/blocks/faq-section';
import { milestonesBlockSchema } from '@/components/blocks/milestones';
import { contactCardsBlockSchema } from '@/components/blocks/contact-cards';
import { draftTopicsBlockSchema } from '@/components/blocks/draft-topics';
import { emptyStateBlockSchema } from '@/components/blocks/empty-state';

// Purpose-specific card block schemas (replacing cardGridBlockSchema)
import { processStepsBlockSchema } from '@/components/blocks/process-steps';
import { serviceCardsBlockSchema } from '@/components/blocks/service-cards';
import { featureShowcaseBlockSchema } from '@/components/blocks/feature-showcase';
import { linkCardsBlockSchema } from '@/components/blocks/link-cards';
import { iconGridBlockSchema } from '@/components/blocks/icon-grid';

// Sidebar blocks
import { tagsSidebarBlockSchema } from '@/components/blocks/tags-sidebar';
import { quickLinksBlockSchema } from '@/components/blocks/quick-links';

// Layout blocks
import { twoColumnBlockSchema } from '@/components/blocks/two-column';

// Utility blocks
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') {
        return '/';
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
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
        // Sidebar blocks
        tagsSidebarBlockSchema,
        quickLinksBlockSchema,
        // Layout blocks
        twoColumnBlockSchema,
        // Utility blocks
        videoBlockSchema,
        calloutBlockSchema,
      ],
    },
  ],
};

export default Page;

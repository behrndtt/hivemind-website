import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks, Insight, CaseStudy } from "../../tina/__generated__/types";

// Primary block components
import { PageHero } from "./page-hero";
import { ContentSection } from "./content-section";
import { CtaSection } from "./cta-section";
import { TestimonialsSection } from "./testimonials-section";
import { PricingSection } from "./pricing-section";
import { StatsGrid } from "./stats-grid";
import { TeamGrid } from "./team-grid";
import { PostsGrid } from "./posts-grid";
import { FaqSection } from "./faq-section";
import { Milestones } from "./milestones";
import { ContactCards } from "./contact-cards";
import { DraftTopics } from "./draft-topics";
import { EmptyState } from "./empty-state";

// New purpose-specific card blocks (replacing CardGrid)
import { ProcessSteps } from "./process-steps";
import { ServiceCards } from "./service-cards";
import { FeatureShowcase } from "./feature-showcase";
import { LinkCards } from "./link-cards";
import { IconGrid } from "./icon-grid";

// Sidebar blocks
import { TagsSidebar } from "./tags-sidebar";
import { QuickLinks } from "./quick-links";

// Layout blocks
import { TwoColumn } from "./two-column";

// Utility block components
import { Video } from "./video";
import { Callout } from "./callout";

// Props for Blocks component, including optional posts data for PostsGrid
interface BlocksProps extends Omit<Page, "id" | "_sys" | "_values"> {
  posts?: (Insight | CaseStudy)[];
  /** Unique tags extracted from posts, for use in TagsSidebar */
  tags?: Array<{ name: string; slug: string; count?: number }>;
}

export const Blocks = ({ blocks, posts, tags }: BlocksProps) => {
  if (!blocks) return null;
  return (
    <>
      {blocks.map(function (block, i) {
        if (!block) return null;
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block block={block} posts={posts} tags={tags} />
          </div>
        );
      })}
    </>
  );
};

interface BlockComponentProps {
  block: PageBlocks;
  posts?: (Insight | CaseStudy)[];
  tags?: Array<{ name: string; slug: string; count?: number }>;
}

const Block = ({ block, posts, tags }: BlockComponentProps) => {
  switch (block.__typename) {
    // Primary blocks
    case "PageBlocksPageHero":
      return <PageHero data={block} />;
    case "PageBlocksContentSection":
      return <ContentSection data={block} />;
    case "PageBlocksCtaSection":
      return <CtaSection data={block} />;
    case "PageBlocksTestimonialsSection":
      return <TestimonialsSection data={block} />;
    case "PageBlocksPricingSection":
      return <PricingSection data={block} />;
    case "PageBlocksStatsGrid":
      return <StatsGrid data={block} />;
    case "PageBlocksTeamGrid":
      return <TeamGrid data={block} />;
    case "PageBlocksPostsGrid":
      // Render sidebar content if showSidebar is enabled
      const sidebarContent = block.showSidebar ? (
        <>
          <TagsSidebar
            data={{ title: 'Topics', contentType: block.contentType || 'insights' } as any}
            tags={tags}
            basePath={block.contentType === 'case-studies' ? '/case-studies/tag' : '/insights/tag'}
          />
          <CtaSection
            data={{
              variant: 'compact',
              title: 'Need Expert Help?',
              subtitle: 'Get in touch with our team for personalized guidance.',
              buttons: [{ label: 'Contact Us', href: '/contact', variant: 'default' }],
            } as any}
          />
        </>
      ) : undefined;
      return <PostsGrid data={block} posts={posts} tags={tags} sidebarContent={sidebarContent} />;
    case "PageBlocksFaqSection":
      return <FaqSection data={block} />;
    case "PageBlocksMilestones":
      return <Milestones data={block} />;
    case "PageBlocksContactCards":
      return <ContactCards data={block} />;
    case "PageBlocksDraftTopics":
      return <DraftTopics data={block} />;
    case "PageBlocksEmptyState":
      return <EmptyState data={block} />;
    // Purpose-specific card blocks
    case "PageBlocksProcessSteps":
      return <ProcessSteps data={block} />;
    case "PageBlocksServiceCards":
      return <ServiceCards data={block} />;
    case "PageBlocksFeatureShowcase":
      return <FeatureShowcase data={block} />;
    case "PageBlocksLinkCards":
      return <LinkCards data={block} />;
    case "PageBlocksIconGrid":
      return <IconGrid data={block} />;
    // Sidebar blocks
    case "PageBlocksTagsSidebar":
      return <TagsSidebar data={block} />;
    case "PageBlocksQuickLinks":
      return <QuickLinks data={block} />;
    // Layout blocks
    case "PageBlocksTwoColumn":
      return <TwoColumn data={block} />;
    // Utility blocks
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    default:
      return null;
  }
};

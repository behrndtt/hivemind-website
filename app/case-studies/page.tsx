"use client";

import {
  PageHero,
  ContentSection,
  PostsGrid,
  StatsGrid,
  CtaSection,
  EmptyState,
  caseStudiesEmptyState,
  DraftTopics,
} from "@/components/blocks";
import { InView } from "@/components/motion-primitives/in-view";
import {
  caseStudiesHero,
  keyOutcomes,
  caseStudiesCta,
  getFeaturedCaseStudy,
  getNonFeaturedPublishedCaseStudies,
  getDraftCaseStudies,
} from "@/lib/data/case-studies";

export default function CaseStudiesPage() {
  const featuredStudy = getFeaturedCaseStudy();
  const otherStudies = getNonFeaturedPublishedCaseStudies();
  const draftStudies = getDraftCaseStudies();
  const hasOtherStudies = otherStudies.length > 0;

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <PageHero
        badge={caseStudiesHero.badge}
        title={`${caseStudiesHero.title} ${caseStudiesHero.highlightedWord}`}
        highlightedWords={caseStudiesHero.highlightedWord}
        subtitle={caseStudiesHero.subtitle}
        variant="compact"
      />

      {/* Featured Case Study */}
      {featuredStudy && (
        <ContentSection padding="lg">
          <InView
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true }}
          >
            <PostsGrid
              posts={[featuredStudy]}
              variant="featured"
              columns={1}
              showCategory={true}
              showTags={true}
            />
          </InView>
        </ContentSection>
      )}

      {/* More Case Studies */}
      <ContentSection
        badge="More Success Stories"
        title={hasOtherStudies ? "More Case Studies" : "Coming Soon"}
        subtitle={hasOtherStudies 
          ? "Explore more examples of how we've helped organisations transform their Microsoft environments."
          : "We're documenting more client success stories. Check back soon for additional case studies across various industries."
        }
        background="subtle"
        className="bg-zinc-950"
      >
        {hasOtherStudies ? (
          <PostsGrid
            posts={otherStudies}
            variant="card"
            columns={2}
            showCategory={true}
            showTags={true}
            showDate={false}
            preset="blur-slide"
          />
        ) : (
          <div className="space-y-12">
            <EmptyState {...caseStudiesEmptyState} />
            {draftStudies.length > 0 && (
              <DraftTopics 
                drafts={draftStudies} 
                title="Case Studies in Progress"
              />
            )}
          </div>
        )}
      </ContentSection>

      {/* Key Outcomes */}
      <ContentSection
        badge="Our Track Record"
        title="Consistent Results"
        subtitle="Across all our engagements, we deliver measurable improvements in efficiency, security, and user satisfaction."
      >
        <StatsGrid
          stats={keyOutcomes.map((o) => ({
            icon: o.icon,
            value: o.value,
            label: o.label,
          }))}
          variant="card-grid"
        />
      </ContentSection>

      {/* CTA Section */}
      <CtaSection
        title={caseStudiesCta.title}
        subtitle={caseStudiesCta.subtitle}
        ctas={caseStudiesCta.ctas}
        variant="full-width"
      />
    </main>
  );
}

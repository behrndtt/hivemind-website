import {
  PageHero,
  ContentSection,
  CardGrid,
  TeamGrid,
  CtaSection,
} from "@/components/blocks";
import { InView } from "@/components/motion-primitives/in-view";
import { Badge } from "@/components/ui/badge";
import { MilestoneTimeline } from "@/components/ui/milestone-timeline";
import {
  aboutHero,
  aboutStory,
  aboutMilestones,
  aboutValues,
  aboutTeam,
  aboutCta,
} from "@/lib/data/about";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <PageHero
        badge={aboutHero.badge}
        title={`${aboutHero.title} ${aboutHero.highlightedWord}`}
        highlightedWords={aboutHero.highlightedWord}
        subtitle={aboutHero.subtitle}
        variant="compact"
      />

      {/* Story Section */}
      <ContentSection align="left">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Main content - header and story paragraphs */}
            <InView
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
            <Badge
              variant="outline"
              className="mb-4 border-zinc-700 text-zinc-400"
            >
              {aboutStory.badge}
            </Badge>
            <h2 className="mb-6 text-3xl font-light tracking-tight md:text-4xl font-serif text-white">
              {aboutStory.title}
            </h2>
            <div className="space-y-4 text-zinc-400">
              {aboutStory.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            </InView>

          {/* Sidebar - milestone timeline */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
            <h3 className="text-xl font-serif font-light text-white mb-6">
              Our Journey
            </h3>
            <MilestoneTimeline events={aboutMilestones} />
          </div>
        </div>
      </ContentSection>

      {/* Values Section */}
      <CardGrid
        items={aboutValues}
        variant="icon-top"
        columns={4}
        badge="Our Values"
        title="What Drives Us"
        subtitle="Our values aren't just words on a wall—they guide every decision we make and every solution we deliver."
        className="bg-zinc-950 border-y border-zinc-800"
      />

      {/* Team Section */}
      <TeamGrid
        members={aboutTeam}
        badge="Our Team"
        title="Meet the Hivemind"
        subtitle="A dedicated team of Microsoft specialists, each bringing unique expertise to help your business succeed."
      />

      {/* CTA Section */}
      <CtaSection
        icon={aboutCta.icon}
        title={aboutCta.title}
        subtitle={aboutCta.subtitle}
        ctas={aboutCta.ctas}
        background="radial"
        variant="inline"
      />
    </div>
  );
}

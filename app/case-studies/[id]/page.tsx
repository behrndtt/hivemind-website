import { notFound } from "next/navigation";
import {
  PostHero,
  PostContent,
  PostSidebar,
  RelatedPosts,
} from "@/components/blocks";
import { caseStudies } from "@/lib/data/case-studies";
import { filterPosts } from "@/lib/data/posts";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return caseStudies
    .filter((cs) => !cs.draft)
    .map((cs) => ({
      id: cs.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const caseStudy = caseStudies.find((cs) => cs.id === id);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${caseStudy.title} | Hivemind Solutions`,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const caseStudy = caseStudies.find((cs) => cs.id === id && !cs.draft);

  if (!caseStudy) {
    notFound();
  }

  // Get related case studies (same category, excluding current)
  const relatedPosts = filterPosts(caseStudies, {
    category: caseStudy.category,
    draft: false,
  })
    .filter((cs) => cs.id !== caseStudy.id)
    .slice(0, 3);

  return (
    <main className="flex-1">
      <PostHero
        title={caseStudy.title}
        summary={caseStudy.summary}
        category={caseStudy.category}
        featured={caseStudy.featured}
        author={caseStudy.author}
        publishedAt={caseStudy.publishedAt}
        readingTime={caseStudy.readingTime}
        image={caseStudy.image}
        backLink={{ href: "/case-studies", label: "Back to Case Studies" }}
      />

      <section className="bg-black py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <PostContent
              content={caseStudy.content}
              challenge={caseStudy.challenge}
              solution={caseStudy.solution}
              testimonial={caseStudy.testimonial}
            />
            <PostSidebar
              results={caseStudy.results}
              tags={caseStudy.tags}
              cta={{
                title: "Ready to Get Started?",
                description: "Let's discuss how we can achieve similar results for your organisation.",
                buttonText: "Contact Us",
                buttonHref: "/contact",
              }}
            />
          </div>
        </div>
      </section>

      <RelatedPosts title="Related Case Studies" posts={relatedPosts} />
    </main>
  );
}

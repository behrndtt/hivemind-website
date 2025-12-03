import { notFound } from "next/navigation";
import {
  PostHero,
  PostContent,
  PostSidebar,
  RelatedPosts,
} from "@/components/blocks";
import { insights } from "@/lib/data/insights";
import { filterPosts } from "@/lib/data/posts";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return insights
    .filter((insight) => !insight.draft)
    .map((insight) => ({
      id: insight.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const insight = insights.find((i) => i.id === id);

  if (!insight) {
    return {
      title: "Insight Not Found",
    };
  }

  return {
    title: `${insight.title} | Hivemind Solutions`,
    description: insight.summary,
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { id } = await params;
  const insight = insights.find((i) => i.id === id && !i.draft);

  if (!insight) {
    notFound();
  }

  // Get related insights (same category, excluding current)
  const relatedPosts = filterPosts(insights, {
    category: insight.category,
    draft: false,
  })
    .filter((i) => i.id !== insight.id)
    .slice(0, 3);

  return (
    <main className="flex-1">
      <PostHero
        title={insight.title}
        summary={insight.summary}
        category={insight.category}
        featured={insight.featured}
        author={insight.author}
        publishedAt={insight.publishedAt}
        readingTime={insight.readingTime}
        image={insight.image}
        backLink={{ href: "/insights", label: "Back to Insights" }}
      />

      <section className="bg-black py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <PostContent
              content={insight.content}
              testimonial={insight.testimonial}
            />
            <PostSidebar
              tags={insight.tags}
              cta={{
                title: "Ready to Get Started?",
                description: "Have questions about this topic? Our team is here to help.",
                buttonText: "Contact Us",
                buttonHref: "/contact",
              }}
            />
          </div>
        </div>
      </section>

      <RelatedPosts title="Related Insights" posts={relatedPosts} />
    </main>
  );
}

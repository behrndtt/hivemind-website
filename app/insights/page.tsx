"use client";

import {
  PageHero,
  ContentSection,
  PostsGrid,
  CtaSection,
  EmptyState,
  insightsEmptyState,
  DraftTopics,
} from "@/components/blocks";
import { InView } from "@/components/motion-primitives/in-view";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";
import {
  insightsHero,
  insightsCategories,
  insightsCta,
  getPublishedInsights,
  getDraftInsights,
  getFeaturedInsight,
} from "@/lib/data/insights";

export default function InsightsPage() {
  const publishedInsights = getPublishedInsights();
  const draftInsights = getDraftInsights();
  const featuredInsight = getFeaturedInsight();
  const hasPublishedInsights = publishedInsights.length > 0;
  // Filter out featured from regular posts to avoid duplication
  const regularInsights = featuredInsight 
    ? publishedInsights.filter(post => post.id !== featuredInsight.id)
    : publishedInsights;

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <PageHero
        badge={insightsHero.badge}
        title={`${insightsHero.title} ${insightsHero.highlightedWord} ${insightsHero.titleSuffix}`}
        highlightedWords={insightsHero.highlightedWord}
        subtitle={insightsHero.subtitle}
        variant="compact"
      />

      {/* Main Content */}
      <ContentSection padding="lg">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Insight */}
            {featuredInsight && (
              <InView
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                viewOptions={{ once: true }}
              >
                <PostsGrid
                  posts={[featuredInsight]}
                  variant="featured"
                  columns={1}
                  showCategory={true}
                  showTags={true}
                  showAuthor={true}
                  showReadingTime={true}
                />
              </InView>
            )}

            {/* Regular Published Insights */}
            {regularInsights.length > 0 && (
              <InView
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                viewOptions={{ once: true }}
              >
                <PostsGrid
                  posts={regularInsights}
                  variant="card"
                  columns={1}
                  showCategory={true}
                  showTags={true}
                  showAuthor={true}
                  showReadingTime={true}
                  preset="blur-slide"
                />
              </InView>
            )}

            {/* Coming Soon - shown when no published insights */}
            {!hasPublishedInsights && (
              <InView
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                viewOptions={{ once: true }}
              >
                <EmptyState {...insightsEmptyState} />
              </InView>
            )}

            {/* Topics We're Working On (Draft Insights) */}
            {draftInsights.length > 0 && (
              <InView
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                viewOptions={{ once: true }}
              >
                <DraftTopics drafts={draftInsights} />
              </InView>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <InView
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              viewOptions={{ once: true }}
            >
              <Card className="border-zinc-800 bg-zinc-900/50">
                <CardContent className="p-6">
                  <h4 className="mb-4">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {insightsCategories.map((category, index) => (
                      <button
                        key={index}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                          category.active
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-zinc-800 text-zinc-400"
                        }`}
                        disabled
                      >
                        <span>{category.name}</span>
                        <Badge
                          variant="secondary"
                          className="text-xs border-zinc-700 bg-zinc-800 text-zinc-400"
                        >
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </InView>

            {/* Newsletter Signup */}
            <InView
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              viewOptions={{ once: true }}
            >
              <Card className="border-2 border-primary/20 bg-zinc-900/50">
                <CardContent className="p-6">
                  <Bell className="mb-4 text-primary" />
                  <h4 className="mb-2">
                    Stay Updated
                  </h4>
                  <p className="mb-4 text-sm text-zinc-400">
                    Be the first to know when we publish new insights and
                    resources.
                  </p>
                  <Button
                    asChild
                    className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                  >
                    <Link href="/contact">
                      Get Notified
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </InView>

            {/* Quick Links */}
            <InView
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              viewOptions={{ once: true }}
            >
              <Card className="border-zinc-800 bg-zinc-900/50">
                <CardContent className="p-6">
                  <h4 className="mb-4">
                    Quick Links
                  </h4>
                  <div className="space-y-3">
                    <Link
                      href="/services/consulting"
                      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      <ArrowRight className="h-3 w-3" />
                      Consulting Services
                    </Link>
                    <Link
                      href="/services/support"
                      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      <ArrowRight className="h-3 w-3" />
                      Support Services
                    </Link>
                    <Link
                      href="/case-studies"
                      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      <ArrowRight className="h-3 w-3" />
                      Case Studies
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      <ArrowRight className="h-3 w-3" />
                      Contact Us
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </InView>
          </div>
        </div>
      </ContentSection>

      {/* CTA Section */}
      <CtaSection
        title={insightsCta.title}
        subtitle={insightsCta.subtitle}
        ctas={[
          { label: insightsCta.primaryCta.label, href: insightsCta.primaryCta.href },
          { label: insightsCta.secondaryCta.label, href: insightsCta.secondaryCta.href, variant: "outline" },
        ]}
        variant="full-width"
      />
    </main>
  );
}

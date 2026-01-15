'use client';
import React from 'react';
import { useTina } from 'tinacms/dist/react';
import type { InsightQuery } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import { PostHero } from '@/components/blocks/post-hero';
import { PostContent } from '@/components/blocks/post-content';
import { PostSidebar } from '@/components/blocks/post-sidebar';
import { RelatedPosts } from '@/components/blocks/related-posts';

type InsightPost = InsightQuery['insight'];

interface ClientInsightProps {
  data: InsightQuery;
  variables: {
    relativePath: string;
  };
  query: string;
  relatedPosts?: InsightPost[];
}

export default function InsightClientPage(props: ClientInsightProps) {
  const { relatedPosts = [] } = props;
  const { data } = useTina({ ...props });
  const insight = data.insight;

  return (
    <ErrorBoundary>
      {/* Hero Section */}
      <PostHero
        post={insight}
        backLink={{
          href: '/insights',
          label: 'Back to Insights',
        }}
        contentType="insight"
      />

      {/* Main Content with Sidebar */}
      <section className="bg-background py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <PostContent post={insight} />

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PostSidebar
                post={insight}
                cta={{
                  title: 'Need Expert Guidance?',
                  description: 'Our team can help you implement these strategies in your organisation.',
                  buttonText: 'Get in Touch',
                  buttonHref: '/contact',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <RelatedPosts
          title="Related Insights"
          posts={relatedPosts}
          contentType="insights"
          maxPosts={3}
        />
      )}
    </ErrorBoundary>
  );
}

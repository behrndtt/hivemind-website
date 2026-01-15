'use client';
import React from 'react';
import { useTina } from 'tinacms/dist/react';
import type { CaseStudyQuery } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import { PostHero } from '@/components/blocks/post-hero';
import { PostContent } from '@/components/blocks/post-content';
import { PostSidebar, type PostResult } from '@/components/blocks/post-sidebar';
import { RelatedPosts } from '@/components/blocks/related-posts';

type CaseStudyPost = CaseStudyQuery['caseStudy'];

interface ClientCaseStudyProps {
  data: CaseStudyQuery;
  variables: {
    relativePath: string;
  };
  query: string;
  relatedPosts?: CaseStudyPost[];
}

export default function CaseStudyClientPage(props: ClientCaseStudyProps) {
  const { relatedPosts = [] } = props;
  const { data } = useTina({ ...props });
  const caseStudy = data.caseStudy;

  // Map TinaCMS results to PostSidebar format
  const sidebarResults: PostResult[] = (caseStudy.results || [])
    .filter((r): r is NonNullable<typeof r> => Boolean(r?.value && r?.label))
    .map((r) => ({
      metric: r.value!,
      label: r.label!,
    }));

  return (
    <ErrorBoundary>
      {/* Hero Section */}
      <PostHero
        post={caseStudy}
        backLink={{
          href: '/case-studies',
          label: 'Back to Case Studies',
        }}
        contentType="case-study"
      />

      {/* Main Content with Sidebar */}
      <section className="bg-background py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <PostContent post={caseStudy} />

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PostSidebar
                post={caseStudy}
                results={sidebarResults}
                cta={{
                  title: 'Similar Results for Your Business?',
                  description: 'Let us help you achieve similar outcomes with our proven approach.',
                  buttonText: 'Start a Conversation',
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
          title="More Case Studies"
          posts={relatedPosts}
          contentType="case-studies"
          maxPosts={3}
        />
      )}
    </ErrorBoundary>
  );
}

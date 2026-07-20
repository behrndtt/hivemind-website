'use client';
import React from 'react';
import { useTina } from 'tinacms/dist/react';
import type { CaseStudyQuery } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import { PostHero } from '@/components/blocks/post-hero';
import { PostContent } from '@/components/blocks/post-content';
import { PostSidebar } from '@/components/blocks/post-sidebar';
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
                contentType="case-studies"
                cta={{
                  title: 'Review Your Environment',
                  description: 'Discuss the decisions, risks and delivery constraints affecting your Microsoft environment.',
                  buttonText: 'Discuss Your Priorities',
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

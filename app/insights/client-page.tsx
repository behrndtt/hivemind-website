'use client';

import { useTina } from 'tinacms/dist/react';
import { Blocks } from '@/components/blocks';
import ErrorBoundary from '@/components/error-boundary';
import type { PageQuery, Insight } from '@/tina/__generated__/types';

export interface InsightsClientPageProps {
  pageData: {
    data: {
      page: PageQuery['page'];
    };
    variables: {
      relativePath: string;
    };
    query: string;
  } | null;
  posts: Insight[];
  tags?: Array<{ name: string; slug: string; count?: number }>;
}

export default function InsightsClientPage({ pageData, posts, tags }: InsightsClientPageProps) {
  if (!pageData) {
    return (
      <ErrorBoundary>
        <Blocks posts={posts} tags={tags} />
      </ErrorBoundary>
    );
  }

  return <InsightsPage pageData={pageData} posts={posts} tags={tags} />;
}

function InsightsPage({ pageData, posts, tags }: Omit<InsightsClientPageProps, 'pageData'> & {
  pageData: NonNullable<InsightsClientPageProps['pageData']>;
}) {
  const { data } = useTina({ ...pageData });

  return (
    <ErrorBoundary>
      <Blocks {...data?.page} posts={posts} tags={tags} />
    </ErrorBoundary>
  );
}

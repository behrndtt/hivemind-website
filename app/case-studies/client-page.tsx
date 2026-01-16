'use client';

import { useTina } from 'tinacms/dist/react';
import { Blocks } from '@/components/blocks';
import type { PageQuery, PageQueryVariables, CaseStudy } from '@/tina/__generated__/types';

interface CaseStudiesClientPageProps {
  pageData: {
    data: PageQuery;
    variables: PageQueryVariables;
    query: string;
  } | null;
  posts: CaseStudy[];
  tags?: Array<{ name: string; slug: string; count?: number }>;
}

export default function CaseStudiesClientPage({ pageData, posts, tags }: CaseStudiesClientPageProps) {
  // Handle null pageData during local builds
  if (!pageData) {
    return <Blocks posts={posts} tags={tags} />;
  }

  const { data } = useTina({
    query: pageData.query,
    variables: pageData.variables,
    data: pageData.data,
  });

  return <Blocks {...data?.page} posts={posts} tags={tags} />;
}

import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import InsightsClientPage from './client-page';
import type { Insight } from '@/tina/__generated__/types';
import { extractTagsFromPosts } from '@/lib/tags';

export default async function InsightsPage() {
  // Fetch page data from TinaCMS (content/pages/insights.mdx)
  let pageData;
  try {
    pageData = await client.queries.page({
      relativePath: 'insights.mdx',
    });
  } catch (error) {
    notFound();
  }

  // Fetch all insights for the PostsGrid blocks
  let insights = await client.queries.insightConnection({
    sort: 'date',
    last: 10,
  });
  const allInsights = insights;

  if (!allInsights.data.insightConnection.edges) {
    allInsights.data.insightConnection.edges = [];
  }

  // Paginate to get all insights
  while (insights.data?.insightConnection.pageInfo.hasPreviousPage) {
    insights = await client.queries.insightConnection({
      sort: 'date',
      before: insights.data.insightConnection.pageInfo.endCursor,
    });

    if (!insights.data.insightConnection.edges) {
      break;
    }

    allInsights.data.insightConnection.edges.push(
      ...insights.data.insightConnection.edges.reverse()
    );
  }

  // Extract posts array from connection edges
  const posts = (allInsights.data.insightConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined) as Insight[];

  // Extract unique tags from all posts using shared utility
  const tags = extractTagsFromPosts(posts);

  return (
    <Layout rawPageData={pageData}>
      <InsightsClientPage
        pageData={pageData}
        posts={posts}
        tags={tags}
      />
    </Layout>
  );
}

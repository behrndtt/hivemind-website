import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import InsightsClientPage from './client-page';
import type { Insight } from '@/tina/__generated__/types';
import { extractTagsFromPosts, type TagInfo } from '@/lib/tags';

export default async function InsightsPage() {
  let pageData = null;
  let posts: Insight[] = [];
  let tags: TagInfo[] = [];

  try {
    // Fetch page data from TinaCMS (content/pages/insights.mdx)
    pageData = await client.queries.page({
      relativePath: 'insights.mdx',
    });

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
    posts = (allInsights.data.insightConnection.edges || [])
      .map((edge) => edge?.node)
      .filter((node) => node !== null && node !== undefined) as Insight[];

    // Extract unique tags from all posts using shared utility
    tags = extractTagsFromPosts(posts);
  } catch (error) {
    console.warn('Failed to fetch insights page data:', error);
    // Continue with empty data - page will render with no results
  }

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

import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import InsightsClientPage from './client-page';
import type { Insight } from '@/tina/__generated__/types';

export const revalidate = 300;
export const dynamic = 'force-dynamic';

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

  // Extract unique tags from all posts
  const tagCounts = new Map<string, { name: string; slug: string; count: number }>();
  for (const post of posts) {
    const postTags = post.tags as Array<{ tag?: string }> | undefined;
    if (postTags) {
      for (const tagObj of postTags) {
        if (tagObj?.tag) {
          // tag is a reference path like "content/tags/markdown.mdx"
          const tagPath = tagObj.tag;
          const slug = tagPath.replace('content/tags/', '').replace('.mdx', '');
          const existing = tagCounts.get(slug);
          if (existing) {
            existing.count++;
          } else {
            // Capitalize first letter for display name
            const name = slug.charAt(0).toUpperCase() + slug.slice(1);
            tagCounts.set(slug, { name, slug, count: 1 });
          }
        }
      }
    }
  }
  const tags = Array.from(tagCounts.values()).sort((a, b) => b.count - a.count);

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

import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import InsightClientPage from './client-page';
import type { Insight, InsightQuery } from '@/tina/__generated__/types';

type InsightPost = InsightQuery['insight'];

/**
 * Extract tag filenames from a post's tags array
 * Tags are stored as string references like "content/tags/azure.mdx"
 */
function getTagFilenames(tags: InsightPost['tags']): string[] {
  if (!tags) return [];
  return tags
    .map((t) => {
      const tagRef = t?.tag;
      if (!tagRef) return null;
      // Extract filename from path like "content/tags/azure.mdx" -> "azure"
      const match = tagRef.match(/([^/]+)\.(mdx?|json)$/);
      return match ? match[1] : null;
    })
    .filter((filename): filename is string => Boolean(filename));
}

/**
 * Fetch related insights based on matching tags
 */
async function getRelatedInsights(
  currentFilename: string,
  currentTags: InsightPost['tags'],
  limit = 3
): Promise<InsightPost[]> {
  const tagFilenames = getTagFilenames(currentTags);
  if (tagFilenames.length === 0) return [];

  try {
    const allInsights = await client.queries.insightConnection({ first: 20 });
    const edges = allInsights.data?.insightConnection?.edges || [];

    // Filter: exclude current post, find posts with matching tags
    const related = edges
      .filter((edge) => {
        const insight = edge?.node;
        if (!insight || insight._sys?.filename === currentFilename) return false;
        const postTags = getTagFilenames(insight.tags);
        return postTags.some((tag) => tagFilenames.includes(tag));
      })
      .slice(0, limit)
      .map((edge) => edge?.node as InsightPost);

    return related;
  } catch {
    return [];
  }
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  const data = await client.queries.insight({
    relativePath: `${filepath}.mdx`,
  });

  // Fetch related posts by tags
  const insight = data.data?.insight;
  const relatedPosts = insight
    ? await getRelatedInsights(insight._sys?.filename || '', insight.tags)
    : [];

  return (
    <Layout rawPageData={data}>
      <InsightClientPage {...data} relatedPosts={relatedPosts} />
    </Layout>
  );
}

export async function generateStaticParams() {
  try {
    let insights = await client.queries.insightConnection();
  const allInsights = insights;

  if (!allInsights.data.insightConnection.edges) {
    return [];
  }

  while (insights.data?.insightConnection.pageInfo.hasNextPage) {
    insights = await client.queries.insightConnection({
      after: insights.data.insightConnection.pageInfo.endCursor,
    });

    if (!insights.data.insightConnection.edges) {
      break;
    }

    allInsights.data.insightConnection.edges.push(...insights.data.insightConnection.edges);
  }

  const params =
    allInsights.data?.insightConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
  } catch (error) {
    console.warn('Unable to generate static params for insights:', error);
    return [];
  }
}

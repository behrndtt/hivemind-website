import React from 'react';
import { Metadata } from 'next';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import InsightClientPage from './client-page';
import type { Insight, InsightQuery } from '@/tina/__generated__/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  try {
    const data = await client.queries.insight({
      relativePath: `${filepath}.mdx`,
    });
    const title = data.data?.insight?.title;
    const excerpt = data.data?.insight?.excerpt;
    const description = typeof excerpt === 'string'
      ? excerpt
      : (excerpt as any)?.children?.[0]?.children?.[0]?.text || undefined;

    return {
      title: title ? `${title} | Insight` : undefined,
      description: description,
    };
  } catch {
    return {
      title: 'Insight | Hivemind Solutions',
    };
  }
}

type InsightPost = InsightQuery['insight'];

/**
 * Extract tag slugs from a post's tags array.
 */
function getTagSlugs(tags: InsightPost['tags']): string[] {
  if (!tags) return [];
  return tags
    .map((t) => {
      const tagRef = t?.tag;
      if (!tagRef) return null;
      const match = tagRef.match(/([^/]+)\.(mdx?|json)$/);
      return match ? match[1] : tagRef;
    })
    .filter((slug): slug is string => Boolean(slug));
}

/**
 * Fetch related insights based on matching tags
 */
async function getRelatedInsights(
  currentFilename: string,
  currentTags: InsightPost['tags'],
  limit = 3
): Promise<InsightPost[]> {
  const tagSlugs = getTagSlugs(currentTags);
  if (tagSlugs.length === 0) return [];

  try {
    const allInsights = await client.queries.insightConnection({ first: 20 });
    const edges = allInsights.data?.insightConnection?.edges || [];

    // Filter: exclude current post, find posts with matching tags
    const related = edges
      .filter((edge) => {
        const insight = edge?.node;
        if (!insight || insight._sys?.filename === currentFilename) return false;
        const postTags = getTagSlugs(insight.tags);
        return postTags.some((tag) => tagSlugs.includes(tag));
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

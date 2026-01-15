import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TagClientPage from './client-page';
import type { Insight } from '@/tina/__generated__/types';

export const revalidate = 300;
export const dynamic = 'force-dynamic';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  // Fetch the tag to verify it exists
  let tagData;
  try {
    tagData = await client.queries.tag({
      relativePath: `${slug}.mdx`,
    });
  } catch {
    notFound();
  }

  const tagName = tagData.data.tag?.name || slug;
  const tagPath = `content/tags/${slug}.mdx`;

  // Fetch all insights
  let insights = await client.queries.insightConnection({
    sort: 'date',
    last: 50,
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

  // Filter posts by tag
  const posts = (allInsights.data.insightConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node) => {
      if (!node) return false;
      const tags = node.tags as Array<{ tag?: string }> | undefined;
      return tags?.some((t) => t?.tag === tagPath);
    }) as Insight[];

  // Extract all unique tags for the sidebar
  const allPosts = (allInsights.data.insightConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined) as Insight[];

  const tagCounts = new Map<string, { name: string; slug: string; count: number }>();
  for (const post of allPosts) {
    const postTags = post.tags as Array<{ tag?: string }> | undefined;
    if (postTags) {
      for (const tagObj of postTags) {
        if (tagObj?.tag) {
          const tPath = tagObj.tag;
          const tSlug = tPath.replace('content/tags/', '').replace('.mdx', '');
          const existing = tagCounts.get(tSlug);
          if (existing) {
            existing.count++;
          } else {
            const name = tSlug.charAt(0).toUpperCase() + tSlug.slice(1);
            tagCounts.set(tSlug, { name, slug: tSlug, count: 1 });
          }
        }
      }
    }
  }
  const tags = Array.from(tagCounts.values()).sort((a, b) => b.count - a.count);

  return (
    <Layout>
      <TagClientPage
        tagName={tagName}
        tagSlug={slug}
        posts={posts}
        tags={tags}
        totalPosts={posts.length}
      />
    </Layout>
  );
}

// Generate static params for all tags
export async function generateStaticParams() {
  try {
    const tagsResponse = await client.queries.tagConnection();
    const tags = tagsResponse.data.tagConnection.edges || [];

    return tags.map((edge) => ({
      slug: edge?.node?._sys.filename || '',
    })).filter((params) => params.slug !== '');
  } catch (error) {
    console.warn('Unable to generate static params for tags:', error);
    return [];
  }
}

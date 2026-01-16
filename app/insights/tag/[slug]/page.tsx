import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TagClientPage from './client-page';
import type { Insight } from '@/tina/__generated__/types';
import {
  getTagBySlug,
  getAllTagSlugs,
  extractTagsFromPosts,
  filterPostsByTag,
} from '@/lib/tags';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  // Verify tag exists in our static definitions
  const tagDef = getTagBySlug(slug);
  if (!tagDef) {
    notFound();
  }

  let allPosts: Insight[] = [];
  let posts: Insight[] = [];
  let tags: ReturnType<typeof extractTagsFromPosts> = [];

  try {
    // Fetch all insights
    let insights = await client.queries.insightConnection({
      sort: 'date',
      last: 50,
    });
    const allInsightsData = insights;

    if (!allInsightsData.data.insightConnection.edges) {
      allInsightsData.data.insightConnection.edges = [];
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

      allInsightsData.data.insightConnection.edges.push(
        ...insights.data.insightConnection.edges.reverse()
      );
    }

    // Extract all posts
    allPosts = (allInsightsData.data.insightConnection.edges || [])
      .map((edge) => edge?.node)
      .filter((node) => node !== null && node !== undefined) as Insight[];

    // Filter posts by tag using shared utility
    posts = filterPostsByTag(allPosts, slug);

    // Extract all unique tags for the sidebar using shared utility
    tags = extractTagsFromPosts(allPosts);
  } catch (error) {
    console.warn(`Failed to fetch insights for tag "${slug}":`, error);
    // Continue with empty posts - page will render with no results
  }

  return (
    <Layout>
      <TagClientPage
        tagName={tagDef.name}
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
  return getAllTagSlugs().map((slug) => ({ slug }));
}

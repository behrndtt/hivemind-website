import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TagClientPage from './client-page';
import type { CaseStudy } from '@/tina/__generated__/types';
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

  let allPosts: CaseStudy[] = [];
  let posts: CaseStudy[] = [];
  let tags: ReturnType<typeof extractTagsFromPosts> = [];

  try {
    // Fetch all case studies
    let caseStudies = await client.queries.caseStudyConnection({
      sort: 'date',
      last: 50,
    });
    const allCaseStudiesData = caseStudies;

    if (!allCaseStudiesData.data.caseStudyConnection.edges) {
      allCaseStudiesData.data.caseStudyConnection.edges = [];
    }

    // Paginate to get all case studies
    while (caseStudies.data?.caseStudyConnection.pageInfo.hasPreviousPage) {
      caseStudies = await client.queries.caseStudyConnection({
        sort: 'date',
        before: caseStudies.data.caseStudyConnection.pageInfo.endCursor,
      });

      if (!caseStudies.data.caseStudyConnection.edges) {
        break;
      }

      allCaseStudiesData.data.caseStudyConnection.edges.push(
        ...caseStudies.data.caseStudyConnection.edges.reverse()
      );
    }

    // Extract all posts
    allPosts = (allCaseStudiesData.data.caseStudyConnection.edges || [])
      .map((edge) => edge?.node)
      .filter((node) => node !== null && node !== undefined) as CaseStudy[];

    // Filter posts by tag using shared utility
    posts = filterPostsByTag(allPosts, slug);

    // Extract all unique tags for the sidebar using shared utility
    tags = extractTagsFromPosts(allPosts);
  } catch (error) {
    console.warn(`Failed to fetch case studies for tag "${slug}":`, error);
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

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import CaseStudyClientPage from './client-page';
import type { CaseStudy, CaseStudyQuery } from '@/tina/__generated__/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  try {
    const data = await getCaseStudy(filepath);
    const title = data.data?.caseStudy?.title;
    const excerpt = data.data?.caseStudy?.excerpt;
    const description = typeof excerpt === 'string'
      ? excerpt
      : (excerpt as any)?.children?.[0]?.children?.[0]?.text || undefined;

    return {
      title: title ? `${title} | Case Study` : undefined,
      description: description,
    };
  } catch {
    return {
      title: 'Case Study | Hivemind Solutions',
    };
  }
}

type CaseStudyPost = CaseStudyQuery['caseStudy'];

async function getCaseStudy(filepath: string) {
  try {
    return await client.queries.caseStudy({
      relativePath: `${filepath}.mdx`,
    });
  } catch {
    const caseStudies = await client.queries.caseStudyConnection({ first: 100 });
    const matchingCaseStudy = caseStudies.data?.caseStudyConnection.edges?.find(
      (edge) => edge?.node?._sys.breadcrumbs?.join('/').toLowerCase() === filepath.toLowerCase()
    );

    if (!matchingCaseStudy?.node?._sys.filename) {
      throw new Error(`Case study not found: ${filepath}`);
    }

    return await client.queries.caseStudy({
      relativePath: `${matchingCaseStudy.node._sys.filename}.mdx`,
    });
  }
}

/**
 * Extract tag slugs from a post's tags array.
 */
function getTagSlugs(tags: CaseStudyPost['tags']): string[] {
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
 * Fetch related case studies based on matching tags or industry
 */
async function getRelatedCaseStudies(
  currentFilename: string,
  currentTags: CaseStudyPost['tags'],
  currentIndustry: string | null | undefined,
  limit = 3
): Promise<CaseStudyPost[]> {
  const tagSlugs = getTagSlugs(currentTags);

  try {
    const allCaseStudies = await client.queries.caseStudyConnection({ first: 20 });
    const edges = allCaseStudies.data?.caseStudyConnection?.edges || [];

    // Filter: exclude current post, find posts with matching tags or industry
    const related = edges
      .filter((edge) => {
        const caseStudy = edge?.node;
        if (!caseStudy || caseStudy._sys?.filename === currentFilename) return false;

        // Match by industry
        if (currentIndustry && caseStudy.industry === currentIndustry) return true;

        // Match by tags
        const postTags = getTagSlugs(caseStudy.tags);
        return postTags.some((tag) => tagSlugs.includes(tag));
      })
      .slice(0, limit)
      .map((edge) => edge?.node as CaseStudyPost);

    return related;
  } catch {
    return [];
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  let data;

  try {
    data = await getCaseStudy(filepath);
  } catch {
    notFound();
  }

  // Fetch related posts by tags or industry
  const caseStudy = data.data?.caseStudy;
  const relatedPosts = caseStudy
    ? await getRelatedCaseStudies(
        caseStudy._sys?.filename || '',
        caseStudy.tags,
        caseStudy.industry
      )
    : [];

  return (
    <Layout rawPageData={data}>
      <CaseStudyClientPage {...data} relatedPosts={relatedPosts} />
    </Layout>
  );
}

export async function generateStaticParams() {
  try {
    let caseStudies = await client.queries.caseStudyConnection();
  const allCaseStudies = caseStudies;

  if (!allCaseStudies.data.caseStudyConnection.edges) {
    return [];
  }

  while (caseStudies.data?.caseStudyConnection.pageInfo.hasNextPage) {
    caseStudies = await client.queries.caseStudyConnection({
      after: caseStudies.data.caseStudyConnection.pageInfo.endCursor,
    });

    if (!caseStudies.data.caseStudyConnection.edges) {
      break;
    }

    allCaseStudies.data.caseStudyConnection.edges.push(...caseStudies.data.caseStudyConnection.edges);
  }

  const params =
    allCaseStudies.data?.caseStudyConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
  } catch (error) {
    console.warn('Unable to generate static params for case studies:', error);
    return [];
  }
}

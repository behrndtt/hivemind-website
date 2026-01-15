import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import CaseStudyClientPage from './client-page';
import type { CaseStudy, CaseStudyQuery } from '@/tina/__generated__/types';

type CaseStudyPost = CaseStudyQuery['caseStudy'];

/**
 * Extract tag filenames from a post's tags array
 * Tags are stored as string references like "content/tags/azure.mdx"
 */
function getTagFilenames(tags: CaseStudyPost['tags']): string[] {
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
 * Fetch related case studies based on matching tags or industry
 */
async function getRelatedCaseStudies(
  currentFilename: string,
  currentTags: CaseStudyPost['tags'],
  currentIndustry: string | null | undefined,
  limit = 3
): Promise<CaseStudyPost[]> {
  const tagFilenames = getTagFilenames(currentTags);

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
        const postTags = getTagFilenames(caseStudy.tags);
        return postTags.some((tag) => tagFilenames.includes(tag));
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
  const data = await client.queries.caseStudy({
    relativePath: `${filepath}.mdx`,
  });

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

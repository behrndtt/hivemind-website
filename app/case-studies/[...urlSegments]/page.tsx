import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import CaseStudyClientPage from './client-page';

export const revalidate = 300;

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

  return (
    <Layout rawPageData={data}>
      <CaseStudyClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
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
}

import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import InsightClientPage from './client-page';

export const revalidate = 300;

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

  return (
    <Layout rawPageData={data}>
      <InsightClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
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
}

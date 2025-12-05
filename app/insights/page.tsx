import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import InsightsClientPage from './client-page';

export const revalidate = 300;

export default async function InsightsPage() {
  let insights = await client.queries.insightConnection({
    sort: 'date',
    last: 1
  });
  const allInsights = insights;

  if (!allInsights.data.insightConnection.edges) {
    return [];
  }

  while (insights.data?.insightConnection.pageInfo.hasPreviousPage) {
    insights = await client.queries.insightConnection({
      sort: 'date',
      before: insights.data.insightConnection.pageInfo.endCursor,
    });

    if (!insights.data.insightConnection.edges) {
      break;
    }

    allInsights.data.insightConnection.edges.push(...insights.data.insightConnection.edges.reverse());
  }

  return (
    <Layout rawPageData={allInsights.data}>
      <InsightsClientPage {...allInsights} />
    </Layout>
  );
}

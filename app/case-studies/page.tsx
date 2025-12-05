import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import CaseStudiesClientPage from './client-page';

export const revalidate = 300;

export default async function CaseStudiesPage() {
  let caseStudies = await client.queries.caseStudyConnection({
    sort: 'date',
    last: 1
  });
  const allCaseStudies = caseStudies;

  if (!allCaseStudies.data.caseStudyConnection.edges) {
    return [];
  }

  while (caseStudies.data?.caseStudyConnection.pageInfo.hasPreviousPage) {
    caseStudies = await client.queries.caseStudyConnection({
      sort: 'date',
      before: caseStudies.data.caseStudyConnection.pageInfo.endCursor,
    });

    if (!caseStudies.data.caseStudyConnection.edges) {
      break;
    }

    allCaseStudies.data.caseStudyConnection.edges.push(...caseStudies.data.caseStudyConnection.edges.reverse());
  }

  return (
    <Layout rawPageData={allCaseStudies.data}>
      <CaseStudiesClientPage {...allCaseStudies} />
    </Layout>
  );
}

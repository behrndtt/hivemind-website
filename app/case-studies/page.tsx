import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import CaseStudiesClientPage from './client-page';
import type { CaseStudy } from '@/tina/__generated__/types';
import { extractTagsFromPosts } from '@/lib/tags';

export default async function CaseStudiesPage() {
  // Fetch page data from CMS
  const pageData = await client.queries.page({ relativePath: 'case-studies.mdx' });

  // Fetch all case studies
  let caseStudies = await client.queries.caseStudyConnection({
    sort: 'date',
    last: 10,
  });
  const allCaseStudies = caseStudies;

  while (caseStudies.data?.caseStudyConnection.pageInfo.hasPreviousPage) {
    caseStudies = await client.queries.caseStudyConnection({
      sort: 'date',
      before: caseStudies.data.caseStudyConnection.pageInfo.endCursor,
    });

    if (!caseStudies.data.caseStudyConnection.edges) {
      break;
    }

    allCaseStudies.data.caseStudyConnection.edges?.push(
      ...caseStudies.data.caseStudyConnection.edges.reverse()
    );
  }

  // Extract posts array for the PostsGrid block
  const posts = allCaseStudies.data.caseStudyConnection.edges
    ?.map((edge) => edge?.node)
    .filter(Boolean) as CaseStudy[];

  // Extract unique tags from all case studies using shared utility
  const tags = extractTagsFromPosts(posts);

  return (
    <Layout rawPageData={pageData}>
      <CaseStudiesClientPage pageData={pageData} posts={posts} tags={tags} />
    </Layout>
  );
}

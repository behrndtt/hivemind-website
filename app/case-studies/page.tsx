import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import CaseStudiesClientPage from './client-page';
import type { CaseStudy } from '@/tina/__generated__/types';
import { extractTagsFromPosts, type TagInfo } from '@/lib/tags';

export default async function CaseStudiesPage() {
  let pageData = null;
  let posts: CaseStudy[] = [];
  let tags: TagInfo[] = [];

  try {
    // Fetch page data from CMS
    pageData = await client.queries.page({ relativePath: 'case-studies.mdx' });

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
    posts = allCaseStudies.data.caseStudyConnection.edges
      ?.map((edge) => edge?.node)
      .filter(Boolean) as CaseStudy[];

    // Extract unique tags from all case studies using shared utility
    tags = extractTagsFromPosts(posts);
  } catch (error) {
    console.warn('Failed to fetch case studies page data:', error);
    // Continue with empty data - page will render with no results
  }

  return (
    <Layout rawPageData={pageData}>
      <CaseStudiesClientPage pageData={pageData} posts={posts} tags={tags} />
    </Layout>
  );
}

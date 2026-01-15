import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import CaseStudiesClientPage from './client-page';
import type { CaseStudy } from '@/tina/__generated__/types';

export const revalidate = 300;
export const dynamic = 'force-dynamic';

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

  // Extract unique tags from all case studies
  const tagCounts = new Map<string, { name: string; slug: string; count: number }>();
  for (const post of posts) {
    const postTags = post.tags as Array<{ tag?: string }> | undefined;
    if (postTags) {
      for (const tagObj of postTags) {
        if (tagObj?.tag) {
          // tag is a reference path like "content/tags/markdown.mdx"
          const tagPath = tagObj.tag;
          const slug = tagPath.replace('content/tags/', '').replace('.mdx', '');
          const existing = tagCounts.get(slug);
          if (existing) {
            existing.count++;
          } else {
            // Capitalize first letter for display name
            const name = slug.charAt(0).toUpperCase() + slug.slice(1);
            tagCounts.set(slug, { name, slug, count: 1 });
          }
        }
      }
    }
  }
  const tags = Array.from(tagCounts.values()).sort((a, b) => b.count - a.count);

  return (
    <Layout rawPageData={pageData}>
      <CaseStudiesClientPage pageData={pageData} posts={posts} tags={tags} />
    </Layout>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PostsGrid } from '@/components/blocks/posts-grid';
import { TagsSidebar } from '@/components/blocks/tags-sidebar';
import { CtaSection } from '@/components/blocks/cta-section';
import type { Insight } from '@/tina/__generated__/types';

interface TagClientPageProps {
  tagName: string;
  tagSlug: string;
  posts: Insight[];
  tags: Array<{ name: string; slug: string; count?: number }>;
  totalPosts: number;
}

export default function TagClientPage({
  tagName,
  tagSlug,
  posts,
  tags,
  totalPosts,
}: TagClientPageProps) {
  // Sidebar content
  const sidebarContent = (
    <>
      <TagsSidebar
        data={{ title: 'All Topics', contentType: 'insights' } as any}
        tags={tags}
        basePath="/insights/tag"
      />
      <CtaSection
        data={{
          variant: 'compact',
          title: 'Need Expert Help?',
          subtitle: 'Get in touch with our team for personalized guidance.',
          buttons: [{ label: 'Contact Us', href: '/contact', variant: 'default' }],
        } as any}
      />
    </>
  );

  return (
    <>
      {/* Header section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all insights
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Tag className="h-6 w-6 text-primary" />
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {totalPosts} {totalPosts === 1 ? 'article' : 'articles'}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Insights tagged with "{tagName}"
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse all articles and insights related to {tagName.toLowerCase()}.
          </p>
        </div>
      </section>

      {/* Posts grid with sidebar */}
      <PostsGrid
        data={{
          variant: 'card',
          columns: 2,
          contentType: 'insights',
          limit: 50,
          showSidebar: true,
        } as any}
        posts={posts}
        tags={tags}
        sidebarContent={sidebarContent}
      />

      {/* Empty state */}
      {posts.length === 0 && (
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground mb-6">
              No articles found with this tag.
            </p>
            <Button asChild>
              <Link href="/insights">View all insights</Link>
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

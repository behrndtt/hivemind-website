'use client';

import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PostsGrid } from '@/components/blocks/posts-grid';
import type { CaseStudy } from '@/tina/__generated__/types';

interface TagClientPageProps {
  tagName: string;
  tagSlug: string;
  posts: CaseStudy[];
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
  return (
    <>
      {/* Header section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all case studies
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Tag className="h-6 w-6 text-primary" />
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {totalPosts} {totalPosts === 1 ? 'case study' : 'case studies'}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            Case studies tagged with "{tagName}"
          </h1>

          <p className="text-md text-muted-foreground max-w-2xl">
            Browse all case studies related to {tagName.toLowerCase()}.
          </p>
        </div>
      </section>

      {/* Filtered case studies */}
      <PostsGrid
        data={{
          variant: 'grid',
          columns: 2,
          contentType: 'case-studies',
          limit: 50,
          showSidebar: true,
        } as any}
        posts={posts}
        tags={tags}
        activeTagSlug={tagSlug}
      />

    </>
  );
}

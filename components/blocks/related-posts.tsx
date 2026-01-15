'use client';

import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InView } from '@/components/motion-primitives/in-view';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type {
  Insight,
  CaseStudy,
} from '@/tina/__generated__/types';

// Union type for posts
type Post = Insight | CaseStudy;

/**
 * Get post URL based on content type
 */
function getPostUrl(post: Post, contentType: 'insights' | 'case-studies'): string {
  if (!post._sys?.filename) return '#';
  return `/${contentType}/${post._sys.filename}`;
}

/**
 * Get category label from post
 */
function getCategoryLabel(post: Post, contentType: 'insights' | 'case-studies'): string {
  if (contentType === 'case-studies' && 'industry' in post) {
    return (post as CaseStudy).industry || 'Case Study';
  }
  return 'Insight';
}

/**
 * Get excerpt text from post
 */
function getExcerptText(excerpt: any): string {
  if (!excerpt) return '';
  if (typeof excerpt === 'string') return excerpt;
  // Handle rich-text excerpt structure
  return excerpt?.children?.[0]?.children?.[0]?.text || '';
}

export interface RelatedPostsProps {
  /** Section title */
  title?: string;
  /** Posts to display */
  posts: Post[];
  /** Content type for URL generation */
  contentType: 'insights' | 'case-studies';
  /** Maximum posts to show */
  maxPosts?: number;
  /** Custom class name */
  className?: string;
}

export function RelatedPosts({
  title = 'Related Posts',
  posts,
  contentType,
  maxPosts = 3,
  className,
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const displayPosts = posts.slice(0, maxPosts);

  return (
    <section
      className={cn(
        'bg-background py-16 md:py-24 border-t border-border',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          viewOptions={{ once: true }}
        >
          <h2 className="mb-8 text-foreground">
            {title}
          </h2>
        </InView>

        <AnimatedGroup
          preset="blur-slide"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayPosts.map((post, index) => (
            <div key={post._sys?.filename || index}>
              <Card className="group h-full border-border bg-card/50 hover:border-primary/50 transition-all duration-500">
                <Link
                  href={getPostUrl(post, contentType)}
                  className="block h-full"
                >
                  {post.heroImg && (
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.heroImg}
                        alt={post.title || ''}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                    </div>
                  )}
                  <CardContent className="p-5">
                    <Badge
                      variant="outline"
                      className="mb-3 border-border text-muted-foreground"
                    >
                      {getCategoryLabel(post, contentType)}
                    </Badge>
                    <h3 className="mb-2 font-light text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {getExcerptText(post.excerpt)}
                      </p>
                    )}
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

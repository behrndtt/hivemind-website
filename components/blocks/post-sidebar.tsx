'use client';

import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';
import { ArrowRight, TrendingUp, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InView } from '@/components/motion-primitives/in-view';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type {
  Insight,
  CaseStudy,
} from '@/tina/__generated__/types';

// Union type for posts
type Post = Insight | CaseStudy;

export interface PostResult {
  /** Metric value (e.g., "+45%", "3x") */
  metric: string;
  /** Label describing the metric */
  label: string;
}

export interface PostSidebarCta {
  /** CTA title */
  title: string;
  /** CTA description */
  description: string;
  /** Button text */
  buttonText: string;
  /** Button link */
  buttonHref: string;
}

export interface PostSidebarProps {
  /** Post data from TinaCMS */
  post: Post;
  /** Results metrics (for case studies) */
  results?: PostResult[];
  /** CTA configuration */
  cta?: PostSidebarCta;
  /** Custom class name */
  className?: string;
}

export function PostSidebar({
  post,
  results,
  cta,
  className,
}: PostSidebarProps) {
  // Extract tags from post - handle potential undefined/null
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Results Card (Case Studies) */}
      {results && results.length > 0 && (
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewOptions={{ once: true }}
        >
          <Card className="border-primary/20 bg-card/50">
            <CardContent className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                Key Results
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-muted/50 p-4 text-center"
                  >
                    <div className="text-xl font-bold text-primary">
                      {result.metric}
                    </div>
                    <div className="text-xs text-muted-foreground">{result.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </InView>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewOptions={{ once: true }}
        >
          <Card className="border-border bg-card/50">
            <CardContent className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-foreground">
                <Tag className="h-5 w-5 text-primary" />
                Tags
              </h2>
              <div
                data-tina-field={tinaField(post, 'tags')}
                className="flex flex-wrap gap-2"
              >
                {tags.map((tagItem, index) => {
                  // Handle TinaCMS tag reference structure
                  const tagRef = tagItem as { tag?: { name?: string; _sys?: { filename?: string } } } | string | null;
                  const tagName = typeof tagRef === 'string' 
                    ? tagRef 
                    : tagRef?.tag?.name || 'Tag';
                  const tagSlug = typeof tagRef === 'string'
                    ? tagRef.toLowerCase().replace(/\s+/g, '-')
                    : tagRef?.tag?._sys?.filename || tagName.toLowerCase().replace(/\s+/g, '-');
                  
                  return (
                    <Link
                      key={index}
                      href={`/tags/${tagSlug}`}
                    >
                      <Badge
                        variant="secondary"
                        className="border-border bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                      >
                        {tagName}
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </InView>
      )}

      {/* CTA Card */}
      {cta && (
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewOptions={{ once: true }}
        >
          <Card className="border-2 border-primary/20 bg-linear-to-br from-primary/10 to-background/50">
            <CardContent className="p-6">
              <h2 className="mb-2 text-foreground">
                {cta.title}
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">{cta.description}</p>
              <Button
                asChild
                className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
              >
                <Link href={cta.buttonHref}>
                  {cta.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </InView>
      )}
    </div>
  );
}

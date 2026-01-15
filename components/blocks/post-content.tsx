'use client';

import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { Building2, CheckCircle2, Quote, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InView } from '@/components/motion-primitives/in-view';
import { Card, CardContent } from '@/components/ui/card';
import { components } from '@/components/mdx-components';
import type {
  Insight,
  CaseStudy,
} from '@/tina/__generated__/types';

// Union type for posts
type Post = Insight | CaseStudy;

/**
 * Get initials from a name
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export interface PostContentProps {
  /** Post data from TinaCMS */
  post: Post;
  /** Custom class name */
  className?: string;
}

export function PostContent({ post, className }: PostContentProps) {
  // Check if this is a case study
  const isCaseStudy = 'client' in post || 'industry' in post;
  const caseStudy = post as CaseStudy;

  // Extract challenge and solution from case study if available
  // These would come from structured fields or the body
  const hasStructuredContent = isCaseStudy && (caseStudy.client || caseStudy.industry);

  return (
    <div className={cn('flex flex-col gap-8 lg:col-span-2', className)}>
      <InView
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        viewOptions={{ once: true }}
        className="flex flex-col gap-8"
      >
        {/* Case Study Client Info */}
        {isCaseStudy && caseStudy.client && (
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-card/50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Client</span>
                <h3
                  data-tina-field={tinaField(post, 'client')}
                  className="text-lg font-medium text-foreground"
                >
                  {caseStudy.client}
                </h3>
              </div>
            </div>
            {caseStudy.industry && (
              <div
                data-tina-field={tinaField(post, 'industry')}
                className="text-sm text-muted-foreground"
              >
                Industry: {caseStudy.industry}
              </div>
            )}
          </div>
        )}

        {/* Main Body Content */}
        {post._body && (
          <div
            data-tina-field={tinaField(post, '_body')}
            className="prose dark:prose-invert prose-zinc max-w-none
              prose-headings:text-foreground prose-headings:font-light
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-code:text-primary prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-card prose-pre:border prose-pre:border-border
              prose-blockquote:border-primary prose-blockquote:text-foreground/80
              prose-li:text-muted-foreground
              prose-img:rounded-xl
            "
          >
            <TinaMarkdown content={post._body} components={components} />
          </div>
        )}
      </InView>
    </div>
  );
}

export interface PostTestimonialProps {
  /** Quote text */
  quote: string;
  /** Author name */
  author: string;
  /** Author role/title */
  role: string;
  /** Custom class name */
  className?: string;
}

/**
 * Standalone testimonial component for use in post pages
 */
export function PostTestimonial({
  quote,
  author,
  role,
  className,
}: PostTestimonialProps) {
  return (
    <Card className={cn('border-primary/20 bg-card/50', className)}>
      <CardContent className="p-6 lg:p-8">
        <Quote className="h-8 w-8 text-primary/50 mb-4" />
        <blockquote className="mb-4 font-serif text-lg text-foreground/80 leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {getInitials(author)}
          </div>
          <div>
            <div className="font-medium text-foreground">{author}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

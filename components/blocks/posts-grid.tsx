'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { ArrowRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { renderTitle } from '@/lib/render-title';
import { Icon } from '@/components/icon';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { InView } from '@/components/motion-primitives/in-view';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { highlightWordsField, badgeField, buttonsListField } from '@/tina/fields/shared';
import type { PageBlocksPostsGrid, Insight, CaseStudy } from '@/tina/__generated__/types';

type Post = Insight | CaseStudy;
type PostLayout = 'editorial' | 'grid';

function formatDate(dateString?: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getPostUrl(post: Post, contentType: string): string {
  if (!post._sys?.filename) return '#';
  const basePath = contentType === 'case-studies' ? '/case-studies' : '/insights';
  return `${basePath}/${post._sys.filename}`;
}

function getPostKey(post: Post, index: number): string {
  return post._sys?.filename || `${post.title || 'post'}-${index}`;
}

function getPostTimestamp(post: Post): number {
  return post.date ? new Date(post.date).getTime() : 0;
}

function sortPosts(posts: Post[]): Post[] {
  const postsByDate = [...posts].sort(
    (firstPost, secondPost) => getPostTimestamp(secondPost) - getPostTimestamp(firstPost)
  );
  const featuredPost = postsByDate.find((post) => post.featured === true);
  return featuredPost
    ? [featuredPost, ...postsByDate.filter((post) => post !== featuredPost)]
    : postsByDate;
}

function getLayout(variant?: string | null): PostLayout {
  return variant === 'grid' || variant === 'card' ? 'grid' : 'editorial';
}

interface PostPresentationProps {
  post: Post;
  contentType: string;
}

function PostDate({ date }: { date?: string | null }) {
  if (!date) return null;
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Calendar className="size-4" aria-hidden="true" />
      <time dateTime={date}>{formatDate(date)}</time>
    </div>
  );
}

function PostImage({ post }: { post: Post }) {
  if (!post.heroImg) {
    return (
      <div
        aria-hidden="true"
        className="flex aspect-[16/10] h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/.18),transparent_42%),linear-gradient(135deg,hsl(var(--card)),hsl(var(--background)))]"
      >
        <span className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
          Hivemind Solutions
        </span>
      </div>
    );
  }

  return (
    <img
      src={post.heroImg || ''}
      alt={post.title || ''}
      className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
    />
  );
}

function FeaturedPost({ post, contentType }: PostPresentationProps) {
  const url = getPostUrl(post, contentType);
  return (
    <article className="group overflow-hidden border-y border-border bg-card md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
      <Link href={url} className="block overflow-hidden bg-muted"><PostImage post={post} /></Link>
      <div className="flex flex-col justify-center px-5 py-7 sm:px-8 md:px-10 lg:px-12">
        <Badge variant="secondary" className="mb-5 w-fit">Featured</Badge>
        <PostDate date={post.date} />
        <h3 className="mt-3 text-2xl text-foreground transition-colors group-hover:text-primary sm:text-3xl">
          <Link href={url}>{post.title}</Link>
        </h3>
        {post.excerpt && (
          <div className="mt-4 line-clamp-3 max-w-prose text-muted-foreground prose-p:m-0">
            <TinaMarkdown content={post.excerpt} />
          </div>
        )}
        <Button variant="link" className="mt-5 h-auto w-fit p-0" asChild>
          <Link href={url}>Read full story <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </Button>
      </div>
    </article>
  );
}

function EditorialPost({ post, contentType }: PostPresentationProps) {
  const url = getPostUrl(post, contentType);
  return (
    <article className="group grid gap-5 border-b border-border py-7 sm:grid-cols-[12rem_minmax(0,1fr)] md:gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <Link href={url} className="block overflow-hidden bg-muted"><PostImage post={post} /></Link>
      <div className="flex min-w-0 flex-col justify-center py-1">
        <PostDate date={post.date} />
        <h3 className="mt-2 text-xl text-foreground transition-colors group-hover:text-primary sm:text-2xl">
          <Link href={url}>{post.title}</Link>
        </h3>
        {post.excerpt && (
          <div className="mt-3 line-clamp-2 max-w-3xl text-muted-foreground prose-p:m-0">
            <TinaMarkdown content={post.excerpt} />
          </div>
        )}
        <Link href={url} className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary">
          Read more <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function GridPost({ post, contentType }: PostPresentationProps) {
  const url = getPostUrl(post, contentType);
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-border bg-card">
      <Link href={url} className="block overflow-hidden bg-muted"><PostImage post={post} /></Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <PostDate date={post.date} />
        <h3 className="mt-3 text-xl text-foreground transition-colors group-hover:text-primary">
          <Link href={url}>{post.title}</Link>
        </h3>
        {post.excerpt && (
          <div className="mt-3 line-clamp-3 text-muted-foreground prose-p:m-0">
            <TinaMarkdown content={post.excerpt} />
          </div>
        )}
        <Link href={url} className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-medium text-primary">
          Read more <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

interface TopicFilterProps {
  tags: Array<{ name: string; slug: string; count?: number }>;
  basePath: string;
  allPostsPath: string;
  activeTagSlug?: string;
}

function TopicFilter({ tags, basePath, allPostsPath, activeTagSlug }: TopicFilterProps) {
  if (tags.length === 0) return null;
  return (
    <nav aria-label="Filter posts by topic" className="mb-10 border-y border-border py-4">
      <div className="flex items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 text-sm font-medium text-foreground">Topics</span>
        <Link
          href={allPostsPath}
          aria-current={!activeTagSlug ? 'page' : undefined}
          className={cn(
            'min-h-11 shrink-0 rounded-full border px-3 py-2 text-sm transition-colors',
            !activeTagSlug ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
          )}
        >
          All
        </Link>
        {tags.map((tag) => {
          const isActive = tag.slug === activeTagSlug;
          return (
            <Link
              key={tag.slug}
              href={`${basePath}/${tag.slug}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'min-h-11 shrink-0 rounded-full border px-3 py-2 text-sm transition-colors',
                isActive ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
              )}
            >
              {tag.name}{typeof tag.count === 'number' ? ` (${tag.count})` : ''}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export interface PostsGridProps {
  data: PageBlocksPostsGrid;
  posts?: Post[];
  tags?: Array<{ name: string; slug: string; count?: number }>;
  activeTagSlug?: string;
}

export function PostsGrid({ data, posts = [], tags = [], activeTagSlug }: PostsGridProps) {
  const layout = getLayout(data.variant);
  const contentType = data.contentType || 'insights';
  const limit = data.limit || 6;
  const [visibleCount, setVisibleCount] = useState(limit);
  const sortedPosts = sortPosts(posts);
  const displayPosts = sortedPosts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPosts.length;
  const hasHeader = data.badge?.text || data.title || data.subtitle;
  const basePath = contentType === 'case-studies' ? '/case-studies' : '/insights';
  const featuredPost = layout === 'editorial' ? displayPosts[0] : undefined;
  const remainingPosts = featuredPost ? displayPosts.slice(1) : displayPosts;

  return (
    <section className={cn('py-16 lg:py-24', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {hasHeader && (
          <InView
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true, margin: '-100px' }}
          >
            <div className="mb-10 max-w-3xl">
              {data.badge?.text && (
                <div data-tina-field={tinaField(data, 'badge')}>
                  <Badge variant="outline" className="mb-4 inline-flex items-center gap-2">
                    {data.badge.icon && <Icon data={data.badge.icon} className="size-3" />}
                    {data.badge.text}
                  </Badge>
                </div>
              )}
              {data.title && (
                <h2 data-tina-field={tinaField(data, 'title')} className="mb-4 text-3xl text-foreground md:text-4xl">
                  {renderTitle(data.title, data.highlightWords || undefined)}
                </h2>
              )}
              {data.subtitle && (
                <p data-tina-field={tinaField(data, 'subtitle')} className="max-w-2xl whitespace-pre-line text-muted-foreground">
                  {data.subtitle}
                </p>
              )}
            </div>
          </InView>
        )}

        {data.showSidebar && (
          <TopicFilter tags={tags} basePath={`${basePath}/tag`} allPostsPath={basePath} activeTagSlug={activeTagSlug} />
        )}

        {displayPosts.length > 0 ? (
          <>
            {featuredPost && <FeaturedPost post={featuredPost} contentType={contentType} />}
            {remainingPosts.length > 0 && (
              <AnimatedGroup
                preset="blur-slide"
                className={layout === 'grid' ? 'grid gap-6 md:grid-cols-2' : 'mt-8 [&>div:first-child]:pt-0'}
              >
                {remainingPosts.map((post, index) => (
                  layout === 'grid'
                    ? <GridPost key={getPostKey(post, index)} post={post} contentType={contentType} />
                    : <EditorialPost key={getPostKey(post, index)} post={post} contentType={contentType} />
                ))}
              </AnimatedGroup>
            )}
          </>
        ) : (
          <div className="border-y border-border py-12 text-center"><p className="text-muted-foreground">No posts found.</p></div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Button onClick={() => setVisibleCount((count) => count + limit)} variant="outline" size="lg">
              Load more {contentType === 'case-studies' ? 'case studies' : 'insights'}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        )}

        {data.buttons && data.buttons.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {data.buttons.map((button, index) => (
              <Button
                key={`${button?.label || 'button'}-${index}`}
                variant={(button?.variant as 'default' | 'outline' | 'ghost' | 'secondary') || 'default'}
                asChild
                data-tina-field={tinaField(button)}
              >
                <Link href={button?.href || '#'}>
                  {button?.icon && <Icon data={button.icon} className="size-4" />}
                  {button?.label}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export const postsGridBlockSchema: Template = {
  name: 'postsGrid',
  label: 'Posts Grid',
  ui: {
    defaultItem: {
      title: 'Latest Insights',
      subtitle: 'Stay updated with our latest articles and news.',
      variant: 'editorial',
      columns: 2,
      limit: 6,
      contentType: 'insights',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Layout Variant',
      name: 'variant',
      options: [
        { value: 'editorial', label: 'Editorial' },
        { value: 'grid', label: 'Card Grid' },
      ],
    },
    {
      type: 'string',
      label: 'Content Type',
      name: 'contentType',
      description: 'Which content collection to display',
      options: [
        { value: 'insights', label: 'Insights (Blog Posts)' },
        { value: 'case-studies', label: 'Case Studies' },
      ],
    },
    {
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Retained for compatibility. Grid layouts use two columns.',
    },
    {
      type: 'number',
      label: 'Limit',
      name: 'limit',
      description: 'Number of posts to show before the load more button',
    },
    {
      type: 'boolean',
      label: 'Show Topic Filters',
      name: 'showSidebar',
      description: 'Display topic links above the posts',
    },
    badgeField as any,
    { type: 'string', label: 'Title', name: 'title' },
    highlightWordsField as any,
    {
      type: 'string',
      label: 'Subtitle',
      name: 'subtitle',
      ui: { component: 'textarea' },
    },
    buttonsListField as any,
  ],
};

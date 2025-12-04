"use client";

import Link from "next/link";
import {
  AnimatedGroup,
  PresetType,
} from "@/components/motion-primitives/animated-group";
import { InView } from "@/components/motion-primitives/in-view";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Post, getPostUrl } from "@/lib/data/posts";

export type PostsGridVariant = "card" | "list" | "featured" | "compact";

export interface PostsGridProps {
  /** Array of posts to display */
  posts: Post[];
  /** Visual variant */
  variant?: PostsGridVariant;
  /** Number of columns */
  columns?: 1 | 2 | 3 | 4;
  /** Gap size between cards */
  gap?: "sm" | "md" | "lg";
  /** Animation preset */
  preset?: PresetType;
  /** Show category badge */
  showCategory?: boolean;
  /** Show tags */
  showTags?: boolean;
  /** Show author */
  showAuthor?: boolean;
  /** Show date */
  showDate?: boolean;
  /** Show reading time */
  showReadingTime?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Custom class name */
  className?: string;
}

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface PostCardProps {
  post: Post;
  variant: PostsGridVariant;
  showCategory?: boolean;
  showTags?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showReadingTime?: boolean;
}

function PostCard({
  post,
  variant,
  showCategory = true,
  showTags = true,
  showAuthor = false,
  showDate = true,
  showReadingTime = true,
}: PostCardProps) {
  const url = getPostUrl(post);

  // Featured variant - larger card with image
  if (variant === "featured") {
    return (
      <Card className="group overflow-hidden border-2 border-primary/20 bg-zinc-900/50 hover:border-primary/40 transition-all duration-500">
        <Link href={url} className="block">
          {post.image && (
            <div className="aspect-video w-full overflow-hidden bg-zinc-800">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <CardContent className="p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {showCategory && (
                <Badge className="bg-primary text-primary-foreground font-semibold">
                  {post.category}
                </Badge>
              )}
              {post.featured && (
                <Badge
                  variant="outline"
                  className="border-primary/50 text-primary"
                >
                  Featured
                </Badge>
              )}
            </div>

            <h3 className="mb-3 text-white group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            <p className="mb-4 text-zinc-400 line-clamp-3">{post.summary}</p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
              {showDate && post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              {showReadingTime && post.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime} min read
                </span>
              )}
              {showAuthor && post.author && (
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {post.author.name}
                </span>
              )}
            </div>

            {/* Tags */}
            {showTags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs border-zinc-700 bg-zinc-800 text-zinc-400"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center text-primary font-medium">
              Read more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  // List variant - horizontal layout
  if (variant === "list") {
    return (
      <Card className="group overflow-hidden border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500">
        <Link href={url} className="flex flex-col sm:flex-row">
          {post.image && (
            <div className="aspect-video sm:aspect-square sm:w-48 shrink-0 overflow-hidden bg-zinc-800">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <CardContent className="flex flex-col justify-center p-5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {showCategory && (
                <Badge
                  variant="outline"
                  className="border-zinc-700 text-zinc-400"
                >
                  {post.category}
                </Badge>
              )}
            </div>

            <h3 className="mb-2 text-white group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            <p className="mb-3 text-sm text-zinc-400 line-clamp-2">
              {post.summary}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
              {showDate && post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              {showReadingTime && post.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime} min
                </span>
              )}
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  // Compact variant - minimal styling
  if (variant === "compact") {
    return (
      <Link
        href={url}
        className="group flex items-start gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary/10 text-sm font-bold text-primary">
          {post.type === "case-study" ? "CS" : "IN"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white group-hover:text-primary transition-colors truncate">
            {post.title}
          </h3>
          <p className="text-sm text-zinc-400 truncate">{post.summary}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-zinc-600 shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </Link>
    );
  }

  // Default card variant
  return (
    <Card className="group h-full border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500">
      <Link href={url} className="block h-full">
        {post.image && (
          <div className="aspect-video w-full overflow-hidden bg-zinc-800 rounded-t-lg">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-5">
          {showCategory && (
            <Badge
              variant="outline"
              className="mb-3 border-zinc-700 text-zinc-400"
            >
              {post.category}
            </Badge>
          )}

          <h4 className="mb-2 text-white group-hover:text-primary transition-colors">
            {post.title}
          </h4>

          <p className="mb-4 text-sm text-zinc-400 line-clamp-3">
            {post.summary}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-4">
            {showDate && post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            {showReadingTime && post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime} min
              </span>
            )}
          </div>

          {/* Tags */}
          {showTags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs border-zinc-700 bg-zinc-800 text-zinc-400"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}

export function PostsGrid({
  posts,
  variant = "card",
  columns = 3,
  gap = "md",
  preset = "blur-slide",
  showCategory = true,
  showTags = true,
  showAuthor = false,
  showDate = true,
  showReadingTime = true,
  emptyMessage = "No posts found.",
  className,
}: PostsGridProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-zinc-400">{emptyMessage}</p>
      </div>
    );
  }

  // List and compact variants use single column
  const gridColumns = variant === "list" || variant === "compact" ? 1 : columns;

  return (
    <AnimatedGroup
      preset={preset}
      className={cn(
        "grid",
        columnClasses[gridColumns],
        gapClasses[gap],
        className
      )}
    >
      {posts.map((post) => (
        <div key={post.id}>
          <PostCard
            post={post}
            variant={variant}
            showCategory={showCategory}
            showTags={showTags}
            showAuthor={showAuthor}
            showDate={showDate}
            showReadingTime={showReadingTime}
          />
        </div>
      ))}
    </AnimatedGroup>
  );
}

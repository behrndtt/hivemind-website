"use client";

import Link from "next/link";
import { InView } from "@/components/motion-primitives/in-view";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Post, getPostUrl } from "@/lib/data/posts";

export interface RelatedPostsProps {
  /** Section title */
  title?: string;
  /** Posts to display */
  posts: Post[];
  /** Maximum posts to show (default: 3) */
  maxPosts?: number;
  /** Custom class name */
  className?: string;
}

export function RelatedPosts({
  title = "Related Posts",
  posts,
  maxPosts = 3,
  className,
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const displayPosts = posts.slice(0, maxPosts);

  return (
    <section
      className={cn(
        "bg-zinc-950 py-24 lg:py-32 border-t border-zinc-800",
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
          <h2 className="mb-8 text-2xl font-light text-white">
            {title}
          </h2>
        </InView>

        <AnimatedGroup
          preset="blur-slide"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayPosts.map((post) => (
            <div key={post.id}>
              <Card className="group h-full border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500">
                <Link href={getPostUrl(post)} className="block h-full">
                  <CardContent className="p-5">
                    <Badge
                      variant="outline"
                      className="mb-3 border-zinc-700 text-zinc-400"
                    >
                      {post.category}
                    </Badge>
                    <h3 className="mb-2 font-light text-white group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-2">
                      {post.summary}
                    </p>
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

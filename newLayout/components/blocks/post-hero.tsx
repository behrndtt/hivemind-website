"use client";

import Link from "next/link";
import { InView } from "@/components/motion-primitives/in-view";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

export interface PostAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface PostHeroProps {
  /** Post title */
  title: string;
  /** Short summary */
  summary: string;
  /** Category badge */
  category: string;
  /** Is featured */
  featured?: boolean;
  /** Author info */
  author?: PostAuthor;
  /** Publication date (ISO string) */
  publishedAt?: string;
  /** Reading time in minutes */
  readingTime?: number;
  /** Back link configuration */
  backLink: {
    href: string;
    label: string;
  };
  /** Featured image URL (optional) */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Custom class name */
  className?: string;
}

export function PostHero({
  title,
  summary,
  category,
  featured,
  author,
  publishedAt,
  readingTime,
  backLink,
  image,
  imageAlt,
  className,
}: PostHeroProps) {
  return (
    <>
      {/* Hero Section */}
      <section
        className={cn(
          "relative overflow-hidden bg-black py-24 lg:py-32",
          className
        )}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true }}
          >
            {/* Back link */}
            <Link
              href={backLink.href}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLink.label}
            </Link>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className="bg-primary text-primary-foreground font-semibold">
                {category}
              </Badge>
              {featured && (
                <Badge
                  variant="outline"
                  className="border-primary/50 text-primary"
                >
                  Featured
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="mb-6 tracking-tight text-white max-w-4xl">
              {title}
            </h1>

            {/* Summary */}
            <p className="mb-8 text-lg text-zinc-400 max-w-3xl">{summary}</p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
              {author && (
                <div className="flex items-center gap-2">
                  {author.avatar ? (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-8 w-8 rounded-full bg-zinc-800"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div>
                    <span className="text-white">{author.name}</span>
                    {author.role && (
                      <span className="text-zinc-500"> · {author.role}</span>
                    )}
                  </div>
                </div>
              )}
              {publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(publishedAt)}
                </span>
              )}
              {readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readingTime} min read
                </span>
              )}
            </div>
          </InView>
        </div>
      </section>

      {/* Featured Image */}
      {image && (
        <section className="bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InView
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              viewOptions={{ once: true }}
            >
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-zinc-800">
                <img
                  src={image}
                  alt={imageAlt || title}
                  className="h-full w-full object-cover"
                />
              </div>
            </InView>
          </div>
        </section>
      )}
    </>
  );
}

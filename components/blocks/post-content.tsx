"use client";

import { InView } from "@/components/motion-primitives/in-view";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, CheckCircle2, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PostTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface PostContentProps {
  /** HTML content to render */
  content?: string;
  /** Challenge section (case studies) */
  challenge?: string;
  /** Solution section (case studies) */
  solution?: string;
  /** Testimonial */
  testimonial?: PostTestimonial;
  /** Custom class name */
  className?: string;
}

export function PostContent({
  content,
  challenge,
  solution,
  testimonial,
  className,
}: PostContentProps) {
  const hasCaseStudySections = challenge || solution;

  return (
    <div className={cn("lg:col-span-2", className)}>
      <InView
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        viewOptions={{ once: true }}
      >
        {/* Case Study specific sections */}
        {hasCaseStudySections && (
          <div className="space-y-8 mb-12">
            {challenge && (
              <div>
                <h2 className="mb-4 flex items-center gap-3 text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  The Challenge
                </h2>
                <p className="text-zinc-400 leading-relaxed">{challenge}</p>
              </div>
            )}

            {solution && (
              <div>
                <h2 className="mb-4 flex items-center gap-3 text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  Our Solution
                </h2>
                <p className="text-zinc-400 leading-relaxed">{solution}</p>
              </div>
            )}
          </div>
        )}

        {/* Main content (markdown/HTML) */}
        {content && (
          <div className="prose prose-invert prose-zinc max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="text-zinc-400 leading-relaxed"
            />
          </div>
        )}

        {/* Testimonial */}
        {testimonial && (
          <Card className="mt-12 border-primary/20 bg-zinc-900/50">
            <CardContent className="p-6 lg:p-8">
              <Quote className="h-8 w-8 text-primary/50 mb-4" />
              <blockquote className="mb-4 font-serif text-lg text-zinc-300 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-medium text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </InView>
    </div>
  );
}

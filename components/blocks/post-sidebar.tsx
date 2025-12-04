"use client";

import Link from "next/link";
import { InView } from "@/components/motion-primitives/in-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PostResult {
  metric: string;
  label: string;
}

export interface PostSidebarCta {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface PostSidebarProps {
  /** Results metrics (case studies) */
  results?: PostResult[];
  /** Tags array */
  tags?: string[];
  /** CTA configuration */
  cta?: PostSidebarCta;
  /** Custom class name */
  className?: string;
}

export function PostSidebar({
  results,
  tags,
  cta,
  className,
}: PostSidebarProps) {
  return (
    <div className={cn("space-y-6", className)}>
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
          <Card className="border-primary/20 bg-zinc-900/50">
            <CardContent className="p-6">
              <h2 className="mb-4 text-white">
                Key Results
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-zinc-800/50 p-4 text-center"
                  >
                    <div className="text-xl font-bold text-primary">
                      {result.metric}
                    </div>
                    <div className="text-xs text-zinc-400">{result.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </InView>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewOptions={{ once: true }}
        >
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6">
              <h2 className="mb-4 text-white">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="border-zinc-700 bg-zinc-800 text-zinc-400"
                  >
                    {tag}
                  </Badge>
                ))}
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
          <Card className="border-2 border-primary/20 bg-linear-to-br from-primary/10 to-zinc-900/50">
            <CardContent className="p-6">
              <h2 className="mb-2 text-white">
                {cta.title}
              </h2>
              <p className="mb-4 text-sm text-zinc-400">{cta.description}</p>
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

"use client";

import { InView } from "@/components/motion-primitives/in-view";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/lib/data/posts";

export interface DraftTopicsProps {
  /** Array of draft posts to display */
  drafts: Post[];
  /** Section title */
  title?: string;
  /** Additional class names */
  className?: string;
}

export function DraftTopics({
  drafts,
  title = "Topics We're Working On",
  className,
}: DraftTopicsProps) {
  if (drafts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <InView
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        viewOptions={{ once: true }}
      >
        <h3 className="mb-6">
          {title}
        </h3>
        <AnimatedGroup preset="fade" className="grid gap-4 sm:grid-cols-2">
          {drafts.map((draft, index) => (
            <Card key={draft.id} className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="flex items-start gap-3 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10 text-sm font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h5 className="text-zinc-300">
                    {draft.title}
                  </h5>
                  <p className="mt-1 text-xs text-zinc-500">{draft.category}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </AnimatedGroup>
      </InView>
    </div>
  );
}

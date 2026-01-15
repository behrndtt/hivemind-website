"use client";

import { cn } from "@/lib/utils";

export interface MilestoneEvent {
  year: string;
  event: string;
}

interface MilestoneTimelineProps {
  events: MilestoneEvent[];
  className?: string;
}

export function MilestoneTimeline({
  events,
  className,
}: MilestoneTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.year} className="relative flex items-start gap-3 group last:pb-0">
            {/* Timeline line - attached to item, fades on last */}
            <div className="absolute left-[7px] top-4 bottom-0 w-px -mb-4 bg-secondary group-last:bottom-auto group-last:h-12 group-last:bg-transparent group-last:before:absolute group-last:before:inset-0 group-last:before:bg-linear-to-b group-last:before:from-border group-last:before:to-transparent" />
            
            {/* Timeline dot */}
            <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
              <div
                className={cn(
                  "h-2.5 w-2.5 rounded-full border-2 transition-colors",
                  index === events.length - 1
                    ? "border-primary bg-primary"
                    : "border-border bg-card"
                )}
              />
            </div>

            {/* Event content */}
            <div className="flex flex-col gap-0.5">
              <span className="font-serif text-sm font-bold text-primary">
                {event.year}
              </span>
              <span className="text-sm text-muted-foreground leading-snug">
                {event.event}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

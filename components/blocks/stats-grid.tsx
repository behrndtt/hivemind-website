"use client";

import { InView } from "@/components/motion-primitives/in-view";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { getIcon, IconName } from "@/lib/icons";

export interface StatItem {
  value: string;
  label: string;
  icon?: LucideIcon | IconName;
}

// Helper function to resolve icon from prop (can be component or string name)
function resolveIcon(icon: LucideIcon | IconName | undefined): LucideIcon | undefined {
  if (!icon) return undefined;
  if (typeof icon === "string") {
    return getIcon(icon);
  }
  return icon;
}

export interface StatsGridProps {
  /** Array of stats to display */
  stats: StatItem[];
  /** Visual variant */
  variant?: "inline-strip" | "card-grid";
  /** Number of columns for card-grid variant */
  columns?: 2 | 3 | 4;
  /** Custom class name */
  className?: string;
}

// Inline strip variant - horizontal row with border
function InlineStripStats({ stats, className }: { stats: StatItem[]; className?: string }) {
  return (
    <section className={cn("py-16 border-y border-zinc-800/50", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          viewOptions={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl text-primary mb-2 font-serif font-normal">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </InView>
      </div>
    </section>
  );
}

// Card grid variant - response metrics style
function CardGridStats({
  stats,
  columns = 4,
  className,
}: {
  stats: StatItem[];
  columns: 2 | 3 | 4;
  className?: string;
}) {
  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <section className={cn("py-16", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedGroup
          preset="scale"
          className={cn("grid gap-6", columnClasses[columns])}
        >
          {stats.map((stat, index) => {
            const Icon = resolveIcon(stat.icon);
            return (
              <Card
                key={index}
                className="border-zinc-800 bg-zinc-900/50 text-center hover:border-primary/50 transition-all duration-500"
              >
                <CardContent className="p-6">
                  {Icon && (
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  )}
                  <div className="text-3xl sm:text-4xl text-primary mb-2 font-serif font-normal">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </AnimatedGroup>
      </div>
    </section>
  );
}

export function StatsGrid({
  stats,
  variant = "inline-strip",
  columns = 4,
  className,
}: StatsGridProps) {
  if (variant === "card-grid") {
    return <CardGridStats stats={stats} columns={columns} className={className} />;
  }

  return <InlineStripStats stats={stats} className={className} />;
}

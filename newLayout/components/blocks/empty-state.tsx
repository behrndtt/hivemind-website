"use client";

import { InView } from "@/components/motion-primitives/in-view";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Bell, Rss, FileText, LucideIcon } from "lucide-react";

export interface EmptyStateCta {
  label: string;
  href: string;
  variant?: "primary" | "outline";
  icon?: LucideIcon;
}

export interface EmptyStateProps {
  /** Icon to display - defaults based on type */
  icon?: LucideIcon;
  /** Title text */
  title: string;
  /** Description text */
  description: string;
  /** Primary CTA button */
  primaryCta?: EmptyStateCta;
  /** Secondary CTA button */
  secondaryCta?: EmptyStateCta;
  /** Type context for default icon selection */
  type?: "insight" | "case-study";
  /** Additional class names */
  className?: string;
}

const defaultIcons: Record<string, LucideIcon> = {
  insight: Rss,
  "case-study": FileText,
};

export function EmptyState({
  icon,
  title,
  description,
  primaryCta,
  secondaryCta,
  type = "insight",
  className,
}: EmptyStateProps) {
  const Icon = icon || defaultIcons[type] || Rss;

  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      viewOptions={{ once: true }}
    >
      <Card
        className={`border-2 border-dashed border-zinc-800 bg-zinc-900/50 ${className || ""}`}
      >
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mb-4 text-white">
            {title}
          </h2>
          <p className="mb-8 max-w-md text-zinc-400">{description}</p>
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col gap-4 sm:flex-row">
              {secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 rounded-full border-zinc-700 text-zinc-400 hover:border-primary/50 hover:text-white"
                >
                  <Link href={secondaryCta.href}>
                    {secondaryCta.icon && (
                      <secondaryCta.icon className="h-4 w-4" />
                    )}
                    {secondaryCta.label}
                  </Link>
                </Button>
              )}
              {primaryCta && (
                <Button
                  asChild
                  className="rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.icon && (
                      <primaryCta.icon className="mr-2 h-4 w-4" />
                    )}
                    {primaryCta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </InView>
  );
}

// Pre-configured empty states for common use cases
export const insightsEmptyState: Omit<EmptyStateProps, "className"> = {
  type: "insight",
  title: "Insights Coming Soon",
  description:
    "We're working on a collection of practical articles, guides, and industry updates to help you get the most from your Microsoft environment.",
  secondaryCta: { label: "Get Notified", href: "/contact", icon: Bell },
  primaryCta: { label: "Contact Us", href: "/contact" },
};

export const caseStudiesEmptyState: Omit<EmptyStateProps, "className"> = {
  type: "case-study",
  title: "More Case Studies Coming Soon",
  description:
    "We're documenting more client success stories. Check back soon for additional case studies across various industries.",
  secondaryCta: { label: "Get Notified", href: "/contact", icon: Bell },
  primaryCta: { label: "Start a Conversation", href: "/contact" },
};

"use client";

import { ReactNode } from "react";
import { InView } from "@/components/motion-primitives/in-view";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface ContentSectionProps {
  /** Optional badge text above the heading */
  badge?: string;
  /** Optional badge icon */
  badgeIcon?: LucideIcon;
  /** Section title */
  title?: string;
  /** Word(s) in the title to highlight with primary color */
  highlightedWords?: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Content alignment */
  align?: "center" | "left";
  /** Background style */
  background?: "default" | "subtle" | "border";
  /** Padding size */
  padding?: "sm" | "md" | "lg" | "xl";
  /** Section content */
  children: ReactNode;
  /** Custom class name for the section */
  className?: string;
  /** Custom class name for the inner container */
  containerClassName?: string;
  /** Enable/disable InView animation */
  animate?: boolean;
}

const paddingClasses = {
  sm: "py-12",
  md: "py-16",
  lg: "py-20 md:py-24",
  xl: "py-24 md:py-32",
};

const backgroundClasses = {
  default: "",
  subtle: "bg-zinc-900/50",
  border: "border-y border-zinc-800/50",
};

function renderTitle(title: string, highlightedWords?: string) {
  if (!highlightedWords) {
    return title;
  }

  const parts = title.split(new RegExp(`(${highlightedWords})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === highlightedWords.toLowerCase() ? (
      <span key={index} className="text-primary">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function ContentSection({
  badge,
  badgeIcon: BadgeIcon,
  title,
  highlightedWords,
  subtitle,
  align = "center",
  background = "default",
  padding = "lg",
  children,
  className,
  containerClassName,
  animate = true,
}: ContentSectionProps) {
  const hasHeader = badge || title || subtitle;

  const content = (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>
      {hasHeader && (
        <div
          className={cn(
            "mb-12",
            align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"
          )}
        >
          {badge && (
            <Badge
              variant="outline"
              className="mb-4 border-zinc-700 text-zinc-400"
            >
              {BadgeIcon && <BadgeIcon className="w-3 h-3 mr-1" />}
              {badge}
            </Badge>
          )}

          {title && (
            <h2 className="mb-4">
              {renderTitle(title, highlightedWords)}
            </h2>
          )}

          {subtitle && (
            <p className="text-zinc-400 text-lg">{subtitle}</p>
          )}
        </div>
      )}

      {children}
    </div>
  );

  const sectionClasses = cn(
    paddingClasses[padding],
    backgroundClasses[background],
    className
  );

  if (!animate) {
    return <section className={sectionClasses}>{content}</section>;
  }

  return (
    <InView
      as="section"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewOptions={{ once: true, margin: "-100px" }}
    >
      <div className={sectionClasses}>{content}</div>
    </InView>
  );
}

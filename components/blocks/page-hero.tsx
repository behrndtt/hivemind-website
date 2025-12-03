"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIcon, IconName } from "@/lib/icons";

export interface HeroCta {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

export interface PageHeroProps {
  /** Optional badge text above the title */
  badge?: string;
  /** Optional badge icon - can be component or icon name string */
  badgeIcon?: LucideIcon | IconName;
  /** Main hero title */
  title: string;
  /** Word(s) in the title to highlight with primary color */
  highlightedWords?: string;
  /** Subtitle/description text */
  subtitle?: string;
  /** Call-to-action buttons */
  ctas?: HeroCta[];
  /** Hero variant - full for homepage, compact for inner pages */
  variant?: "full" | "compact";
  /** Background style */
  background?: "hexagon" | "orbs" | "radial" | "none";
  /** Text alignment */
  align?: "center" | "left";
  /** Custom class name for additional styling */
  className?: string;
}

function HexagonBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
      }}
    >
      <defs>
        <pattern id="hexagons" width="28" height="49" patternUnits="userSpaceOnUse">
          <g fillRule="evenodd">
            <g fill="white" fillRule="nonzero">
              <path d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  );
}

function OrbsBackground() {
  return (
    <>
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]"
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[80px]"
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [0.9, 1.08, 0.9],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-primary/10 via-primary/5 to-transparent" />
    </>
  );
}

function RadialBackground() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
  );
}

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

// Helper function to resolve icon from prop (can be component or string name)
function resolveIcon(icon: LucideIcon | IconName | undefined): LucideIcon | undefined {
  if (!icon) return undefined;
  if (typeof icon === "string") {
    return getIcon(icon);
  }
  return icon;
}

export function PageHero({
  badge,
  badgeIcon,
  title,
  highlightedWords,
  subtitle,
  ctas = [],
  variant = "full",
  background = "hexagon",
  align = "center",
  className,
}: PageHeroProps) {
  const isFullVariant = variant === "full";
  const BadgeIcon = resolveIcon(badgeIcon);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-black",
        isFullVariant ? "min-h-[90vh] flex items-center justify-center" : "py-20 md:py-32",
        className
      )}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {background === "hexagon" && (
          <>
            <HexagonBackground />
            <OrbsBackground />
          </>
        )}
        {background === "orbs" && <OrbsBackground />}
        {background === "radial" && <RadialBackground />}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedGroup
          preset="blur-slide"
          className={cn(
            "max-w-4xl",
            align === "center" ? "mx-auto text-center" : "text-left"
          )}
        >
          {badge && (
            <div className={cn("mb-6", align === "center" && "flex justify-center")}>
              {isFullVariant ? (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
                  {badge}
                </span>
              ) : (
                <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                  {BadgeIcon && <BadgeIcon className="w-3 h-3 mr-1" />}
                  {badge}
                </Badge>
              )}
            </div>
          )}

          <h1
            className={cn(
              "tracking-tight font-serif font-normal mb-6",
              isFullVariant
                ? "text-4xl sm:text-5xl lg:text-7xl"
                : "text-3xl sm:text-4xl md:text-5xl"
            )}
          >
            {renderTitle(title, highlightedWords)}
          </h1>

          {subtitle && (
            <p
              className={cn(
                "text-zinc-400 mb-8",
                isFullVariant ? "text-lg sm:text-xl max-w-2xl" : "text-lg max-w-2xl",
                align === "center" && "mx-auto"
              )}
            >
              {subtitle}
            </p>
          )}

          {ctas.length > 0 && (
            <div
              className={cn(
                "flex flex-col sm:flex-row gap-4",
                align === "center" && "justify-center"
              )}
            >
              {ctas.map((cta, index) => (
                <Button
                  key={index}
                  asChild
                  size="lg"
                  variant={cta.variant === "outline" ? "outline" : "default"}
                  className={cn(
                    "rounded-full font-semibold px-8",
                    cta.variant === "outline"
                      ? "border-zinc-700 hover:bg-zinc-800 hover:border-primary/50"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  )}
                >
                  <Link href={cta.href}>
                    {cta.label}
                    {cta.variant !== "outline" && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </AnimatedGroup>
      </div>
    </section>
  );
}

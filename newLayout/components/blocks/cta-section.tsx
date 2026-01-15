"use client";

import Link from "next/link";
import { InView } from "@/components/motion-primitives/in-view";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIcon, IconName } from "@/lib/icons";

export interface CtaLink {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

export interface CtaSectionProps {
  /** Optional icon above the title - can be component or icon name string */
  icon?: LucideIcon | IconName;
  /** CTA title */
  title: string;
  /** Word(s) in the title to highlight with primary color */
  highlightedWords?: string;
  /** CTA subtitle/description */
  subtitle?: string;
  /** Primary CTA button */
  primaryCta?: CtaLink;
  /** Secondary CTA button */
  secondaryCta?: CtaLink;
  /** Array of CTA buttons (alternative to primaryCta/secondaryCta) */
  ctas?: CtaLink[];
  /** Visual variant - "inline" is an alias for "minimal" */
  variant?: "boxed" | "full-width" | "minimal" | "inline";
  /** Background style (deprecated - use variant instead) */
  background?: "gradient-box" | "radial" | "minimal";
  /** Custom class name */
  className?: string;
}

function HexagonPattern({ id }: { id: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
      }}
    >
      <defs>
        <pattern id={id} width="28" height="49" patternUnits="userSpaceOnUse">
          <g fillRule="evenodd">
            <g fill="white" fillRule="nonzero">
              <path d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
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

export function CtaSection({
  icon,
  title,
  highlightedWords,
  subtitle,
  primaryCta,
  secondaryCta,
  ctas,
  variant = "boxed",
  background,
  className,
}: CtaSectionProps) {
  const patternId = "cta-hexagons-pattern";
  
  // Resolve icon from prop
  const Icon = resolveIcon(icon);
  
  // Normalize "inline" to "minimal"
  const normalizedVariant = variant === "inline" ? "minimal" : variant;
  
  // Map variant to background for backwards compatibility
  const resolvedBackground = background || (
    normalizedVariant === "boxed" ? "gradient-box" :
    normalizedVariant === "full-width" ? "radial" :
    "minimal"
  );
  
  // Build CTA array from props
  const allCtas = ctas || [
    ...(primaryCta ? [primaryCta] : []),
    ...(secondaryCta ? [{ ...secondaryCta, variant: "outline" as const }] : []),
  ];

  return (
    <section className={cn("py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InView
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.6 }}
          viewOptions={{ once: true, margin: "-100px" }}
        >
          <div
            className={cn(
              "relative text-center overflow-hidden",
              resolvedBackground === "gradient-box" &&
                "rounded-3xl p-12 lg:p-16 border border-zinc-800",
              resolvedBackground === "radial" && "py-16",
              resolvedBackground === "minimal" && "py-12"
            )}
          >
            {/* Background effects */}
            {resolvedBackground === "gradient-box" && (
              <>
                <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10" />
                <HexagonPattern id={patternId} />
              </>
            )}

            {resolvedBackground === "radial" && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            )}

            <div className="relative z-10">
              {Icon && (
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
              )}

              <h2 className="mb-4">
                {renderTitle(title, highlightedWords)}
              </h2>

              {subtitle && (
                <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}

              {allCtas.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {allCtas.map((cta, index) => (
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
                        {cta.variant !== "outline" && (
                          <ArrowRight className="ml-2 w-4 h-4" />
                        )}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}

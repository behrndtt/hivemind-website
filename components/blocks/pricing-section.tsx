"use client";

import Link from "next/link";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { InView } from "@/components/motion-primitives/in-view";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  price?: string;
  period?: string;
  description: string;
  features: string[];
  cta?: string;
  ctaHref?: string;
  highlight?: boolean;
}

export interface PricingSectionProps {
  /** Section badge text */
  badge?: string;
  /** Section title */
  title?: string;
  /** Word(s) to highlight in the title */
  highlightedWords?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Array of pricing plans */
  plans: PricingPlan[];
  /** Footer text below the pricing cards */
  footer?: string;
  /** Custom class name */
  className?: string;
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

export function PricingSection({
  badge,
  title = "Pricing Plans",
  highlightedWords,
  subtitle,
  plans,
  footer,
  className,
}: PricingSectionProps) {
  const hasHeader = badge || title || subtitle;

  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {hasHeader && (
          <InView
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true, margin: "-100px" }}
          >
            <div className="mb-12 text-center mx-auto max-w-3xl">
              {badge && (
                <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  {badge}
                </span>
              )}
              {title && (
                <h2 className="text-3xl sm:text-4xl mb-4">
                  {renderTitle(title, highlightedWords)}
                </h2>
              )}
              {subtitle && <p className="text-zinc-400 text-lg">{subtitle}</p>}
            </div>
          </InView>
        )}

        <AnimatedGroup
          preset="scale"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                "relative h-full transition-all duration-500 hover:scale-[1.02]",
                plan.highlight
                  ? "border-primary shadow-lg shadow-primary/20 bg-zinc-900/80"
                  : "border-zinc-800 bg-zinc-900/50 hover:border-primary/50"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl text-white mb-2">
                    {plan.name}
                  </h3>
                  {plan.price && (
                    <div className="mb-4">
                      <span className="font-serif text-3xl sm:text-4xl text-white">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-zinc-400">{plan.period}</span>
                      )}
                    </div>
                  )}
                  <p className="text-sm sm:text-base text-zinc-400">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-zinc-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.cta && (
                  <div className="mt-auto">
                    <Button
                      asChild
                      className={cn(
                        "w-full rounded-full font-semibold",
                        plan.highlight
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border-zinc-700 text-white hover:bg-zinc-800 hover:border-primary/50"
                      )}
                      variant={plan.highlight ? "default" : "outline"}
                    >
                      <Link href={plan.ctaHref || "/contact"}>{plan.cta}</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </AnimatedGroup>

        {footer && (
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewOptions={{ once: true }}
          >
            <p className="mt-8 text-center text-sm text-zinc-400">{footer}</p>
          </InView>
        )}
      </div>
    </section>
  );
}

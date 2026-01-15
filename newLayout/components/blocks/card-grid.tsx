"use client";

import Link from "next/link";
import { AnimatedGroup, PresetType } from "@/components/motion-primitives/animated-group";
import { InView } from "@/components/motion-primitives/in-view";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIcon, IconName } from "@/lib/icons";

// Base item interface - all variants extend from this
export interface CardGridItemBase {
  title: string;
  description?: string;
}

// Icon can be either a string name or a LucideIcon component
type IconProp = IconName | string | LucideIcon;

// Icon-top variant (Features, Values, Pillars)
export interface IconTopItem extends CardGridItemBase {
  icon?: IconProp;
}

// Icon-left variant (Contact methods, info items)
export interface IconLeftItem extends CardGridItemBase {
  icon?: IconProp;
  value?: string;
  href?: string;
  action?: string;
}

// Horizontal variant (Service cards with features list)
export interface HorizontalItem extends CardGridItemBase {
  icon?: IconProp;
  features?: string[];
}

// Numbered variant (Process steps)
export interface NumberedItem extends CardGridItemBase {
  step?: number | string;
}

// Two-column variant (Why Choose Us, Benefits)
export interface TwoColumnItem extends CardGridItemBase {
  icon?: IconProp;
}

// Service overview variant (clickable cards with href)
export interface ServiceOverviewItem extends CardGridItemBase {
  icon?: IconProp;
  href?: string;
}

export type CardGridItem =
  | IconTopItem
  | IconLeftItem
  | HorizontalItem
  | NumberedItem
  | TwoColumnItem
  | ServiceOverviewItem;

export type CardGridVariant =
  | "icon-top"
  | "icon-left"
  | "horizontal"
  | "numbered"
  | "two-column"
  | "service-overview";

export interface CardGridProps<T extends CardGridItem> {
  /** Array of items to display */
  items: T[];
  /** Visual variant of the card grid */
  variant?: CardGridVariant;
  /** Section badge text */
  badge?: string;
  /** Section title */
  title?: string;
  /** Word(s) to highlight in the title */
  highlightedWords?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Number of columns (auto uses responsive grid) */
  columns?: "auto" | 1 | 2 | 3 | 4 | 5;
  /** Gap size between cards */
  gap?: "sm" | "md" | "lg";
  /** Animation preset from AnimatedGroup */
  preset?: PresetType;
  /** Custom class name for the grid container */
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

const columnClasses = {
  auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

// Helper to resolve icon from string name or component
function resolveIcon(icon: IconProp | undefined): LucideIcon | undefined {
  if (!icon) return undefined;
  if (typeof icon === "string") {
    return getIcon(icon);
  }
  return icon as LucideIcon;
}

// Icon-top card (Features, Values, Four Pillars)
function IconTopCard({ item }: { item: IconTopItem }) {
  const Icon = resolveIcon(item.icon);
  return (
    <Card className="h-full border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500 hover:bg-zinc-900/80 hover:-translate-y-1">
      <CardContent className="p-6 sm:p-8">
        {Icon && (
          <div className="text-primary mb-4">
            <Icon className="w-8 h-8" />
          </div>
        )}
        <h3 className="mb-3 text-white">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            {item.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Icon-left card (Contact methods, info items)
function IconLeftCard({ item }: { item: IconLeftItem }) {
  const Icon = resolveIcon(item.icon);
  return (
    <Card className="h-full border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1">
      <CardContent className="flex flex-col items-center p-6 text-center">
        {Icon && (
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-7 w-7 text-primary" />
          </div>
        )}
        <h3 className="mb-1 text-white">
          {item.title}
        </h3>
        {item.description && (
          <p className="mb-3 text-sm text-zinc-400">{item.description}</p>
        )}
        {item.value && (
          <p className="mb-4 font-medium text-white">{item.value}</p>
        )}
        {item.href && item.action && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-zinc-700 text-zinc-300 hover:border-primary hover:text-white"
          >
            <Link href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}>
              {item.action}
              <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Horizontal card (Service cards with features list)
function HorizontalCard({ item }: { item: HorizontalItem }) {
  const Icon = resolveIcon(item.icon);
  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500">
      <div className="grid md:grid-cols-3 gap-6">
        <CardHeader className="md:col-span-1 bg-zinc-800/30 p-6">
          {Icon && (
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Icon className="h-7 w-7 text-primary" />
            </div>
          )}
          <CardTitle className="text-xl text-white">
            {item.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="md:col-span-2 p-6">
          {item.description && (
            <p className="mb-4 text-zinc-400">{item.description}</p>
          )}
          {item.features && item.features.length > 0 && (
            <ul className="grid gap-2 sm:grid-cols-2">
              {item.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-center gap-2 text-sm text-zinc-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

// Numbered card (Process steps)
function NumberedCard({ item, index }: { item: NumberedItem; index: number }) {
  const stepNumber = item.step ?? index + 1;
  return (
    <Card className="h-full border-zinc-800 bg-zinc-900/50 text-center hover:border-primary/50 transition-all duration-500">
      <CardContent className="p-6">
        <div className="mb-3 text-4xl font-bold text-primary/30">{stepNumber}</div>
        <h3 className="mb-2 text-white">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm text-zinc-400">{item.description}</p>
        )}
      </CardContent>
    </Card>
  );
}

// Two-column card (Why Choose Us, Benefits - icon-left inline style)
function TwoColumnCard({ item }: { item: TwoColumnItem }) {
  const Icon = resolveIcon(item.icon);
  return (
    <div className="flex items-start gap-4">
      {Icon && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      )}
      <div>
        <h3 className="text-white mb-1">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-zinc-400">{item.description}</p>
        )}
      </div>
    </div>
  );
}

// Service overview card (clickable cards with href)
function ServiceOverviewCard({ item }: { item: ServiceOverviewItem }) {
  const Icon = resolveIcon(item.icon);
  const content = (
    <Card className="h-full border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 group">
      <CardContent className="p-6 sm:p-8">
        {Icon && (
          <div className="text-primary mb-4">
            <Icon className="w-10 h-10" />
          </div>
        )}
        <h3 className="mb-3 text-white group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-zinc-400 mb-4">{item.description}</p>
        )}
        {item.href && (
          <div className="flex items-center text-primary text-sm font-medium">
            Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (item.href) {
    return <Link href={item.href} className="block h-full">{content}</Link>;
  }

  return content;
}

export function CardGrid<T extends CardGridItem>({
  items,
  variant = "icon-top",
  badge,
  title,
  highlightedWords,
  subtitle,
  columns = "auto",
  gap = "md",
  preset = "fade",
  className,
}: CardGridProps<T>) {
  const hasHeader = badge || title || subtitle;

  const renderHeader = () => {
    if (!hasHeader) return null;
    return (
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
            <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400">
              {badge}
            </Badge>
          )}
          {title && (
            <h2 className="mb-4 text-white">
              {renderTitle(title, highlightedWords)}
            </h2>
          )}
          {subtitle && <p className="text-lg text-zinc-400">{subtitle}</p>}
        </div>
      </InView>
    );
  };

  // Horizontal variant uses space-y instead of grid
  if (variant === "horizontal") {
    return (
      <section className={className}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          {renderHeader()}
          <AnimatedGroup preset={preset} className="space-y-8">
            {items.map((item, index) => (
              <HorizontalCard key={index} item={item as HorizontalItem} />
            ))}
          </AnimatedGroup>
        </div>
      </section>
    );
  }

  // Two-column variant uses different layout
  if (variant === "two-column") {
    return (
      <section className={className}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          {renderHeader()}
          <AnimatedGroup preset={preset} className="space-y-6">
            {items.map((item, index) => (
              <TwoColumnCard key={index} item={item as TwoColumnItem} />
            ))}
          </AnimatedGroup>
        </div>
      </section>
    );
  }

  // Grid-based variants
  const gridClasses = cn(
    "grid",
    columnClasses[columns],
    gapClasses[gap]
  );

  // Use auto-fit for flexible responsive grids (contact methods style)
  const flexGridClasses = "grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] justify-center";

  const renderCard = (item: T, index: number) => {
    switch (variant) {
      case "icon-top":
        return <IconTopCard key={index} item={item as IconTopItem} />;
      case "icon-left":
        return <IconLeftCard key={index} item={item as IconLeftItem} />;
      case "numbered":
        return <NumberedCard key={index} item={item as NumberedItem} index={index} />;
      case "service-overview":
        return <ServiceOverviewCard key={index} item={item as ServiceOverviewItem} />;
      default:
        return <IconTopCard key={index} item={item as IconTopItem} />;
    }
  };

  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {renderHeader()}
        <AnimatedGroup
          preset={preset}
          className={variant === "icon-left" ? flexGridClasses : gridClasses}
        >
          {items.map((item, index) => renderCard(item, index))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

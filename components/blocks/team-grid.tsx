"use client";

import Link from "next/link";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { InView } from "@/components/motion-primitives/in-view";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TeamMember {
  name: string;
  role: string;
  description?: string;
  avatar?: string;
  linkedin?: string;
  socialIcon?: LucideIcon;
}

export interface TeamGridProps {
  /** Section badge text */
  badge?: string;
  /** Section title */
  title?: string;
  /** Word(s) to highlight in the title */
  highlightedWords?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Array of team members */
  members: TeamMember[];
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Custom class name */
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
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

export function TeamGrid({
  badge,
  title = "Our Team",
  highlightedWords,
  subtitle,
  members,
  columns = 4,
  className,
}: TeamGridProps) {
  const hasHeader = badge || title || subtitle;

  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={cn("py-20 md:py-28 bg-black", className)}>
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
                <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400">
                  {badge}
                </Badge>
              )}
              {title && (
                <h2 className="mb-4 text-3xl tracking-tight md:text-4xl text-white">
                  {renderTitle(title, highlightedWords)}
                </h2>
              )}
              {subtitle && <p className="text-zinc-400">{subtitle}</p>}
            </div>
          </InView>
        )}

        <AnimatedGroup
          preset="blur-slide"
          className={cn("grid gap-6", columnClasses[columns])}
        >
          {members.map((member, index) => {
            const SocialIcon = member.socialIcon || Linkedin;
            return (
              <Card
                key={index}
                className="h-full border-zinc-800 bg-zinc-900/50 hover:border-primary/50 hover:scale-[1.02] transition-all duration-500"
              >
                <CardContent className="p-6">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="mb-4 h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-2xl font-bold text-primary-foreground">
                      {getInitials(member.name)}
                    </div>
                  )}
                  <h3 className="mb-1 text-lg text-white">
                    {member.name}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-primary">
                    {member.role}
                  </p>
                  {member.description && (
                    <p className="mb-4 text-sm text-zinc-400">
                      {member.description}
                    </p>
                  )}
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-primary transition-colors"
                    >
                      <SocialIcon className="h-4 w-4" />
                      Connect
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </AnimatedGroup>
      </div>
    </section>
  );
}

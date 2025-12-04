"use client";

import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { InView } from "@/components/motion-primitives/in-view";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface TestimonialsSectionProps {
  /** Section badge text */
  badge?: string;
  /** Section title */
  title?: string;
  /** Word(s) to highlight in the title */
  highlightedWords?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Array of testimonials to display */
  testimonials: Testimonial[];
  /** Number of columns */
  columns?: 2 | 3;
  /** Custom class name */
  className?: string;
}

function StarRating() {
  return (
    <div className="flex text-primary mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
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

export function TestimonialsSection({
  badge,
  title = "What Our Clients Say",
  highlightedWords,
  subtitle,
  testimonials,
  columns = 2,
  className,
}: TestimonialsSectionProps) {
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
          className={cn(
            "grid gap-6 sm:gap-8",
            columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="h-full border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500"
            >
              <CardContent className="pt-6">
                <StarRating />
                <blockquote className="text-md mb-6 text-zinc-300 font-serif font-normal">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full bg-zinc-800"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary font-serif font-normal">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-serif font-normal text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

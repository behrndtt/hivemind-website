'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { Badge } from '@/components/ui/badge';
import type {
  Insight,
  CaseStudy,
} from '@/tina/__generated__/types';

// Union type for posts
type Post = Insight | CaseStudy;

/**
 * Format date for display
 */
function formatDate(dateString?: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Estimate reading time from content length
 */
function estimateReadingTime(content?: string | null): number {
  if (!content) return 5;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Hexagon SVG pattern background (matching page-hero)
 */
function HexagonBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
      }}
    >
      <defs>
        <pattern id="post-hexagons" width="28" height="49" patternUnits="userSpaceOnUse">
          <g fillRule="evenodd">
            <g fill="white" fillRule="nonzero">
              <path d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#post-hexagons)" />
    </svg>
  );
}

/**
 * Animated orbs background (simplified version for post pages)
 */
function OrbsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const orb1MouseX = useSpring(mouseX, { stiffness: 60, damping: 40 });
  const orb1MouseY = useSpring(mouseY, { stiffness: 60, damping: 40 });
  const orb2MouseX = useSpring(mouseX, { stiffness: 30, damping: 50 });
  const orb2MouseY = useSpring(mouseY, { stiffness: 30, damping: 50 });

  const drift1X = useMotionValue(0);
  const drift1Y = useMotionValue(0);
  const drift2X = useMotionValue(0);
  const drift2Y = useMotionValue(0);

  const smoothDrift1X = useSpring(drift1X, { stiffness: 8, damping: 20 });
  const smoothDrift1Y = useSpring(drift1Y, { stiffness: 8, damping: 20 });
  const smoothDrift2X = useSpring(drift2X, { stiffness: 6, damping: 18 });
  const smoothDrift2Y = useSpring(drift2Y, { stiffness: 6, damping: 18 });

  const orb1X = useTransform([orb1MouseX, smoothDrift1X], ([mouse, drift]) => 
    ((mouse as number) - 0.5) * 150 + (drift as number)
  );
  const orb1Y = useTransform([orb1MouseY, smoothDrift1Y], ([mouse, drift]) => 
    ((mouse as number) - 0.5) * 120 + (drift as number)
  );
  const orb2X = useTransform([orb2MouseX, smoothDrift2X], ([mouse, drift]) => 
    ((mouse as number) - 0.5) * -100 + (drift as number)
  );
  const orb2Y = useTransform([orb2MouseY, smoothDrift2Y], ([mouse, drift]) => 
    ((mouse as number) - 0.5) * -80 + (drift as number)
  );

  const [morphState, setMorphState] = useState({
    orb1: { scaleX: 1, scaleY: 1, borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" },
    orb2: { scaleX: 1, scaleY: 1, borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%" },
  });

  const randomBorderRadius = () => {
    const r = () => 30 + Math.random() * 40;
    return `${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let animationId: number;
    let time = 0;
    
    const offsets = {
      o1: { x: Math.random() * 10, y: Math.random() * 10 },
      o2: { x: Math.random() * 10, y: Math.random() * 10 },
    };
    
    const noise = (t: number, seed: number) => {
      return (
        Math.sin(t * 0.7 + seed) * 0.5 +
        Math.sin(t * 1.1 + seed * 1.3) * 0.3 +
        Math.sin(t * 1.7 + seed * 0.7) * 0.15
      );
    };
    
    const animate = () => {
      time += 0.003;
      
      drift1X.set(noise(time * 0.8, offsets.o1.x) * 80 + Math.sin(time * 0.3) * 40);
      drift1Y.set(noise(time * 0.6, offsets.o1.y) * 60 + Math.cos(time * 0.4) * 30);
      drift2X.set(noise(time * 0.5, offsets.o2.x + 5) * 100 + Math.sin(time * 0.25) * 50);
      drift2Y.set(noise(time * 0.7, offsets.o2.y + 3) * 70 + Math.cos(time * 0.35) * 35);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [drift1X, drift1Y, drift2X, drift2Y]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const scheduleNextMorph = () => {
      const nextInterval = 5000 + Math.random() * 4000;
      
      timeoutId = setTimeout(() => {
        setMorphState({
          orb1: {
            scaleX: 0.7 + Math.random() * 0.6,
            scaleY: 0.7 + Math.random() * 0.6,
            borderRadius: randomBorderRadius(),
          },
          orb2: {
            scaleX: 0.7 + Math.random() * 0.6,
            scaleY: 0.7 + Math.random() * 0.6,
            borderRadius: randomBorderRadius(),
          },
        });
        scheduleNextMorph();
      }, nextInterval);
    };
    
    scheduleNextMorph();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] opacity-30"
        style={{
          x: orb1X,
          y: orb1Y,
          background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1), transparent 70%)',
          filter: 'blur(60px)',
          scaleX: morphState.orb1.scaleX,
          scaleY: morphState.orb1.scaleY,
          borderRadius: morphState.orb1.borderRadius,
        }}
        animate={{
          scaleX: morphState.orb1.scaleX,
          scaleY: morphState.orb1.scaleY,
          borderRadius: morphState.orb1.borderRadius,
        }}
        transition={{ duration: 6, ease: "easeInOut" }}
        initial={{ top: "10%", left: "60%" }}
      />
      
      {/* Secondary orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] opacity-20"
        style={{
          x: orb2X,
          y: orb2Y,
          background: 'radial-gradient(circle at 70% 70%, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05), transparent 70%)',
          filter: 'blur(50px)',
          scaleX: morphState.orb2.scaleX,
          scaleY: morphState.orb2.scaleY,
          borderRadius: morphState.orb2.borderRadius,
        }}
        animate={{
          scaleX: morphState.orb2.scaleX,
          scaleY: morphState.orb2.scaleY,
          borderRadius: morphState.orb2.borderRadius,
        }}
        transition={{ duration: 7, ease: "easeInOut" }}
        initial={{ top: "50%", left: "20%" }}
      />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-primary/8 via-primary/4 to-transparent" />
    </div>
  );
}

export interface PostHeroProps {
  /** Post data from TinaCMS */
  post: Post;
  /** Back link configuration */
  backLink: {
    href: string;
    label: string;
  };
  /** Content type for display */
  contentType: 'insight' | 'case-study';
  /** Custom class name */
  className?: string;
}

export function PostHero({
  post,
  backLink,
  contentType,
  className,
}: PostHeroProps) {
  // Get category label for case studies
  const categoryLabel = contentType === 'case-study' 
    ? (post as CaseStudy).industry || 'Case Study'
    : 'Insight';

  // Check if featured (based on heroImg presence as a proxy)
  const isFeatured = Boolean(post.heroImg);

  return (
    <>
      {/* Hero Section */}
      <section
        className={cn(
          'relative overflow-hidden bg-background py-20 md:py-28',
          className
        )}
      >
        {/* Animated backgrounds matching page-hero */}
        <div className="absolute inset-0">
          <HexagonBackground />
          <OrbsBackground />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedGroup
            preset="blur-slide"
            className="max-w-4xl"
          >
            {/* Back link */}
            <Link
              href={backLink.href}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {backLink.label}
            </Link>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                {categoryLabel}
              </span>
              {isFeatured && (
                <Badge
                  variant="outline"
                  className="border-primary/50 text-primary"
                >
                  Featured
                </Badge>
              )}
            </div>

            {/* Title - matching page-hero typography */}
            <h1
              data-tina-field={tinaField(post, 'title')}
              className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight"
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p
                data-tina-field={tinaField(post, 'excerpt')}
                className="mb-8 max-w-3xl text-lg sm:text-xl text-muted-foreground"
              >
                {typeof post.excerpt === 'string' 
                  ? post.excerpt 
                  : (post.excerpt as any)?.children?.[0]?.children?.[0]?.text || ''}
              </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {/* Date */}
              {post.date && (
                <div
                  data-tina-field={tinaField(post, 'date')}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
              )}

              {/* Reading time */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{estimateReadingTime(post.title)} min read</span>
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Hero Image */}
      {post.heroImg && (
        <section className="bg-background pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedGroup
              preset="blur-slide"
            >
              <div
                data-tina-field={tinaField(post, 'heroImg')}
                className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border/10"
              >
                <img
                  src={post.heroImg}
                  alt={post.title || ''}
                  className="h-full w-full object-cover"
                />
              </div>
            </AnimatedGroup>
          </div>
        </section>
      )}
    </>
  );
}

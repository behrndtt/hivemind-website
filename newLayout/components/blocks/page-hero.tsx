"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIcon, IconName } from "@/lib/icons";
import { useEffect, useState, useRef } from "react";

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

function OrbsBackground({ intense = false }: { intense?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Raw mouse position (0-1 normalized)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Each orb has its own mouse tracking with different spring physics
  // Orb 1: Quick, responsive - follows cursor closely
  const orb1MouseX = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const orb1MouseY = useSpring(mouseY, { stiffness: 80, damping: 30 });
  
  // Orb 2: Medium response - slightly delayed, moves opposite direction
  const orb2MouseX = useSpring(mouseX, { stiffness: 40, damping: 50 });
  const orb2MouseY = useSpring(mouseY, { stiffness: 40, damping: 50 });
  
  // Orb 3: Slow, heavy - lags behind significantly, creates depth
  const orb3MouseX = useSpring(mouseX, { stiffness: 20, damping: 60 });
  const orb3MouseY = useSpring(mouseY, { stiffness: 20, damping: 60 });

  // Organic drift motion values for each orb
  const drift1X = useMotionValue(0);
  const drift1Y = useMotionValue(0);
  const drift2X = useMotionValue(0);
  const drift2Y = useMotionValue(0);
  const drift3X = useMotionValue(0);
  const drift3Y = useMotionValue(0);

  // Spring the drift for smoothness - slower, more languid movement
  const smoothDrift1X = useSpring(drift1X, { stiffness: 8, damping: 20 });
  const smoothDrift1Y = useSpring(drift1Y, { stiffness: 8, damping: 20 });
  const smoothDrift2X = useSpring(drift2X, { stiffness: 6, damping: 18 });
  const smoothDrift2Y = useSpring(drift2Y, { stiffness: 6, damping: 18 });
  const smoothDrift3X = useSpring(drift3X, { stiffness: 5, damping: 15 });
  const smoothDrift3Y = useSpring(drift3Y, { stiffness: 5, damping: 15 });

  // Combine each orb's individual mouse tracking with organic drift
  // Orb 1: Fast response, large movement (200px range)
  const orb1X = useTransform([orb1MouseX, smoothDrift1X], ([mouse, drift]) => 
    ((mouse as number) - 0.5) * 250 + (drift as number)
  );
  const orb1Y = useTransform([orb1MouseY, smoothDrift1Y], ([mouse, drift]) => 
    ((mouse as number) - 0.5) * 200 + (drift as number)
  );
  
  // Orb 2: Medium response, opposite direction for parallax (-180px range)
  const orb2X = useTransform([orb2MouseX, smoothDrift2X], ([mouse, drift]) => 
    ((mouse as number) - 0.5) * -180 + (drift as number)
  );
  const orb2Y = useTransform([orb2MouseY, smoothDrift2Y], ([mouse, drift]) => 
    ((mouse as number) - 0.5) * -150 + (drift as number)
  );
  
  // Orb 3: Slow response, subtle movement for depth (120px range)
  const orb3X = useTransform([orb3MouseX, smoothDrift3X], ([mouse, drift]) => 
    ((mouse as number) - 0.5) * 120 + (drift as number)
  );
  const orb3Y = useTransform([orb3MouseY, smoothDrift3Y], ([mouse, drift]) => 
    ((mouse as number) - 0.5) * -100 + (drift as number)
  );

  // Morph state for shape changes
  const [morphState, setMorphState] = useState({
    orb1: { scaleX: 1, scaleY: 1, rotate: 0, borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" },
    orb2: { scaleX: 1, scaleY: 1, rotate: 0, borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%" },
    orb3: { scaleX: 1, scaleY: 1, rotate: 0, borderRadius: "50% 60% 40% 70% / 60% 40% 70% 50%" },
  });

  // Generate random organic border-radius
  const randomBorderRadius = () => {
    const r = () => 30 + Math.random() * 40; // 30-70%
    return `${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`;
  };

  // Mouse tracking
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

  // Organic drift animation - creates wandering motion with unpredictable noise
  useEffect(() => {
    let animationId: number;
    let time = 0;
    
    // Random offsets for each orb (set once on mount)
    const offsets = {
      o1: { x: Math.random() * 10, y: Math.random() * 10 },
      o2: { x: Math.random() * 10, y: Math.random() * 10 },
      o3: { x: Math.random() * 10, y: Math.random() * 10 },
    };
    
    // Noise function - combines multiple sine waves at prime-ish ratios for non-repeating patterns
    const noise = (t: number, seed: number) => {
      return (
        Math.sin(t * 0.7 + seed) * 0.5 +
        Math.sin(t * 1.1 + seed * 1.3) * 0.3 +
        Math.sin(t * 1.7 + seed * 0.7) * 0.15 +
        Math.sin(t * 2.3 + seed * 2.1) * 0.05
      );
    };
    
    const animate = () => {
      time += 0.003 + Math.sin(time * 0.05) * 0.001; // Slower variable speed for languid movement
      
      // Layer multiple noise frequencies with random offsets
      drift1X.set(
        noise(time * 0.8, offsets.o1.x) * 120 +
        Math.sin(time * 0.3 + offsets.o1.x) * 60 +
        Math.sin(time * 2.1) * 20
      );
      drift1Y.set(
        noise(time * 0.6, offsets.o1.y) * 100 +
        Math.cos(time * 0.4 + offsets.o1.y) * 50 +
        Math.cos(time * 1.9) * 25
      );
      
      drift2X.set(
        noise(time * 0.5, offsets.o2.x + 5) * 140 +
        Math.sin(time * 0.25 + offsets.o2.x) * 70 +
        Math.sin(time * 1.7) * 30
      );
      drift2Y.set(
        noise(time * 0.7, offsets.o2.y + 3) * 110 +
        Math.cos(time * 0.35 + offsets.o2.y) * 55 +
        Math.cos(time * 2.3) * 20
      );
      
      drift3X.set(
        noise(time * 0.4, offsets.o3.x + 8) * 90 +
        Math.sin(time * 0.2 + offsets.o3.x) * 45 +
        Math.sin(time * 1.5) * 25
      );
      drift3Y.set(
        noise(time * 0.55, offsets.o3.y + 6) * 100 +
        Math.cos(time * 0.3 + offsets.o3.y) * 50 +
        Math.cos(time * 1.8) * 30
      );
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [drift1X, drift1Y, drift2X, drift2Y, drift3X, drift3Y]);

  // Random morphing for shape and scale - with variable timing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const scheduleNextMorph = () => {
      // Random interval between 4-9 seconds for slower morphing
      const nextInterval = 4000 + Math.random() * 5000;
      
      timeoutId = setTimeout(() => {
        setMorphState({
          orb1: {
            scaleX: 0.6 + Math.random() * 0.8,
            scaleY: 0.6 + Math.random() * 0.8,
            rotate: Math.random() * 360,
            borderRadius: randomBorderRadius(),
          },
          orb2: {
            scaleX: 0.65 + Math.random() * 0.7,
            scaleY: 0.65 + Math.random() * 0.7,
            rotate: Math.random() * 360,
            borderRadius: randomBorderRadius(),
          },
          orb3: {
            scaleX: 0.7 + Math.random() * 0.6,
            scaleY: 0.7 + Math.random() * 0.6,
            rotate: Math.random() * 360,
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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Orb 1 - Primary, largest */}
      <motion.div
        className={cn(
          "absolute blur-[100px]",
          intense ? "w-[600px] h-[600px] bg-primary/25" : "w-[500px] h-[500px] bg-primary/20"
        )}
        style={{
          top: "10%",
          left: "10%",
          x: orb1X,
          y: orb1Y,
        }}
        animate={{
          opacity: [0.5, 0.9, 0.6, 1, 0.5],
          scaleX: morphState.orb1.scaleX,
          scaleY: morphState.orb1.scaleY,
          rotate: morphState.orb1.rotate,
          borderRadius: morphState.orb1.borderRadius,
        }}
        transition={{
          opacity: { duration: 16, repeat: Infinity, ease: "easeInOut" },
          scaleX: { duration: 8, ease: "easeInOut" },
          scaleY: { duration: 9, ease: "easeInOut" },
          rotate: { duration: 14, ease: "easeInOut" },
          borderRadius: { duration: 10, ease: "easeInOut" },
        }}
      />

      {/* Orb 2 - Secondary */}
      <motion.div
        className={cn(
          "absolute blur-[80px]",
          intense ? "w-[500px] h-[500px] bg-primary/20" : "w-[400px] h-[400px] bg-primary/15"
        )}
        style={{
          bottom: "15%",
          right: "10%",
          x: orb2X,
          y: orb2Y,
        }}
        animate={{
          opacity: [0.4, 0.8, 0.5, 0.9, 0.4],
          scaleX: morphState.orb2.scaleX,
          scaleY: morphState.orb2.scaleY,
          rotate: morphState.orb2.rotate,
          borderRadius: morphState.orb2.borderRadius,
        }}
        transition={{
          opacity: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 },
          scaleX: { duration: 9, ease: "easeInOut" },
          scaleY: { duration: 8, ease: "easeInOut" },
          rotate: { duration: 16, ease: "easeInOut" },
          borderRadius: { duration: 9, ease: "easeInOut" },
        }}
      />

      {/* Orb 3 - Center ambient */}
      <motion.div
        className={cn(
          "absolute blur-[120px]",
          intense ? "w-[700px] h-[700px] bg-primary/15" : "w-[600px] h-[600px] bg-primary/10"
        )}
        style={{
          top: "50%",
          left: "50%",
          x: orb3X,
          y: orb3Y,
          marginLeft: intense ? "-350px" : "-300px",
          marginTop: intense ? "-350px" : "-300px",
        }}
        animate={{
          opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
          scaleX: morphState.orb3.scaleX,
          scaleY: morphState.orb3.scaleY,
          rotate: morphState.orb3.rotate,
          borderRadius: morphState.orb3.borderRadius,
        }}
        transition={{
          opacity: { duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 },
          scaleX: { duration: 10, ease: "easeInOut" },
          scaleY: { duration: 12, ease: "easeInOut" },
          rotate: { duration: 18, ease: "easeInOut" },
          borderRadius: { duration: 11, ease: "easeInOut" },
        }}
      />

      {/* Floating accent orb 1 */}
      <motion.div
        className="absolute w-[250px] h-[250px] bg-primary/12 blur-[70px]"
        animate={{
          x: [0, 120, 60, -80, -40, 0],
          y: [0, -60, 80, 40, -30, 0],
          opacity: [0.2, 0.5, 0.3, 0.6, 0.4, 0.2],
          scale: [1, 1.2, 0.9, 1.1, 1],
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 50% 60% 40% 50%",
            "50% 50% 50% 50% / 50% 50% 50% 50%",
            "30% 70% 60% 40% / 60% 40% 50% 60%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "25%", left: "55%" }}
      />

      {/* Floating accent orb 2 */}
      <motion.div
        className="absolute w-[180px] h-[180px] bg-primary/10 blur-[60px]"
        animate={{
          x: [0, -100, -50, 70, 30, 0],
          y: [0, 70, -50, -30, 60, 0],
          opacity: [0.15, 0.4, 0.25, 0.5, 0.3, 0.15],
          scale: [1, 0.8, 1.15, 0.95, 1.1, 1],
          borderRadius: [
            "70% 30% 50% 50% / 30% 70% 50% 50%",
            "50% 50% 70% 30% / 50% 50% 30% 70%",
            "40% 60% 60% 40% / 60% 40% 40% 60%",
            "60% 40% 40% 60% / 40% 60% 60% 40%",
            "70% 30% 50% 50% / 30% 70% 50% 50%",
          ],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        initial={{ top: "55%", left: "25%" }}
      />

      {/* Bottom gradient */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 bg-linear-to-t to-transparent",
        intense ? "h-[450px] from-primary/12 via-primary/6" : "h-[400px] from-primary/10 via-primary/5"
      )} />
    </div>
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
            <OrbsBackground intense={isFullVariant} />
          </>
        )}
        {background === "orbs" && <OrbsBackground intense={isFullVariant} />}
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

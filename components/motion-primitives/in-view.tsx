"use client";

import { type ReactNode, useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type UseInViewOptions,
  type Variant,
  type Transition,
} from "motion/react";

interface InViewProps {
  children: ReactNode;
  className?: string;
  variants?: {
    hidden?: Variant;
    visible?: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  as?: "div" | "span" | "section" | "article" | "main" | "header" | "footer";
  /** Only animate once when entering viewport */
  once?: boolean;
  /** Trigger animation immediately on mount (for above-fold content) */
  triggerOnMount?: boolean;
}

const defaultVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

function keepContentVisible(variant: Variant | undefined): Variant | undefined {
  if (!variant || typeof variant !== "object") return variant;
  return { ...variant, opacity: 1, filter: "none" };
}

export function InView({
  children,
  className,
  variants = defaultVariants,
  transition = { duration: 0.5, ease: "easeOut" },
  viewOptions = { once: true, amount: 0.2 },
  as = "div",
  once = true,
  triggerOnMount = false,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewOptions);
  const prefersReducedMotion = useReducedMotion();
  const [isViewed, setIsViewed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Track hydration to prevent SSR/client mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Skip animations for reduced motion preference
  if (prefersReducedMotion) {
    const StaticComponent = as as React.ElementType;
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  // Before hydration, render visible to prevent flash of invisible content
  if (!isMounted) {
    const StaticComponent = as as React.ElementType;
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  const MotionComponent = motion.create(as);

  return (
    <MotionComponent
      ref={ref}
      initial={triggerOnMount || isInView ? false : "hidden"}
      animate={(isInView || isViewed || triggerOnMount) ? "visible" : "hidden"}
      onAnimationComplete={() => {
        if (once && isInView) setIsViewed(true);
      }}
      variants={{
        ...variants,
        hidden: keepContentVisible(variants.hidden),
      }}
      transition={transition}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

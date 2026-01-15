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
}

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({
  children,
  className,
  variants = defaultVariants,
  transition = { duration: 0.5, ease: "easeOut" },
  viewOptions = { once: true, amount: 0.2 },
  as = "div",
  once = true,
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

  // Fallback timer to ensure elements become visible even if intersection observer fails
  useEffect(() => {
    if (!isMounted || isViewed || prefersReducedMotion) return;

    const timer = setTimeout(() => {
      if (!isViewed) {
        setIsViewed(true);
      }
    }, 1500); // Fallback after 1.5 seconds

    return () => clearTimeout(timer);
  }, [isMounted, isViewed, prefersReducedMotion]);

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
      initial="hidden"
      animate={(isInView || isViewed) ? "visible" : "hidden"}
      onAnimationComplete={() => {
        if (once && isInView) setIsViewed(true);
      }}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

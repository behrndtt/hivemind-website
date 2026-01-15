'use client';
import { ReactNode, useRef, useState, useEffect, type JSX } from 'react';
import { motion, Variants, useInView, useReducedMotion, type UseInViewOptions } from 'motion/react';
import React from 'react';

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing';

export type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: React.ElementType;
  asChild?: React.ElementType;
  /** Trigger animation immediately on mount (for above-fold content) */
  triggerOnMount?: boolean;
  /** Only animate once when entering viewport */
  once?: boolean;
  /** Viewport margin for triggering animation earlier/later */
  margin?: UseInViewOptions['margin'];
  /** Amount of element that must be in view (0-1) */
  amount?: 'some' | 'all' | number;
};

const defaultContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<PresetType, Variants> = {
  fade: {},
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
  },
  blur: {
    hidden: { filter: 'blur(4px)' },
    visible: { filter: 'blur(0px)' },
  },
  'blur-slide': {
    hidden: { filter: 'blur(4px)', y: 20 },
    visible: { filter: 'blur(0px)', y: 0 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 300, damping: 8 },
    },
  },
};

const addDefaultVariants = (variants: Variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
});

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = 'div',
  asChild = 'div',
  triggerOnMount = false,
  once = true,
  margin = '0px',
  amount = 0.2,
}: AnimatedGroupProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin, amount });
  const prefersReducedMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Track hydration to prevent SSR/client mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fallback timer to ensure elements become visible even if intersection observer fails
  useEffect(() => {
    if (!isMounted || hasAnimated || prefersReducedMotion) return;

    const timer = setTimeout(() => {
      if (!hasAnimated) {
        setHasAnimated(true);
      }
    }, 1500); // Fallback after 1.5 seconds

    return () => clearTimeout(timer);
  }, [isMounted, hasAnimated, prefersReducedMotion]);

  const selectedVariants = {
    item: addDefaultVariants(preset ? presetVariants[preset] : {}),
    container: addDefaultVariants(defaultContainerVariants),
  };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  const MotionComponent = React.useMemo(() => {
    if (typeof as === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return motion.create(as as keyof JSX.IntrinsicElements) as any;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return motion.create(as) as any;
  }, [as]);

  const MotionChild = React.useMemo(() => {
    if (typeof asChild === 'string') {
      return motion.create(asChild as keyof JSX.IntrinsicElements);
    }
    return motion.create(asChild);
  }, [asChild]);

  // Skip animations for reduced motion preference
  if (prefersReducedMotion) {
    const StaticComponent = as as React.ElementType;
    const StaticChild = asChild as React.ElementType;
    return (
      <StaticComponent className={className}>
        {React.Children.map(children, (child, index) => (
          <StaticChild key={index}>{child}</StaticChild>
        ))}
      </StaticComponent>
    );
  }

  // Before hydration, render visible to prevent flash of invisible content
  if (!isMounted) {
    const StaticComponent = as as React.ElementType;
    const StaticChild = asChild as React.ElementType;
    return (
      <StaticComponent className={className}>
        {React.Children.map(children, (child, index) => (
          <StaticChild key={index}>{child}</StaticChild>
        ))}
      </StaticComponent>
    );
  }

  // Determine animation state
  const shouldAnimate = triggerOnMount || isInView || hasAnimated;

  return (
    <MotionComponent
      ref={ref as React.Ref<unknown>}
      initial='hidden'
      animate={shouldAnimate ? 'visible' : 'hidden'}
      onAnimationComplete={() => {
        if (once && (isInView || triggerOnMount)) setHasAnimated(true);
      }}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
}

export { AnimatedGroup };

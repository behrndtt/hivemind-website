"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { motion, useReducedMotion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonHover, buttonTap } from "@/lib/motion"

const MotionButton = motion.create("button")
const MotionSlot = motion.create(Slot)

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 hover:shadow-[0_0_24px_-6px_var(--color-primary)]",
        destructive:
          "bg-destructive text-foreground shadow-xs hover:bg-destructive/90 hover:shadow-[0_0_24px_-6px_var(--color-destructive)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-foreground/15 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:border-foreground/30 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs border border-border/60 hover:bg-secondary/80 hover:border-border",
        ghost:
          "bg-foreground/[0.04] text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-foreground/[0.06] dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-10 rounded-lg px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-lg px-8 has-[>svg]:px-4",
        icon: "size-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabled,
  ...props
}: Omit<
  React.ComponentProps<"button">,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const shouldReduceMotion = useReducedMotion()
  const Comp = asChild ? MotionSlot : MotionButton

  // Skip the hover/tap motion entirely for disabled buttons and when the user prefers reduced motion
  const motionProps =
    !disabled && !shouldReduceMotion
      ? { whileHover: buttonHover, whileTap: buttonTap }
      : {}

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      {...motionProps}
      {...props}
    />
  )
}

export { Button, buttonVariants }


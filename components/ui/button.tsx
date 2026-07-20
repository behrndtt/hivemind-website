"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 shrink-0 motion-reduce:transform-none",
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
  "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      {...props}
    />
  )
}

export { Button, buttonVariants }


import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "score"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-primary/15 text-primary": variant === "default",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "border border-border text-muted-foreground": variant === "outline",
          "font-semibold tabular-nums": variant === "score",
        },
        className
      )}
      {...props}
    />
  )
}

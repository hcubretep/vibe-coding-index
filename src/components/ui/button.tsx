import { cn } from "@/lib/utils"
import { forwardRef, type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20": variant === "default",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
            "border border-border bg-transparent hover:bg-muted text-foreground": variant === "outline",
            "hover:bg-muted text-foreground": variant === "ghost",
            "text-primary underline-offset-4 hover:underline": variant === "link",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

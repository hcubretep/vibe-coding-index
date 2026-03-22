import { cn, getScoreBg } from "@/lib/utils"

interface ScorePillProps {
  score: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ScorePill({ score, size = "md", className }: ScorePillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-bold tabular-nums",
        getScoreBg(score),
        {
          "text-xs px-1.5 py-0.5 min-w-[32px]": size === "sm",
          "text-sm px-2 py-0.5 min-w-[40px]": size === "md",
          "text-lg px-3 py-1 min-w-[48px]": size === "lg",
        },
        className
      )}
    >
      {score.toFixed(1)}
    </span>
  )
}

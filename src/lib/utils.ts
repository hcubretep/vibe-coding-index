import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getScoreColor(score: number): string {
  if (score >= 8) return "text-score-high"
  if (score >= 6) return "text-score-mid"
  return "text-score-low"
}

export function getScoreBg(score: number): string {
  if (score >= 8) return "bg-score-high/15 text-score-high"
  if (score >= 6) return "bg-score-mid/15 text-score-mid"
  return "bg-score-low/15 text-score-low"
}

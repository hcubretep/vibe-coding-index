import { Trophy, Smile, Code2, Rocket, Palette, GitBranch } from "lucide-react"
import { ScorePill } from "@/components/ui/score-pill"
import type { Tool } from "@/data/types"

interface KpiCardsProps {
  picks: {
    bestOverall: Tool & { weightedScore: number }
    bestForBeginners: Tool & { weightedScore: number }
    bestForDevelopers: Tool & { weightedScore: number }
    bestFullStack: Tool & { weightedScore: number }
    bestDesign: Tool & { weightedScore: number }
    bestOpenSource: Tool & { weightedScore: number }
  }
  onSelectTool: (id: string) => void
}

export function KpiCards({ picks, onSelectTool }: KpiCardsProps) {
  const cards = [
    { icon: Trophy, label: "Best Overall", tool: picks.bestOverall, color: "text-yellow-500" },
    { icon: Smile, label: "Best for Beginners", tool: picks.bestForBeginners, color: "text-green-500" },
    { icon: Code2, label: "Best for Developers", tool: picks.bestForDevelopers, color: "text-blue-500" },
    { icon: Rocket, label: "Best for Full-Stack", tool: picks.bestFullStack, color: "text-orange-500" },
    { icon: Palette, label: "Best for UI / Design", tool: picks.bestDesign, color: "text-pink-500" },
    { icon: GitBranch, label: "Best Open Source", tool: picks.bestOpenSource, color: "text-emerald-500" },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card) => (
        <button
          key={card.label}
          onClick={() => onSelectTool(card.tool.id)}
          className="group relative rounded-xl border border-border bg-card p-4 text-left transition-all duration-200 hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
        >
          <card.icon className={`h-4 w-4 ${card.color} mb-2`} />
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1.5">
            {card.label}
          </div>
          <div className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors truncate">
            {card.tool.name}
          </div>
          <ScorePill score={card.tool.weightedScore} size="sm" />
        </button>
      ))}
    </div>
  )
}

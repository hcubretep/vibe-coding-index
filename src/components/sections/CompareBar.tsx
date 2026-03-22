import { X, GitCompare } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Tool } from "@/data/types"

interface CompareBarProps {
  compareTools: (Tool & { weightedScore: number })[]
  compareIds: Set<string>
  toggleCompare: (id: string) => void
  onScrollToCharts: () => void
}

export function CompareBar({ compareTools, compareIds, toggleCompare, onScrollToCharts }: CompareBarProps) {
  if (compareTools.length === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/30 px-4 py-3 flex items-center gap-3">
      <GitCompare className="h-4 w-4 text-primary shrink-0" />
      <div className="flex items-center gap-2">
        {compareTools.map((t) => (
          <div key={t.id} className="flex items-center gap-1.5 bg-muted rounded-lg px-2.5 py-1">
            <span className="text-xs font-medium whitespace-nowrap">{t.name}</span>
            <button
              onClick={() => toggleCompare(t.id)}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <Button size="sm" onClick={onScrollToCharts}>
        Compare ({compareTools.length})
      </Button>
    </div>
  )
}

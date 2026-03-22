import { Pin, GitCompare, Check, X, TrendingUp } from "lucide-react"
import { ScorePill } from "@/components/ui/score-pill"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Tool } from "@/data/types"

interface CardGridProps {
  tools: (Tool & { weightedScore: number })[]
  onSelectTool: (id: string) => void
  compareIds: Set<string>
  toggleCompare: (id: string) => void
  pinnedIds: Set<string>
  togglePin: (id: string) => void
}

function BoolChip({ label, value }: { label: string; value: boolean }) {
  if (!value) return null
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-score-high bg-score-high/10 rounded-md px-1.5 py-0.5">
      <Check className="h-2.5 w-2.5" /> {label}
    </span>
  )
}

export function CardGrid({
  tools,
  onSelectTool,
  compareIds,
  toggleCompare,
  pinnedIds,
  togglePin,
}: CardGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-medium mb-1">No tools match your filters</p>
        <p className="text-sm">Try adjusting your search or clearing some filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool, index) => (
        <div
          key={tool.id}
          onClick={() => onSelectTool(tool.id)}
          className={cn(
            "group relative rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer",
            pinnedIds.has(tool.id) && "border-primary/30 bg-primary/5",
            compareIds.has(tool.id) && "ring-2 ring-primary/30"
          )}
        >
          {/* Rank badge */}
          <div className="absolute -top-2.5 -left-1 flex items-center gap-1">
            <span className="inline-flex items-center justify-center h-5 min-w-[20px] rounded-md bg-muted border border-border text-[10px] font-bold px-1.5">
              #{index + 1}
            </span>
            {index < 3 && <TrendingUp className="h-3 w-3 text-score-high" />}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => togglePin(tool.id)}
              className={cn(
                "p-1.5 rounded-lg transition-colors cursor-pointer",
                pinnedIds.has(tool.id) ? "text-primary bg-primary/10" : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted"
              )}
            >
              <Pin className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => toggleCompare(tool.id)}
              className={cn(
                "p-1.5 rounded-lg transition-colors cursor-pointer",
                compareIds.has(tool.id) ? "text-primary bg-primary/10" : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted"
              )}
            >
              <GitCompare className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Content */}
          <div className="mt-2">
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{tool.category}</p>
          </div>

          <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
            {tool.quickVerdict}
          </p>

          {/* Scores */}
          <div className="mt-4 flex items-center gap-2">
            <ScorePill score={tool.weightedScore} size="md" />
            <span className="text-[10px] text-muted-foreground">overall</span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
            <div>
              <span className="text-muted-foreground">Easy</span>
              <div className="font-medium mt-0.5">{tool.easeOfUse}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Speed</span>
              <div className="font-medium mt-0.5">{tool.speed}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Control</span>
              <div className="font-medium mt-0.5">{tool.control}</div>
            </div>
          </div>

          {/* Feature chips */}
          <div className="mt-3 flex flex-wrap gap-1">
            <BoolChip label="Deploy" value={tool.deploymentIncluded} />
            <BoolChip label="Backend" value={tool.backendSupport} />
            <BoolChip label="GitHub" value={tool.githubSupport} />
            <BoolChip label="OSS" value={tool.openSource} />
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-border/50">
            <span className="text-[10px] text-muted-foreground">{tool.pricingLabel}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

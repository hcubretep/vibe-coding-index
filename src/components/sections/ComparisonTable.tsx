import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Pin,
  GitCompare,
  Check,
  X,
  Cloud,
  Github,
  Server,
  Eye,
  Code2,
  Shield,
  TrendingUp,
} from "lucide-react"
import { ScorePill } from "@/components/ui/score-pill"
import { cn } from "@/lib/utils"
import type { Tool } from "@/data/types"
import type { SortField } from "@/hooks/use-dashboard"

interface ComparisonTableProps {
  tools: (Tool & { weightedScore: number })[]
  sortField: SortField
  sortAsc: boolean
  toggleSort: (field: SortField) => void
  onSelectTool: (id: string) => void
  compareIds: Set<string>
  toggleCompare: (id: string) => void
  pinnedIds: Set<string>
  togglePin: (id: string) => void
}

const scoreCols: { key: SortField; label: string; short: string }[] = [
  { key: "weightedScore", label: "Overall", short: "Score" },
  { key: "easeOfUse", label: "Ease of Use", short: "Easy" },
  { key: "speed", label: "Speed", short: "Speed" },
  { key: "control", label: "Control", short: "Ctrl" },
  { key: "productionReadiness", label: "Production", short: "Prod" },
  { key: "designQuality", label: "Design", short: "UI" },
]

function BoolIcon({ value }: { value: boolean }) {
  return value ? (
    <Check className="h-3.5 w-3.5 text-score-high" />
  ) : (
    <X className="h-3.5 w-3.5 text-muted-foreground/40" />
  )
}

function SortIcon({ field, sortField, sortAsc }: { field: SortField; sortField: SortField; sortAsc: boolean }) {
  if (field !== sortField) return <ArrowUpDown className="h-3 w-3 opacity-40" />
  return sortAsc ? <ArrowUp className="h-3 w-3 text-primary" /> : <ArrowDown className="h-3 w-3 text-primary" />
}

export function ComparisonTable({
  tools,
  sortField,
  sortAsc,
  toggleSort,
  onSelectTool,
  compareIds,
  toggleCompare,
  pinnedIds,
  togglePin,
}: ComparisonTableProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-medium mb-1">No tools match your filters</p>
        <p className="text-sm">Try adjusting your search or clearing some filters.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="sticky left-0 z-10 bg-muted/95 backdrop-blur-sm px-2 py-3 text-left w-8">
                <span className="text-xs text-muted-foreground">#</span>
              </th>
              <th className="sticky left-8 z-10 bg-muted/95 backdrop-blur-sm px-3 py-3 text-left min-w-[180px]">
                <span className="text-xs font-medium text-muted-foreground">Tool</span>
              </th>
              <th className="px-3 py-3 text-left min-w-[120px]">
                <span className="text-xs font-medium text-muted-foreground">Category</span>
              </th>
              <th className="px-3 py-3 text-left min-w-[140px]">
                <span className="text-xs font-medium text-muted-foreground">Best for</span>
              </th>
              {scoreCols.map((col) => (
                <th
                  key={col.key}
                  className="px-2 py-3 text-center min-w-[64px] cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort(col.key)}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xs font-medium text-muted-foreground">{col.short}</span>
                    <SortIcon field={col.key} sortField={sortField} sortAsc={sortAsc} />
                  </div>
                </th>
              ))}
              <th className="px-2 py-3 text-center" title="Deployment">
                <Cloud className="h-3.5 w-3.5 text-muted-foreground mx-auto" />
              </th>
              <th className="px-2 py-3 text-center" title="Backend">
                <Server className="h-3.5 w-3.5 text-muted-foreground mx-auto" />
              </th>
              <th className="px-2 py-3 text-center" title="GitHub">
                <Github className="h-3.5 w-3.5 text-muted-foreground mx-auto" />
              </th>
              <th className="px-2 py-3 text-center" title="Open Source">
                <Code2 className="h-3.5 w-3.5 text-muted-foreground mx-auto" />
              </th>
              <th className="px-3 py-3 text-left min-w-[100px]">
                <span className="text-xs font-medium text-muted-foreground">Price</span>
              </th>
              <th className="px-2 py-3 w-20">
                <span className="text-xs font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, index) => (
              <tr
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className={cn(
                  "border-b border-border/50 transition-colors cursor-pointer hover:bg-muted/30",
                  pinnedIds.has(tool.id) && "bg-primary/5",
                  compareIds.has(tool.id) && "bg-accent/5"
                )}
              >
                <td className="sticky left-0 z-10 bg-background px-2 py-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground font-mono w-5 text-center">
                      {index + 1}
                    </span>
                    {index < 3 && (
                      <TrendingUp className="h-3 w-3 text-score-high" />
                    )}
                  </div>
                </td>
                <td className="sticky left-8 z-10 bg-background px-3 py-3">
                  <div className="font-medium text-foreground">{tool.name}</div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-xs text-muted-foreground">{tool.category}</span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-xs text-muted-foreground line-clamp-1">{tool.bestFor}</span>
                </td>
                {scoreCols.map((col) => {
                  const val = col.key === "weightedScore" ? tool.weightedScore : (tool[col.key] as number)
                  return (
                    <td key={col.key} className="px-2 py-3 text-center">
                      <ScorePill score={val} size="sm" />
                    </td>
                  )
                })}
                <td className="px-2 py-3 text-center"><BoolIcon value={tool.deploymentIncluded} /></td>
                <td className="px-2 py-3 text-center"><BoolIcon value={tool.backendSupport} /></td>
                <td className="px-2 py-3 text-center"><BoolIcon value={tool.githubSupport} /></td>
                <td className="px-2 py-3 text-center"><BoolIcon value={tool.openSource} /></td>
                <td className="px-3 py-3">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{tool.pricingLabel}</span>
                </td>
                <td className="px-2 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => togglePin(tool.id)}
                      className={cn(
                        "p-1 rounded transition-colors cursor-pointer",
                        pinnedIds.has(tool.id) ? "text-primary" : "text-muted-foreground/40 hover:text-muted-foreground"
                      )}
                      title="Pin tool"
                    >
                      <Pin className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => toggleCompare(tool.id)}
                      className={cn(
                        "p-1 rounded transition-colors cursor-pointer",
                        compareIds.has(tool.id) ? "text-primary" : "text-muted-foreground/40 hover:text-muted-foreground"
                      )}
                      title="Compare tool"
                    >
                      <GitCompare className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

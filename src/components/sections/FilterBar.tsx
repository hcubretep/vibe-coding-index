import {
  Search,
  X,
  LayoutGrid,
  Table,
  RotateCcw,
  Rocket,
  Github,
  Server,
  Eye,
  Code2,
  Shield,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CATEGORIES, type Category } from "@/data/types"
import type { Filters, ViewMode } from "@/hooks/use-dashboard"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface FilterBarProps {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  hasActiveFilters: boolean
  clearFilters: () => void
  resetRankings: () => void
  totalCount: number
  filteredCount: number
}

const booleanFilters = [
  { key: "beginnerFriendly" as const, label: "Beginner Friendly", icon: Rocket },
  { key: "deploymentIncluded" as const, label: "Deploy Included", icon: Rocket },
  { key: "githubSupport" as const, label: "GitHub Export", icon: Github },
  { key: "backendSupport" as const, label: "Backend Support", icon: Server },
  { key: "visualEditing" as const, label: "Visual Editing", icon: Eye },
  { key: "openSource" as const, label: "Open Source", icon: Code2 },
  { key: "enterpriseReady" as const, label: "Enterprise", icon: Shield },
]

export function FilterBar({
  filters,
  setFilters,
  viewMode,
  setViewMode,
  hasActiveFilters,
  clearFilters,
  resetRankings,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)

  const toggleCategory = (cat: Category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }))
  }

  const toggleBoolFilter = (key: keyof Filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === true ? null : true,
    }))
  }

  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Top row: search + view toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full h-9 pl-9 pr-9 rounded-lg border border-border bg-muted/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            />
            {filters.search && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(showFilters && "bg-muted border-primary/40")}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </Button>

          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "p-2 transition-colors cursor-pointer",
                viewMode === "table" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Table className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 transition-colors cursor-pointer",
                viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

          <span className="text-xs text-muted-foreground hidden sm:inline whitespace-nowrap">
            {filteredCount} of {totalCount}
          </span>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-3.5 w-3.5" />
              Clear
            </Button>
          )}

          <Button variant="ghost" size="sm" onClick={resetRankings} className="hidden sm:inline-flex">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t border-border space-y-3">
            {/* Categories */}
            <div>
              <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                Categories
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer",
                      filters.categories.includes(cat)
                        ? "bg-primary/15 border-primary/40 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Boolean filters */}
            <div>
              <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                Features
              </div>
              <div className="flex flex-wrap gap-2">
                {booleanFilters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => toggleBoolFilter(f.key)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer",
                      filters[f.key] === true
                        ? "bg-primary/15 border-primary/40 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    )}
                  >
                    <f.icon className="h-3 w-3" />
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active filter badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-1.5">
                {filters.categories.map((cat) => (
                  <Badge key={cat} variant="default" className="gap-1 cursor-pointer" onClick={() => toggleCategory(cat)}>
                    {cat}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
                {booleanFilters
                  .filter((f) => filters[f.key] === true)
                  .map((f) => (
                    <Badge key={f.key} variant="default" className="gap-1 cursor-pointer" onClick={() => toggleBoolFilter(f.key)}>
                      {f.label}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

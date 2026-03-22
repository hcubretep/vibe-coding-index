import { useState, useMemo, useCallback } from "react"
import { tools } from "@/data/tools"
import {
  type Tool,
  type Category,
  type ScoreDimension,
  type WeightPreset,
  WEIGHT_PRESETS,
  computeWeightedScore,
} from "@/data/types"

export type SortField = "weightedScore" | ScoreDimension
export type ViewMode = "table" | "grid"

export interface Filters {
  search: string
  categories: Category[]
  beginnerFriendly: boolean | null
  deploymentIncluded: boolean | null
  githubSupport: boolean | null
  backendSupport: boolean | null
  visualEditing: boolean | null
  openSource: boolean | null
  enterpriseReady: boolean | null
}

const defaultFilters: Filters = {
  search: "",
  categories: [],
  beginnerFriendly: null,
  deploymentIncluded: null,
  githubSupport: null,
  backendSupport: null,
  visualEditing: null,
  openSource: null,
  enterpriseReady: null,
}

export function useDashboard() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [sortField, setSortField] = useState<SortField>("weightedScore")
  const [sortAsc, setSortAsc] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("table")
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null)
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set())
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set())
  const [weightPresetKey, setWeightPresetKey] = useState("default")
  const [customWeights, setCustomWeights] = useState<WeightPreset>(WEIGHT_PRESETS.default)

  const weights = weightPresetKey === "custom" ? customWeights : WEIGHT_PRESETS[weightPresetKey]

  const applyPreset = useCallback((key: string) => {
    setWeightPresetKey(key)
    if (key !== "custom" && WEIGHT_PRESETS[key]) {
      setCustomWeights(WEIGHT_PRESETS[key])
    }
  }, [])

  const toolsWithScores = useMemo(() => {
    return tools.map((t) => ({
      ...t,
      weightedScore: computeWeightedScore(t, weights),
    }))
  }, [weights])

  const filteredTools = useMemo(() => {
    let result = toolsWithScores

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.bestFor.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    if (filters.categories.length > 0) {
      result = result.filter((t) => filters.categories.includes(t.category))
    }

    const boolFilters: (keyof Filters)[] = [
      "beginnerFriendly",
      "deploymentIncluded",
      "githubSupport",
      "backendSupport",
      "visualEditing",
      "openSource",
      "enterpriseReady",
    ]
    for (const key of boolFilters) {
      if (filters[key] === true) {
        result = result.filter((t) => t[key as keyof Tool] === true)
      }
    }

    return result
  }, [toolsWithScores, filters])

  const sortedTools = useMemo(() => {
    const sorted = [...filteredTools].sort((a, b) => {
      const field = sortField === "weightedScore" ? "weightedScore" : sortField
      const aVal = field === "weightedScore" ? a.weightedScore : (a[field] as number)
      const bVal = field === "weightedScore" ? b.weightedScore : (b[field] as number)
      return sortAsc ? aVal - bVal : bVal - aVal
    })

    // Pinned tools at top
    const pinned = sorted.filter((t) => pinnedIds.has(t.id))
    const unpinned = sorted.filter((t) => !pinnedIds.has(t.id))
    return [...pinned, ...unpinned]
  }, [filteredTools, sortField, sortAsc, pinnedIds])

  const toggleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortAsc(!sortAsc)
      } else {
        setSortField(field)
        setSortAsc(false)
      }
    },
    [sortField, sortAsc]
  )

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < 4) {
        next.add(id)
      }
      return next
    })
  }, [])

  const togglePin = useCallback((id: string) => {
    setPinnedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  const resetRankings = useCallback(() => {
    setFilters(defaultFilters)
    setSortField("weightedScore")
    setSortAsc(false)
    setWeightPresetKey("default")
    setCustomWeights(WEIGHT_PRESETS.default)
  }, [])

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== "" ||
      filters.categories.length > 0 ||
      filters.beginnerFriendly !== null ||
      filters.deploymentIncluded !== null ||
      filters.githubSupport !== null ||
      filters.backendSupport !== null ||
      filters.visualEditing !== null ||
      filters.openSource !== null ||
      filters.enterpriseReady !== null
    )
  }, [filters])

  const selectedTool = useMemo(
    () => toolsWithScores.find((t) => t.id === selectedToolId) || null,
    [toolsWithScores, selectedToolId]
  )

  const compareTools = useMemo(
    () => toolsWithScores.filter((t) => compareIds.has(t.id)),
    [toolsWithScores, compareIds]
  )

  // KPI picks
  const kpiPicks = useMemo(() => {
    const byWeighted = [...toolsWithScores].sort((a, b) => b.weightedScore - a.weightedScore)
    const byEase = [...toolsWithScores].sort((a, b) => b.easeOfUse - a.easeOfUse)
    const byControl = [...toolsWithScores].sort((a, b) => b.control - a.control)
    const byFullStack = [...toolsWithScores].sort((a, b) => b.fullStackCapability - a.fullStackCapability)
    const byDesign = [...toolsWithScores].sort((a, b) => b.designQuality - a.designQuality)
    const osTools = toolsWithScores.filter((t) => t.openSource).sort((a, b) => b.weightedScore - a.weightedScore)

    return {
      bestOverall: byWeighted[0],
      bestForBeginners: byEase[0],
      bestForDevelopers: byControl[0],
      bestFullStack: byFullStack[0],
      bestDesign: byDesign[0],
      bestOpenSource: osTools[0],
    }
  }, [toolsWithScores])

  return {
    tools: sortedTools,
    allTools: toolsWithScores,
    filters,
    setFilters,
    sortField,
    sortAsc,
    toggleSort,
    viewMode,
    setViewMode,
    selectedTool,
    setSelectedToolId,
    compareIds,
    compareTools,
    toggleCompare,
    pinnedIds,
    togglePin,
    clearFilters,
    resetRankings,
    hasActiveFilters,
    weights,
    weightPresetKey,
    applyPreset,
    customWeights,
    setCustomWeights,
    kpiPicks,
  }
}

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  Legend,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Tool, Category } from "@/data/types"
import { CATEGORIES } from "@/data/types"

interface ChartsProps {
  allTools: (Tool & { weightedScore: number })[]
  compareTools: (Tool & { weightedScore: number })[]
  compareIds: Set<string>
  toggleCompare: (id: string) => void
}

const CHART_COLORS = ["#6d5ff5", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#ec4899"]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl text-sm">
      <p className="font-medium">{label || payload[0]?.payload?.name}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-muted-foreground text-xs mt-0.5">
          {p.name || "Score"}: <span className="font-medium text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export function Charts({ allTools, compareTools, compareIds, toggleCompare }: ChartsProps) {
  const [activeChart, setActiveChart] = useState<"bar" | "radar" | "scatter" | "category">("bar")

  // Top 10 for bar chart
  const top10 = [...allTools].sort((a, b) => b.weightedScore - a.weightedScore).slice(0, 10)

  // Radar data
  const radarDimensions = [
    { key: "easeOfUse", label: "Ease of Use" },
    { key: "speed", label: "Speed" },
    { key: "control", label: "Control" },
    { key: "productionReadiness", label: "Production" },
    { key: "designQuality", label: "Design" },
    { key: "fullStackCapability", label: "Full-Stack" },
  ]

  const radarData = radarDimensions.map((dim) => {
    const point: any = { dimension: dim.label }
    compareTools.forEach((t) => {
      point[t.name] = t[dim.key as keyof Tool]
    })
    return point
  })

  // Category distribution
  const categoryData = CATEGORIES.map((cat) => ({
    name: cat.replace(" / ", "/"),
    count: allTools.filter((t) => t.category === cat).length,
    avgScore: +(
      allTools
        .filter((t) => t.category === cat)
        .reduce((sum, t) => sum + t.weightedScore, 0) /
        Math.max(1, allTools.filter((t) => t.category === cat).length)
    ).toFixed(1),
  })).filter((d) => d.count > 0)

  // Scatter data
  const scatterData = allTools.map((t) => ({
    name: t.name,
    x: t.easeOfUse,
    y: t.control,
    z: t.productionReadiness * 5,
    category: t.category,
  }))

  const tabs = [
    { key: "bar" as const, label: "Top 10" },
    { key: "radar" as const, label: "Radar Compare" },
    { key: "scatter" as const, label: "Ease vs Control" },
    { key: "category" as const, label: "Categories" },
  ]

  return (
    <section id="charts" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-1">Visual Insights</h2>
        <p className="text-sm text-muted-foreground mb-6">Interactive charts to explore the data.</p>

        {/* Chart tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveChart(tab.key)}
              className={cn(
                "px-4 py-2 text-sm rounded-lg border transition-all cursor-pointer",
                activeChart === tab.key
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tool selector for radar */}
        {activeChart === "radar" && (
          <div className="mb-6">
            <p className="text-xs text-muted-foreground mb-2">Select up to 4 tools to compare:</p>
            <div className="flex flex-wrap gap-2">
              {allTools.sort((a, b) => b.weightedScore - a.weightedScore).map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => toggleCompare(t.id)}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded-lg border transition-all cursor-pointer",
                    compareIds.has(t.id)
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="rounded-2xl border border-border bg-card/50 p-4 sm:p-6">
          {activeChart === "bar" && (
            <div>
              <h3 className="text-sm font-medium mb-4">Top 10 Tools by Overall Score</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={top10} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis type="number" domain={[0, 10]} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="weightedScore" name="Overall Score" radius={[0, 6, 6, 0]}>
                    {top10.map((_, index) => (
                      <Cell key={index} fill={index < 3 ? "#6d5ff5" : "#3f3f96"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeChart === "radar" && (
            <div>
              <h3 className="text-sm font-medium mb-4">
                Radar Comparison
                {compareTools.length === 0 && (
                  <span className="text-muted-foreground font-normal ml-2">— select tools above</span>
                )}
              </h3>
              {compareTools.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#27272a" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 10]} tick={{ fill: "#a1a1aa", fontSize: 10 }} />
                    {compareTools.map((t, i) => (
                      <Radar
                        key={t.id}
                        name={t.name}
                        dataKey={t.name}
                        stroke={CHART_COLORS[i]}
                        fill={CHART_COLORS[i]}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    ))}
                    <Legend
                      wrapperStyle={{ fontSize: 12, color: "#a1a1aa" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-muted-foreground text-sm">
                  Select 2-4 tools above to see a radar comparison
                </div>
              )}
            </div>
          )}

          {activeChart === "scatter" && (
            <div>
              <h3 className="text-sm font-medium mb-1">Ease of Use vs Control</h3>
              <p className="text-xs text-muted-foreground mb-4">Bubble size = production readiness</p>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ bottom: 20, left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Ease of Use"
                    domain={[3, 10]}
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    label={{ value: "Ease of Use", position: "bottom", fill: "#a1a1aa", fontSize: 12 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Control"
                    domain={[3, 10]}
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    label={{ value: "Control", angle: -90, position: "insideLeft", fill: "#a1a1aa", fontSize: 12 }}
                  />
                  <ZAxis type="number" dataKey="z" range={[60, 400]} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const d = payload[0].payload
                      return (
                        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl text-sm">
                          <p className="font-medium">{d.name}</p>
                          <p className="text-xs text-muted-foreground">{d.category}</p>
                          <p className="text-xs mt-1">Ease: {d.x} / Control: {d.y}</p>
                        </div>
                      )
                    }}
                  />
                  <Scatter data={scatterData}>
                    {scatterData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={CHART_COLORS[CATEGORIES.indexOf(entry.category as Category) % CHART_COLORS.length]}
                        fillOpacity={0.7}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeChart === "category" && (
            <div>
              <h3 className="text-sm font-medium mb-4">Category Distribution & Average Scores</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData} margin={{ bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#a1a1aa", fontSize: 10 }}
                    angle={-30}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Tools" fill="#3f3f96" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="avgScore" name="Avg Score" fill="#6d5ff5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

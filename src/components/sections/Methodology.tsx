import { SCORE_DIMENSIONS, WEIGHT_PRESETS, type WeightPreset } from "@/data/types"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MethodologyProps {
  weights: WeightPreset
  weightPresetKey: string
  applyPreset: (key: string) => void
  customWeights: WeightPreset
  setCustomWeights: React.Dispatch<React.SetStateAction<WeightPreset>>
}

export function Methodology({
  weights,
  weightPresetKey,
  applyPreset,
  customWeights,
  setCustomWeights,
}: MethodologyProps) {
  const presets = [
    { key: "default", label: "Balanced" },
    { key: "founder", label: "Founder Mode" },
    { key: "developer", label: "Developer Mode" },
    { key: "designer", label: "Design Mode" },
  ]

  const updateWeight = (key: string, value: number) => {
    setCustomWeights((prev) => ({ ...prev, [key]: value }))
    if (weightPresetKey !== "custom") {
      applyPreset("custom")
    }
  }

  return (
    <section id="methodology" className="py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-1">Methodology</h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          Each tool is scored across 8 dimensions. The overall score is a weighted average based on the active
          weighting preset. Adjust the weights below to see how rankings change.
        </p>

        {/* Preset selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {presets.map((p) => (
            <button
              key={p.key}
              onClick={() => applyPreset(p.key)}
              className={cn(
                "px-4 py-2 text-sm rounded-xl border transition-all cursor-pointer",
                weightPresetKey === p.key
                  ? "bg-primary/15 border-primary/40 text-primary font-medium"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              )}
            >
              {p.label}
            </button>
          ))}
          {weightPresetKey === "custom" && (
            <span className="px-4 py-2 text-sm rounded-xl bg-muted text-muted-foreground border border-border">
              Custom
            </span>
          )}
        </div>

        {/* Weight sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 max-w-4xl">
          {SCORE_DIMENSIONS.map((dim) => {
            const currentWeight = weights[dim.key as keyof WeightPreset] as number
            return (
              <div key={dim.key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{dim.label}</span>
                  <span className="text-xs text-muted-foreground tabular-nums font-medium">
                    {(currentWeight * 100).toFixed(0)}%
                  </span>
                </div>
                <Slider
                  value={[currentWeight * 100]}
                  min={0}
                  max={50}
                  step={5}
                  onValueChange={([v]) => updateWeight(dim.key, v / 100)}
                />
                {/* Visual weight bar */}
                <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/60 transition-all duration-300"
                    style={{ width: `${currentWeight * 200}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Weight total */}
        {(() => {
          const total = SCORE_DIMENSIONS.reduce(
            (sum, dim) => sum + (weights[dim.key as keyof WeightPreset] as number),
            0
          )
          const isValid = Math.abs(total - 1) < 0.01
          return (
            <div className="mt-6 flex items-center gap-3">
              <span className={cn("text-sm font-medium", isValid ? "text-score-high" : "text-score-mid")}>
                Total: {(total * 100).toFixed(0)}%
              </span>
              {!isValid && (
                <span className="text-xs text-score-mid">
                  Weights should sum to 100% for accurate scoring
                </span>
              )}
              {weightPresetKey === "custom" && (
                <Button variant="ghost" size="sm" onClick={() => applyPreset("default")}>
                  Reset to default
                </Button>
              )}
            </div>
          )
        })()}

        {/* Scoring explanation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="rounded-xl border border-border bg-card/50 p-5">
            <h3 className="font-medium mb-3">How we score</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Each tool is evaluated on a 1-10 scale across 8 dimensions</li>
              <li>Scores are based on hands-on testing, documentation review, and community feedback</li>
              <li>The overall score is a weighted average of all dimensions</li>
              <li>Weights can be adjusted to match your priorities</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-5">
            <h3 className="font-medium mb-3">What the scores mean</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-10 text-right font-bold text-score-high">8-10</span>
                <span className="text-muted-foreground">Excellent — best-in-class for this dimension</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 text-right font-bold text-score-mid">6-7.9</span>
                <span className="text-muted-foreground">Good — solid performance, minor gaps</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 text-right font-bold text-score-low">1-5.9</span>
                <span className="text-muted-foreground">Limited — not a strength for this tool</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

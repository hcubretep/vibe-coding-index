import {
  ExternalLink,
  Check,
  X,
  Copy,
  Cloud,
  Github,
  Server,
  Eye,
  Code2,
  Shield,
  Smile,
} from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScorePill } from "@/components/ui/score-pill"
import type { Tool } from "@/data/types"
import { SCORE_DIMENSIONS } from "@/data/types"
import { useState } from "react"

interface ToolDrawerProps {
  tool: (Tool & { weightedScore: number }) | null
  open: boolean
  onClose: () => void
}

function FeatureRow({ label, value, icon: Icon }: { label: string; value: boolean; icon: React.ElementType }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      {value ? (
        <Check className="h-4 w-4 text-score-high" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground/30" />
      )}
    </div>
  )
}

export function ToolDrawer({ tool, open, onClose }: ToolDrawerProps) {
  const [copied, setCopied] = useState(false)

  if (!tool) return null

  const copySummary = () => {
    const text = `${tool.name} — ${tool.shortSummary}\n\nBest for: ${tool.bestFor}\nOverall score: ${tool.weightedScore}/10\nVerdict: ${tool.quickVerdict}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const features = [
    { label: "Deployment included", value: tool.deploymentIncluded, icon: Cloud },
    { label: "Backend support", value: tool.backendSupport, icon: Server },
    { label: "GitHub export/sync", value: tool.githubSupport, icon: Github },
    { label: "Visual editing", value: tool.visualEditing, icon: Eye },
    { label: "Open source", value: tool.openSource, icon: Code2 },
    { label: "Enterprise ready", value: tool.enterpriseReady, icon: Shield },
    { label: "Beginner friendly", value: tool.beginnerFriendly, icon: Smile },
  ]

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent side="right" className="p-0">
        <DialogTitle className="sr-only">{tool.name}</DialogTitle>
        <div className="p-6 pb-0">
          {/* Header */}
          <div className="flex items-start justify-between pr-8">
            <div>
              <h2 className="text-xl font-bold">{tool.name}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{tool.category}</p>
            </div>
            <ScorePill score={tool.weightedScore} size="lg" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tool.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Summary</h3>
            <p className="text-sm leading-relaxed">{tool.shortSummary}</p>
          </div>

          {/* Best for */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Best for</h3>
            <p className="text-sm">{tool.bestFor}</p>
          </div>

          {/* Score breakdown */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Score Breakdown</h3>
            <div className="space-y-2.5">
              {SCORE_DIMENSIONS.map((dim) => {
                const val = tool[dim.key] as number
                return (
                  <div key={dim.key} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-28 shrink-0">{dim.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${val * 10}%` }}
                      />
                    </div>
                    <ScorePill score={val} size="sm" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Strengths</h3>
            <ul className="space-y-1.5">
              {tool.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-3.5 w-3.5 text-score-high mt-0.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Tradeoffs */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Trade-offs</h3>
            <ul className="space-y-1.5">
              {tool.tradeoffs.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-score-mid mt-0.5 shrink-0">~</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Feature checklist */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Features</h3>
            <div className="rounded-lg border border-border divide-y divide-border/50">
              <div className="px-3">
                {features.map((f) => (
                  <FeatureRow key={f.label} {...f} />
                ))}
              </div>
            </div>
          </div>

          {/* Why choose / Watch out */}
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-xl bg-score-high/5 border border-score-high/20 p-4">
              <h4 className="text-xs font-medium text-score-high mb-1.5">Why choose this</h4>
              <p className="text-sm">{tool.whyChoose}</p>
            </div>
            <div className="rounded-xl bg-score-mid/5 border border-score-mid/20 p-4">
              <h4 className="text-xs font-medium text-score-mid mb-1.5">Watch out for</h4>
              <p className="text-sm">{tool.watchOutFor}</p>
            </div>
          </div>

          {/* Ideal user */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Ideal user</h3>
            <p className="text-sm">{tool.idealUser}</p>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Pricing</h3>
            <p className="text-sm font-medium">{tool.pricingLabel}</p>
          </div>

          {/* Quick verdict */}
          <div className="rounded-xl bg-muted/50 border border-border p-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Quick verdict</h3>
            <p className="text-sm italic">"{tool.quickVerdict}"</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 pb-4">
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Visit website
            </a>
            <Button size="sm" variant="outline" onClick={copySummary}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy summary"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

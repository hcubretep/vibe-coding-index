import { Lightbulb, Zap, Palette, Code2, Wrench, Building2 } from "lucide-react"
import { ScorePill } from "@/components/ui/score-pill"
import type { Tool } from "@/data/types"

interface TopPicksProps {
  allTools: (Tool & { weightedScore: number })[]
  onSelectTool: (id: string) => void
}

export function TopPicks({ allTools, onSelectTool }: TopPicksProps) {
  const find = (id: string) => allTools.find((t) => t.id === id)!

  const picks = [
    {
      icon: Lightbulb,
      title: "Best for non-technical founders",
      tool: find("lovable"),
      reason: "Lovable gets you from idea to deployed app faster than anything else. No code knowledge needed — just describe what you want and iterate from there. Built-in Supabase backend means you get auth, database, and storage without wiring anything up.",
      color: "text-yellow-500",
    },
    {
      icon: Zap,
      title: "Best for rapid prototypes",
      tool: find("bolt-new"),
      reason: "Bolt.new runs entirely in your browser with zero setup. Describe an app, watch it appear, iterate live. The WebContainer magic means you get a full Node.js environment without leaving your browser tab.",
      color: "text-orange-500",
    },
    {
      icon: Palette,
      title: "Best for frontend / UI work",
      tool: find("v0"),
      reason: "v0 generates the most beautiful UI of any AI tool. It outputs clean React + Tailwind + shadcn components that look production-ready. Perfect for designers and frontend devs who want pixel-perfect results fast.",
      color: "text-pink-500",
    },
    {
      icon: Code2,
      title: "Best for code-heavy workflows",
      tool: find("cursor"),
      reason: "Cursor is the gold standard AI IDE for professional developers. Codebase-aware completions, multi-file Composer edits, and a familiar VS Code interface. It amplifies your skills instead of replacing your judgment.",
      color: "text-blue-500",
    },
    {
      icon: Wrench,
      title: "Best for open-source tinkerers",
      tool: find("aider"),
      reason: "Aider is the best open-source CLI coding tool. It integrates beautifully with git, works with any LLM provider, and gives you maximum control. No vendor lock-in, no surprise bills, just a sharp tool for sharp developers.",
      color: "text-emerald-500",
    },
    {
      icon: Building2,
      title: "Best for enterprise teams",
      tool: find("claude-code"),
      reason: "Claude Code handles complex, real-world codebases better than anything else. It reasons through architectural decisions, executes multi-file refactors accurately, and scales to large monorepos. Ideal for teams that need precision on hard problems.",
      color: "text-purple-500",
    },
  ]

  return (
    <section id="top-picks" className="py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-1">Top Picks</h2>
        <p className="text-sm text-muted-foreground mb-8">
          Our editorial recommendations for different use cases.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {picks.map((pick) => (
            <div
              key={pick.title}
              onClick={() => onSelectTool(pick.tool.id)}
              className="group rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <pick.icon className={`h-4 w-4 ${pick.color}`} />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {pick.title}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {pick.tool.name}
                </h3>
                <ScorePill score={pick.tool.weightedScore} size="sm" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {pick.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

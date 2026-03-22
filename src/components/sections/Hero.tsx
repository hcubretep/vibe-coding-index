import { BarChart3, Filter, ArrowUpDown, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { icon: BarChart3, label: "tools compared", value: "20" },
  { icon: Layers, label: "scoring dimensions", value: "6" },
  { icon: Filter, label: "categories", value: "5" },
  { icon: ArrowUpDown, label: "sortable + filterable", value: "" },
]

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground mb-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-score-high animate-pulse" />
            Updated March 2026
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            The top vibe coding tools,{" "}
            <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
              compared.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            Explore 20 leading AI coding tools across speed, ease of use, control, design quality,
            deployment, and production readiness.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Button size="lg" onClick={() => scrollTo("dashboard")}>
              Explore dashboard
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("methodology")}>
              See methodology
            </Button>
          </div>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm px-4 py-3"
            >
              <stat.icon className="h-4 w-4 text-primary shrink-0" />
              <div className="text-left">
                {stat.value && (
                  <div className="text-lg font-bold leading-none">{stat.value}</div>
                )}
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

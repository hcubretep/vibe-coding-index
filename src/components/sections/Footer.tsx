import { Zap } from "lucide-react"

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo / name */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-bold text-sm">Vibe Coding Index</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              Rankings are directional and based on our current scoring framework. Individual results may vary
              depending on use case, team size, and project complexity.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            <button
              onClick={() => scrollTo("dashboard")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => scrollTo("methodology")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Methodology
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Vibe Coding Index. Built for the community.
          </p>
        </div>
      </div>
    </footer>
  )
}

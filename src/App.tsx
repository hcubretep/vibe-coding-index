import { Hero } from "@/components/sections/Hero"
import { KpiCards } from "@/components/sections/KpiCards"
import { FilterBar } from "@/components/sections/FilterBar"
import { ComparisonTable } from "@/components/sections/ComparisonTable"
import { CardGrid } from "@/components/sections/CardGrid"
import { ToolDrawer } from "@/components/sections/ToolDrawer"
import { Charts } from "@/components/sections/Charts"
import { TopPicks } from "@/components/sections/TopPicks"
import { Methodology } from "@/components/sections/Methodology"
import { Faq } from "@/components/sections/Faq"
import { Footer } from "@/components/sections/Footer"
import { CompareBar } from "@/components/sections/CompareBar"
import { useDashboard } from "@/hooks/use-dashboard"

function App() {
  const dashboard = useDashboard()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />

      <main id="dashboard" className="scroll-mt-16">
        {/* KPI Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <KpiCards picks={dashboard.kpiPicks} onSelectTool={dashboard.setSelectedToolId} />
        </section>

        {/* Filter Bar */}
        <FilterBar
          filters={dashboard.filters}
          setFilters={dashboard.setFilters}
          viewMode={dashboard.viewMode}
          setViewMode={dashboard.setViewMode}
          hasActiveFilters={dashboard.hasActiveFilters}
          clearFilters={dashboard.clearFilters}
          resetRankings={dashboard.resetRankings}
          totalCount={dashboard.allTools.length}
          filteredCount={dashboard.tools.length}
        />

        {/* Main content */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {dashboard.viewMode === "table" ? (
            <ComparisonTable
              tools={dashboard.tools}
              sortField={dashboard.sortField}
              sortAsc={dashboard.sortAsc}
              toggleSort={dashboard.toggleSort}
              onSelectTool={dashboard.setSelectedToolId}
              compareIds={dashboard.compareIds}
              toggleCompare={dashboard.toggleCompare}
              pinnedIds={dashboard.pinnedIds}
              togglePin={dashboard.togglePin}
            />
          ) : (
            <CardGrid
              tools={dashboard.tools}
              onSelectTool={dashboard.setSelectedToolId}
              compareIds={dashboard.compareIds}
              toggleCompare={dashboard.toggleCompare}
              pinnedIds={dashboard.pinnedIds}
              togglePin={dashboard.togglePin}
            />
          )}
        </section>

        {/* Charts */}
        <Charts
          allTools={dashboard.allTools}
          compareTools={dashboard.compareTools}
          compareIds={dashboard.compareIds}
          toggleCompare={dashboard.toggleCompare}
        />
      </main>

      {/* Top Picks */}
      <TopPicks allTools={dashboard.allTools} onSelectTool={dashboard.setSelectedToolId} />

      {/* Methodology */}
      <Methodology
        weights={dashboard.weights}
        weightPresetKey={dashboard.weightPresetKey}
        applyPreset={dashboard.applyPreset}
        customWeights={dashboard.customWeights}
        setCustomWeights={dashboard.setCustomWeights}
      />

      {/* FAQ */}
      <Faq />

      {/* Footer */}
      <Footer />

      {/* Tool detail drawer */}
      <ToolDrawer
        tool={dashboard.selectedTool}
        open={!!dashboard.selectedTool}
        onClose={() => dashboard.setSelectedToolId(null)}
      />

      {/* Compare floating bar */}
      <CompareBar
        compareTools={dashboard.compareTools}
        compareIds={dashboard.compareIds}
        toggleCompare={dashboard.toggleCompare}
        onScrollToCharts={() => document.getElementById("charts")?.scrollIntoView({ behavior: "smooth" })}
      />
    </div>
  )
}

export default App

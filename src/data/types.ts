export type Category =
  | "Full-Stack App Builder"
  | "AI IDE"
  | "Frontend / UI Generator"
  | "Coding Assistant"
  | "Autonomous Agent"
  | "Open Source / DIY"

export interface Tool {
  id: string
  name: string
  website: string
  category: Category
  shortSummary: string
  bestFor: string
  strengths: string[]
  tradeoffs: string[]
  tags: string[]
  pricingLabel: string
  beginnerFriendly: boolean
  deploymentIncluded: boolean
  backendSupport: boolean
  githubSupport: boolean
  visualEditing: boolean
  openSource: boolean
  enterpriseReady: boolean
  overallScore: number
  easeOfUse: number
  speed: number
  control: number
  productionReadiness: number
  fullStackCapability: number
  designQuality: number
  collaborationFit: number
  valueForMoney: number
  quickVerdict: string
  idealUser: string
  whyChoose: string
  watchOutFor: string
}

export interface WeightPreset {
  name: string
  easeOfUse: number
  speed: number
  control: number
  productionReadiness: number
  fullStackCapability: number
  designQuality: number
  collaborationFit: number
  valueForMoney: number
}

export const SCORE_DIMENSIONS = [
  { key: "easeOfUse" as const, label: "Ease of Use", weight: 0.2 },
  { key: "speed" as const, label: "Speed", weight: 0.2 },
  { key: "control" as const, label: "Control", weight: 0.15 },
  { key: "productionReadiness" as const, label: "Production Readiness", weight: 0.15 },
  { key: "fullStackCapability" as const, label: "Full-Stack", weight: 0.1 },
  { key: "designQuality" as const, label: "Design Quality", weight: 0.1 },
  { key: "collaborationFit" as const, label: "Collaboration", weight: 0.05 },
  { key: "valueForMoney" as const, label: "Value", weight: 0.05 },
] as const

export type ScoreDimension = (typeof SCORE_DIMENSIONS)[number]["key"]

export const CATEGORIES: Category[] = [
  "Full-Stack App Builder",
  "AI IDE",
  "Frontend / UI Generator",
  "Coding Assistant",
  "Autonomous Agent",
  "Open Source / DIY",
]

export const WEIGHT_PRESETS: Record<string, WeightPreset> = {
  default: {
    name: "Balanced",
    easeOfUse: 0.2,
    speed: 0.2,
    control: 0.15,
    productionReadiness: 0.15,
    fullStackCapability: 0.1,
    designQuality: 0.1,
    collaborationFit: 0.05,
    valueForMoney: 0.05,
  },
  founder: {
    name: "Founder Mode",
    easeOfUse: 0.25,
    speed: 0.25,
    control: 0.05,
    productionReadiness: 0.15,
    fullStackCapability: 0.15,
    designQuality: 0.1,
    collaborationFit: 0.0,
    valueForMoney: 0.05,
  },
  developer: {
    name: "Developer Mode",
    easeOfUse: 0.05,
    speed: 0.15,
    control: 0.3,
    productionReadiness: 0.2,
    fullStackCapability: 0.1,
    designQuality: 0.05,
    collaborationFit: 0.1,
    valueForMoney: 0.05,
  },
  designer: {
    name: "Design Mode",
    easeOfUse: 0.2,
    speed: 0.15,
    control: 0.05,
    productionReadiness: 0.1,
    fullStackCapability: 0.05,
    designQuality: 0.35,
    collaborationFit: 0.05,
    valueForMoney: 0.05,
  },
}

export function computeWeightedScore(tool: Tool, weights: WeightPreset): number {
  return +(
    tool.easeOfUse * weights.easeOfUse +
    tool.speed * weights.speed +
    tool.control * weights.control +
    tool.productionReadiness * weights.productionReadiness +
    tool.fullStackCapability * weights.fullStackCapability +
    tool.designQuality * weights.designQuality +
    tool.collaborationFit * weights.collaborationFit +
    tool.valueForMoney * weights.valueForMoney
  ).toFixed(1)
}

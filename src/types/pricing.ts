export interface ModelPricing {
  id: string
  name: string
  provider: string
  providerColor: string
  inputPrice: number
  outputPrice: number
  cacheHitPrice?: number
  cacheMissPrice?: number
  contextWindow: number
  features: string[]
  description: string
}

export interface CalculatorInput {
  dailyInputTokens: number
  dailyOutputTokens: number
  cacheHitRatio: number
  daysPerMonth: number
}

export interface CalculatedCost {
  modelId: string
  modelName: string
  provider: string
  providerColor: string
  monthlyCost: number
  yearlyCost: number
  inputCost: number
  outputCost: number
  cacheSavings?: number
}

export type TokenUnit = 'K' | 'M' | 'B'

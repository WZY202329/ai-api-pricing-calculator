import { ModelPricing, CalculatorInput, CalculatedCost } from '../types/pricing'

export function calculateCost(model: ModelPricing, input: CalculatorInput): CalculatedCost {
  const totalDays = input.daysPerMonth
  const totalInputTokens = input.dailyInputTokens * totalDays
  const totalOutputTokens = input.dailyOutputTokens * totalDays

  let inputCost: number
  if (model.cacheHitPrice !== undefined && model.cacheMissPrice !== undefined) {
    const hitTokens = totalInputTokens * input.cacheHitRatio
    const missTokens = totalInputTokens * (1 - input.cacheHitRatio)
    inputCost = (hitTokens / 1000000) * model.cacheHitPrice + (missTokens / 1000000) * model.cacheMissPrice
  } else if (model.cacheHitPrice !== undefined) {
    const effectivePrice = model.cacheHitPrice * input.cacheHitRatio + model.inputPrice * (1 - input.cacheHitRatio)
    inputCost = (totalInputTokens / 1000000) * effectivePrice
  } else {
    inputCost = (totalInputTokens / 1000000) * model.inputPrice
  }

  const outputCost = (totalOutputTokens / 1000000) * model.outputPrice
  const monthlyCost = inputCost + outputCost

  const noCacheInputCost = (totalInputTokens / 1000000) * model.inputPrice
  const cacheSavings = noCacheInputCost - inputCost

  return {
    modelId: model.id,
    modelName: model.name,
    provider: model.provider,
    providerColor: model.providerColor,
    monthlyCost,
    yearlyCost: monthlyCost * 12,
    inputCost,
    outputCost,
    cacheSavings: cacheSavings > 0 ? cacheSavings : undefined
  }
}

export function formatCurrency(value: number): string {
  if (value < 0.01) return '< 0.01'
  if (value < 1) return value.toFixed(2)
  if (value < 100) return value.toFixed(1)
  return value.toFixed(0)
}

export function formatTokens(tokens: number): string {
  if (tokens < 1000) return tokens.toString()
  if (tokens < 1000000) return (tokens / 1000).toFixed(0) + 'K'
  if (tokens < 1000000000) return (tokens / 1000000).toFixed(1) + 'M'
  return (tokens / 1000000000).toFixed(2) + 'B'
}

export function sortCosts(costs: CalculatedCost[]): CalculatedCost[] {
  return [...costs].sort((a, b) => a.monthlyCost - b.monthlyCost)
}

export function getCheapestModel(costs: CalculatedCost[]): CalculatedCost | undefined {
  return sortCosts(costs)[0]
}

export function getTopProviders(costs: CalculatedCost[], limit: number = 3): CalculatedCost[] {
  return sortCosts(costs).slice(0, limit)
}

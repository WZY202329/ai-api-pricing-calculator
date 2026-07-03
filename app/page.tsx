'use client'

import { useState, useMemo } from 'react'
import CalculatorSidebar from '../src/components/CalculatorSidebar'
import PricingTable from '../src/components/PricingTable'
import RecommendationCard from '../src/components/RecommendationCard'
import { modelPricingData } from '../src/data/models'
import { CalculatorInput, CalculatedCost } from '../src/types/pricing'
import { calculateCost } from '../src/utils/calculator'
import { formatCurrency } from '../src/utils/calculator'

export default function Home() {
  const [input, setInput] = useState<CalculatorInput>({
    dailyInputTokens: 1000000,
    dailyOutputTokens: 500000,
    cacheHitRatio: 0.5,
    daysPerMonth: 22,
  })

  const costs: CalculatedCost[] = useMemo(() => {
    return modelPricingData.map(model => calculateCost(model, input))
  }, [input])

  const totalMonthlyCost = costs.reduce((sum, c) => sum + c.monthlyCost, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI API 比价计算器</h1>
                <p className="text-sm text-gray-500">快速对比主流大模型 API 成本</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">全部模型月费用</div>
                <div className="text-lg font-semibold text-gray-900">¥{formatCurrency(totalMonthlyCost)}/月</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">价格对比表</h2>
                <span className="text-sm text-gray-500">
                  共 {modelPricingData.length} 个模型
                </span>
              </div>
              <PricingTable 
                costs={costs} 
                dailyInputTokens={input.dailyInputTokens}
                dailyOutputTokens={input.dailyOutputTokens}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">模型详情</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modelPricingData.map((model) => (
                  <div key={model.id} className="border border-gray-100 rounded-lg p-4 hover:border-blue-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{model.name}</span>
                      <span 
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: `${model.providerColor}15`, color: model.providerColor }}
                      >
                        {model.provider}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{model.description}</div>
                    <div className="flex flex-wrap gap-1">
                      {model.features.map((feature) => (
                        <span key={feature} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">输入</span>
                        <span className="font-medium">¥{model.inputPrice}/百万 Tokens</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">输出</span>
                        <span className="font-medium">¥{model.outputPrice}/百万 Tokens</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">上下文</span>
                        <span className="font-medium">{(model.contextWindow / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <CalculatorSidebar input={input} onChange={setInput} />
            <RecommendationCard costs={costs} />
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">使用说明</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 输入您的日均 Token 用量，系统自动计算各模型费用</li>
                <li>• 展开高级选项可设置缓存命中率和使用天数</li>
                <li>• 缓存命中率越高，支持缓存的模型成本越低</li>
                <li>• 价格仅供参考，请以各厂商官方定价为准</li>
              </ul>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500 text-center">
                数据更新时间: 2026年7月<br/>
                覆盖模型: DeepSeek、豆包、Qwen、GLM、MiniMax、Kimi、Claude、GPT、Gemini
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

import { useState } from 'react'
import { CalculatorInput } from '../types/pricing'
import { formatTokens } from '../utils/calculator'

interface CalculatorSidebarProps {
  input: CalculatorInput
  onChange: (input: CalculatorInput) => void
}

export default function CalculatorSidebar({ input, onChange }: CalculatorSidebarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleChange = (key: keyof CalculatorInput, value: number) => {
    onChange({ ...input, [key]: value })
  }

  const presetScenarios = [
    { name: '小型项目', input: { dailyInputTokens: 100000, dailyOutputTokens: 50000 } },
    { name: '中型团队', input: { dailyInputTokens: 1000000, dailyOutputTokens: 500000 } },
    { name: '企业级', input: { dailyInputTokens: 10000000, dailyOutputTokens: 5000000 } },
  ]

  const selectedPresetIndex = presetScenarios.findIndex(
    (p) => p.input.dailyInputTokens === input.dailyInputTokens && p.input.dailyOutputTokens === input.dailyOutputTokens
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">费用计算器</h2>
      
      <div className="space-y-7">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            日均输入 Tokens
          </label>
          <div className="relative">
            <input
              type="number"
              value={input.dailyInputTokens}
              onChange={(e) => handleChange('dailyInputTokens', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="1000000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {formatTokens(input.dailyInputTokens)}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            日均输出 Tokens
          </label>
          <div className="relative">
            <input
              type="number"
              value={input.dailyOutputTokens}
              onChange={(e) => handleChange('dailyOutputTokens', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="500000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {formatTokens(input.dailyOutputTokens)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full text-left text-sm text-blue-600 hover:text-blue-800 flex items-center justify-between"
        >
          {showAdvanced ? '收起高级选项' : '展开高级选项'}
          <span className={`inline-block transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {showAdvanced && (
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                缓存命中率: {Math.round(input.cacheHitRatio * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={input.cacheHitRatio * 100}
                onChange={(e) => handleChange('cacheHitRatio', parseInt(e.target.value) / 100)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0% (无缓存)</span>
                <span>50%</span>
                <span>100% (完全命中)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                月使用天数: {input.daysPerMonth}天
              </label>
              <input
                type="range"
                min="1"
                max="31"
                value={input.daysPerMonth}
                onChange={(e) => handleChange('daysPerMonth', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">快速场景</label>
          <div className="grid grid-cols-3 gap-2">
            {presetScenarios.map((preset, index) => {
              const isSelected = selectedPresetIndex === index
              return (
                <button
                  key={preset.name}
                  onClick={() => {
                    onChange({
                      ...input,
                      dailyInputTokens: preset.input.dailyInputTokens,
                      dailyOutputTokens: preset.input.dailyOutputTokens,
                    })
                  }}
                  className={`px-3 py-2.5 text-xs font-medium rounded-lg transition ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                >
                  {preset.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

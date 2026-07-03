import { CalculatedCost } from '../types/pricing'
import { formatCurrency, formatTokens } from '../utils/calculator'

interface PricingTableProps {
  costs: CalculatedCost[]
  dailyInputTokens: number
  dailyOutputTokens: number
}

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const TrendingDownIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
)

export default function PricingTable({ costs, dailyInputTokens, dailyOutputTokens }: PricingTableProps) {
  const sortedCosts = [...costs].sort((a, b) => a.monthlyCost - b.monthlyCost)
  const cheapestCost = sortedCosts[0]?.monthlyCost || 0

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-semibold text-gray-700">模型</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">供应商</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">月费用</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">年费用</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">成本对比</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">缓存节省</th>
          </tr>
        </thead>
        <tbody>
          {sortedCosts.map((cost, index) => {
            const isCheapest = index === 0
            const percentageDiff = cheapestCost > 0 
              ? ((cost.monthlyCost - cheapestCost) / cheapestCost * 100).toFixed(0)
              : '0'
            
            return (
              <tr 
                key={cost.modelId}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  isCheapest ? 'bg-green-50' : ''
                }`}
              >
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{cost.modelName}</div>
                    <div className="text-xs text-gray-500">
                      日均: {formatTokens(dailyInputTokens)} 输入 + {formatTokens(dailyOutputTokens)} 输出
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span 
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${cost.providerColor}15`, 
                      color: cost.providerColor 
                    }}
                  >
                    {cost.provider}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className={`font-semibold ${isCheapest ? 'text-green-600' : 'text-gray-900'}`}>
                    ¥{formatCurrency(cost.monthlyCost)}/月
                  </div>
                  <div className="text-xs text-gray-500">
                    输入 ¥{formatCurrency(cost.inputCost)} + 输出 ¥{formatCurrency(cost.outputCost)}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="text-gray-700">¥{formatCurrency(cost.yearlyCost)}/年</div>
                </td>
                <td className="px-4 py-4 text-right">
                  {isCheapest ? (
                    <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                      <CheckIcon />
                      最优
                    </span>
                  ) : (
                    <span className={`inline-flex items-center gap-1 text-sm ${
                      parseInt(percentageDiff) > 50 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      <TrendingUpIcon />
                      +{percentageDiff}%
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-right">
                  {cost.cacheSavings && cost.cacheSavings > 0 ? (
                    <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                      <TrendingDownIcon />
                      -¥{formatCurrency(cost.cacheSavings)}/月
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

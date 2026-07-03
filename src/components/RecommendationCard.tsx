import { CalculatedCost } from '../types/pricing'
import { formatCurrency, getTopProviders } from '../utils/calculator'

const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

interface RecommendationCardProps {
  costs: CalculatedCost[]
}

export default function RecommendationCard({ costs }: RecommendationCardProps) {
  const top3 = getTopProviders(costs, 3)
  const cheapest = top3[0]

  if (!cheapest) return null

  const savings = costs.length > 1 ? Math.max(...costs.slice(1).map(c => c.monthlyCost)) - cheapest.monthlyCost : 0

  return (
    <div 
      className="rounded-xl p-6"
      style={{ background: 'linear-gradient(to bottom right, #1e293b, #0f172a)', color: '#ffffff' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
          <TrophyIcon />
        </div>
        <div>
          <h3 className="font-semibold" style={{ color: '#ffffff' }}>最具性价比推荐</h3>
          <p className="text-sm" style={{ color: '#d1d5db' }}>根据您的用量自动计算</p>
        </div>
      </div>

      <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex items-center justify-between mb-2">
          <span style={{ color: '#d1d5db' }}>推荐模型</span>
          <span 
            className="px-2 py-1 rounded text-xs font-medium"
            style={{ backgroundColor: `${cheapest.providerColor}`, color: '#ffffff' }}
          >
            {cheapest.provider}
          </span>
        </div>
        <h4 className="text-xl font-bold" style={{ color: '#ffffff' }}>{cheapest.modelName}</h4>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-3xl font-bold" style={{ color: '#ffffff' }}>¥{formatCurrency(cheapest.monthlyCost)}</span>
          <span className="mb-1" style={{ color: '#9ca3af' }}>/月</span>
        </div>
      </div>

      {savings > 0 && (
        <div className="flex items-center gap-2 mb-4" style={{ color: '#34d399' }}>
          <TrendingUpIcon />
          <span className="text-sm" style={{ color: '#34d399' }}>相比最贵方案，每月节省 ¥{formatCurrency(savings)}</span>
        </div>
      )}

      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="text-xs mb-3" style={{ color: '#9ca3af' }}>其他高性价比选择</div>
        <div className="space-y-3">
          {top3.slice(1).map((cost, index) => (
            <div key={cost.modelId} className="flex items-center justify-between rounded-lg px-4 py-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#d1d5db' }}>
                  {index + 2}
                </span>
                <span className="text-base" style={{ color: '#e5e7eb' }}>{cost.modelName}</span>
              </div>
              <span className="text-base font-medium" style={{ color: '#e5e7eb' }}>¥{formatCurrency(cost.monthlyCost)}/月</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
import { KPICard } from './kpi-card'
import { type KPIMetrics } from '@/lib/financial-types'
import { formatCurrency, formatPercent } from '@/lib/financial-utils'
import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react'

interface KPIRowProps {
  metrics: KPIMetrics | null
  loading?: boolean
}

export function KPIRow({ metrics, loading }: KPIRowProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" role="list" aria-label="Primary KPI metrics">
      <li>
        <KPICard
          label="Total Income"
          value={metrics ? formatCurrency(metrics.totalIncome) : '—'}
          numericValue={metrics?.totalIncome}
          helperText="Cumulative revenue from all income movements"
          icon={TrendingUp}
          variant="income"
          loading={loading}
        />
      </li>
      <li>
        <KPICard
          label="Total Outcome"
          value={metrics ? formatCurrency(metrics.totalOutcome) : '—'}
          numericValue={metrics?.totalOutcome}
          helperText="Total expenditure across all categories"
          icon={TrendingDown}
          variant="outcome"
          loading={loading}
        />
      </li>
      <li>
        <KPICard
          label="Profit"
          value={metrics ? formatCurrency(metrics.profit) : '—'}
          numericValue={metrics?.profit}
          helperText="Net profit — income minus total outcome"
          icon={DollarSign}
          variant="profit"
          loading={loading}
        />
      </li>
      <li>
        <KPICard
          label="Profit Margin"
          value={metrics ? formatPercent(metrics.profitPercent) : '—'}
          numericValue={metrics?.profitPercent}
          helperText="Profit as a percentage of total income"
          icon={BarChart2}
          variant="profitPercent"
          loading={loading}
        />
      </li>
    </ul>
  )
}

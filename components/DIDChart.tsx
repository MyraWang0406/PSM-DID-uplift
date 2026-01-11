'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DIDData {
  week: number
  week_range: string
  group: string
  period: string
  lead_rate: number
  order_rate: number
  lead_count: number
  order_count: number
  is_campaign_week: boolean
}

interface Props {
  data: DIDData[]
  onAIClick?: () => void
}

export default function DIDChart({ data, onAIClick }: Props) {
  // 处理数据：按周分组，分别计算 treatment 和 control 的平均值
  const weekData: Record<number, {
    week: number
    week_range: string
    is_campaign_week: boolean
    treatment_lead: number
    control_lead: number
    treatment_order: number
    control_order: number
  }> = {}

  data.forEach(item => {
    if (!weekData[item.week]) {
      weekData[item.week] = {
        week: item.week,
        week_range: item.week_range,
        is_campaign_week: item.is_campaign_week,
        treatment_lead: 0,
        control_lead: 0,
        treatment_order: 0,
        control_order: 0,
      }
    }

    if (item.group === 'treatment') {
      weekData[item.week].treatment_lead = item.lead_rate
      weekData[item.week].treatment_order = item.order_rate
    } else {
      weekData[item.week].control_lead = item.lead_rate
      weekData[item.week].control_order = item.order_rate
    }
  })

  const chartData = Object.values(weekData).sort((a, b) => a.week - b.week)

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '2px solid #3b82f6',
      overflow: 'hidden',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        padding: '16px 24px',
        marginBottom: '0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'white',
            margin: '0',
          }}>
            DID 时间序列分析
          </h2>
          {onAIClick && (
            <button
              onClick={onAIClick}
              style={{
                padding: '6px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
              }}
              title="查看AI分析师结论"
            >
              🤖 AI分析
            </button>
          )}
        </div>
      </div>
      <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="week"
              label={{ value: '周', position: 'insideBottom', offset: -5 }}
              stroke="#718096"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              label={{ value: 'Lead率 (%)', angle: -90, position: 'insideLeft' }}
              stroke="#718096"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => `${value.toFixed(2)}%`}
              labelFormatter={(label) => `第 ${label} 周`}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            />
            <Line
              type="monotone"
              dataKey="treatment_lead"
              name="AI On - Lead率"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="control_lead"
              name="AI Off - Lead率"
              stroke="#94a3b8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="week"
              label={{ value: '周', position: 'insideBottom', offset: -5 }}
              stroke="#718096"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              label={{ value: 'Order率 (%)', angle: -90, position: 'insideLeft' }}
              stroke="#718096"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => `${value.toFixed(2)}%`}
              labelFormatter={(label) => `第 ${label} 周`}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            />
            <Line
              type="monotone"
              dataKey="treatment_order"
              name="AI On - Order率"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="control_order"
              name="AI Off - Order率"
              stroke="#94a3b8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#f7fafc',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#718096',
      }}>
        <strong style={{ color: '#4a5568' }}>说明：</strong>
        {chartData.find(d => d.is_campaign_week) && (
          <span> 第 {chartData.find(d => d.is_campaign_week)?.week} 周为活动周（第30-36天）</span>
        )}
      </div>
      </div>
    </div>
  )
}


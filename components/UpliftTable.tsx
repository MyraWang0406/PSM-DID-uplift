'use client'

interface UpliftData {
  channel: string
  lead_uplift: number
  order_uplift: number
  sample_size: number
  confidence: string
}

interface Props {
  data: UpliftData[]
}

export default function UpliftTable({ data }: Props) {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case '高':
        return { bg: '#d4edda', color: '#155724', border: '#c3e6cb' }
      case '中':
        return { bg: '#fff3cd', color: '#856404', border: '#ffeaa7' }
      case '低':
        return { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' }
      default:
        return { bg: '#e2e8f0', color: '#4a5568', border: '#cbd5e0' }
    }
  }

  const formatUplift = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}%`
  }

  const getUpliftColor = (value: number) => {
    return value >= 0 ? '#10b981' : '#ef4444'
  }

  // 按可信度排序：高 -> 中 -> 低，然后按 lead_uplift 降序
  const sortedData = [...data].sort((a, b) => {
    const confidenceOrder = { '高': 0, '中': 1, '低': 2 }
    const aOrder = confidenceOrder[a.confidence as keyof typeof confidenceOrder] ?? 3
    const bOrder = confidenceOrder[b.confidence as keyof typeof confidenceOrder] ?? 3
    if (aOrder !== bOrder) return aOrder - bOrder
    return b.lead_uplift - a.lead_uplift
  })

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
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'white',
          margin: '0',
        }}>
          PSM Uplift 表
        </h2>
      </div>
      <div style={{ padding: '24px' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <th style={{
                textAlign: 'left',
                padding: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#718096',
                textTransform: 'uppercase',
              }}>渠道</th>
              <th style={{
                textAlign: 'right',
                padding: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#718096',
                textTransform: 'uppercase',
              }}>Lead提升</th>
              <th style={{
                textAlign: 'right',
                padding: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#718096',
                textTransform: 'uppercase',
              }}>Order提升</th>
              <th style={{
                textAlign: 'right',
                padding: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#718096',
                textTransform: 'uppercase',
              }}>样本量</th>
              <th style={{
                textAlign: 'center',
                padding: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#718096',
                textTransform: 'uppercase',
              }}>可信度</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => {
              const confidenceStyle = getConfidenceColor(row.confidence)
              return (
                <tr
                  key={row.channel}
                  style={{
                    borderBottom: index < sortedData.length - 1 ? '1px solid #f1f5f9' : 'none',
                  }}
                >
                  <td style={{
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#1a202c',
                  }}>{row.channel}</td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: getUpliftColor(row.lead_uplift),
                  }}>{formatUplift(row.lead_uplift)}</td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: getUpliftColor(row.order_uplift),
                  }}>{formatUplift(row.order_uplift)}</td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    fontSize: '14px',
                    color: '#4a5568',
                  }}>{row.sample_size.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: confidenceStyle.bg,
                      color: confidenceStyle.color,
                      border: `1px solid ${confidenceStyle.border}`,
                    }}>
                      {row.confidence}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}


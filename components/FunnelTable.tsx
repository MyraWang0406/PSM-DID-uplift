'use client'

interface FunnelData {
  channel: string
  sessions: number
  leads: number
  orders: number
  lead_rate: number
  order_rate: number
  conversion_rate: number
}

interface Props {
  data: FunnelData[]
  onAIClick?: () => void
}

export default function FunnelTable({ data, onAIClick }: Props) {
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
            渠道漏斗表
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
              }}>会话数</th>
              <th style={{
                textAlign: 'right',
                padding: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#718096',
                textTransform: 'uppercase',
              }}>询单数</th>
              <th style={{
                textAlign: 'right',
                padding: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#718096',
                textTransform: 'uppercase',
              }}>下单数</th>
              <th style={{
                textAlign: 'right',
                padding: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#718096',
                textTransform: 'uppercase',
              }}>询单率</th>
              <th style={{
                textAlign: 'right',
                padding: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#718096',
                textTransform: 'uppercase',
              }}>下单率</th>
              <th style={{
                textAlign: 'right',
                padding: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#718096',
                textTransform: 'uppercase',
              }}>转化率</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.channel}
                style={{
                  borderBottom: index < data.length - 1 ? '1px solid #f1f5f9' : 'none',
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
                  color: '#4a5568',
                }}>{row.sessions.toLocaleString()}</td>
                <td style={{
                  padding: '12px',
                  textAlign: 'right',
                  fontSize: '14px',
                  color: '#4a5568',
                }}>{row.leads.toLocaleString()}</td>
                <td style={{
                  padding: '12px',
                  textAlign: 'right',
                  fontSize: '14px',
                  color: '#4a5568',
                }}>{row.orders.toLocaleString()}</td>
                <td style={{
                  padding: '12px',
                  textAlign: 'right',
                  fontSize: '14px',
                  color: '#4a5568',
                }}>{row.lead_rate.toFixed(2)}%</td>
                <td style={{
                  padding: '12px',
                  textAlign: 'right',
                  fontSize: '14px',
                  color: '#4a5568',
                }}>{row.order_rate.toFixed(2)}%</td>
                <td style={{
                  padding: '12px',
                  textAlign: 'right',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#2d3748',
                }}>{row.conversion_rate.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}


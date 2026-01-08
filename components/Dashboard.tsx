'use client'

import { useEffect, useState } from 'react'
import FunnelTable from './FunnelTable'
import UpliftTable from './UpliftTable'
import DIDChart from './DIDChart'
import { withBase } from '@/lib/basePath'

interface FunnelData {
  channel: string
  sessions: number
  leads: number
  orders: number
  lead_rate: number
  order_rate: number
  conversion_rate: number
}

interface UpliftData {
  channel: string
  lead_uplift: number
  order_uplift: number
  sample_size: number
  confidence: string
}

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

export default function Dashboard() {
  const [funnelData, setFunnelData] = useState<FunnelData[]>([])
  const [upliftData, setUpliftData] = useState<UpliftData[]>([])
  const [didData, setDidData] = useState<DIDData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const funnelUrl = withBase('/funnel_by_channel.json')
        const upliftUrl = withBase('/uplift_by_channel.json')
        const didUrl = withBase('/did_timeseries.json')

        console.log('Loading data from:', { funnelUrl, upliftUrl, didUrl })

        const [funnelRes, upliftRes, didRes] = await Promise.all([
          fetch(funnelUrl),
          fetch(upliftUrl),
          fetch(didUrl),
        ])

        if (!funnelRes.ok) {
          throw new Error(`Failed to load funnel data: ${funnelRes.status} ${funnelRes.statusText} from ${funnelUrl}`)
        }
        if (!upliftRes.ok) {
          throw new Error(`Failed to load uplift data: ${upliftRes.status} ${upliftRes.statusText} from ${upliftUrl}`)
        }
        if (!didRes.ok) {
          throw new Error(`Failed to load DID data: ${didRes.status} ${didRes.statusText} from ${didUrl}`)
        }

        const funnel = await funnelRes.json()
        const uplift = await upliftRes.json()
        const did = await didRes.json()

        setFunnelData(funnel)
        setUpliftData(uplift)
        setDidData(did)
      } catch (error) {
        console.error('Failed to load data:', error)
        console.error('Actual request URLs:', {
          funnel: withBase('/funnel_by_channel.json'),
          uplift: withBase('/uplift_by_channel.json'),
          did: withBase('/did_timeseries.json'),
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '48px', color: '#718096' }}>
        加载中...
      </div>
    )
  }

  if (funnelData.length === 0 && upliftData.length === 0 && didData.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '48px', 
        color: '#ef4444',
        backgroundColor: '#fef2f2',
        borderRadius: '8px',
        border: '1px solid #fecaca'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
          数据加载失败
        </div>
        <div style={{ fontSize: '14px', color: '#991b1b' }}>
          请检查网络连接或联系技术支持
        </div>
        <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '12px' }}>
          请求的 URL:
          <br />
          {withBase('/funnel_by_channel.json')}
          <br />
          {withBase('/uplift_by_channel.json')}
          <br />
          {withBase('/did_timeseries.json')}
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <FunnelTable data={funnelData} />
        <UpliftTable data={upliftData} />
      </div>
      <DIDChart data={didData} />
    </div>
  )
}


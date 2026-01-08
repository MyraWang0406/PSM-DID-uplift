'use client'

import { useEffect, useState } from 'react'
import FunnelTable from './FunnelTable'
import UpliftTable from './UpliftTable'
import DIDChart from './DIDChart'

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
        const [funnelRes, upliftRes, didRes] = await Promise.all([
          fetch('/funnel_by_channel.json'),
          fetch('/uplift_by_channel.json'),
          fetch('/did_timeseries.json'),
        ])

        const funnel = await funnelRes.json()
        const uplift = await upliftRes.json()
        const did = await didRes.json()

        setFunnelData(funnel)
        setUpliftData(uplift)
        setDidData(did)
      } catch (error) {
        console.error('Failed to load data:', error)
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


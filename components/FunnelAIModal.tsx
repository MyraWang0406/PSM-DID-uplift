'use client'

import { useMemo } from 'react'

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
  isOpen: boolean
  onClose: () => void
  data: FunnelData[]
}

export default function FunnelAIModal({ isOpen, onClose, data }: Props) {
  const analysis = useMemo(() => {
    if (data.length === 0) return null

    // 行业均值参考（模拟数据，实际应该从配置或API获取）
    const industryAvg = {
      lead_rate: 4.0, // 行业平均询单率 4%
      order_rate: 1.0, // 行业平均下单率 1%
      conversion_rate: 25.0, // 行业平均转化率 25%
    }

    // 计算平均获客成本（简化：会话数越多，成本可能越高）
    const paidChannels = ['SEM', 'ASA', 'Facebook', 'TikTok', 'YouTube'] // 付费渠道
    const organicChannels = ['SEO', 'Direct', 'ASO'] // 自然渠道
    const affiliateChannels = ['Affiliate', 'Deal_Coupons'] // 联盟渠道

    const recommendations: string[] = []
    const insights: string[] = []

    // 分析每个渠道
    data.forEach(channel => {
      const isPaid = paidChannels.includes(channel.channel)
      const isOrganic = organicChannels.includes(channel.channel)
      const isAffiliate = affiliateChannels.includes(channel.channel)

      // 与行业均值对比
      const leadRateDiff = channel.lead_rate - industryAvg.lead_rate
      const orderRateDiff = channel.order_rate - industryAvg.order_rate
      const conversionRateDiff = channel.conversion_rate - industryAvg.conversion_rate

      // 渠道类型分析
      if (isPaid) {
        // 付费渠道分析
        if (leadRateDiff > 1 && orderRateDiff > 0.3) {
          insights.push(
            `✅ **${channel.channel}**（付费渠道）表现优秀：询单率 ${channel.lead_rate.toFixed(2)}%（行业均值 ${industryAvg.lead_rate}%），下单率 ${channel.order_rate.toFixed(2)}%（行业均值 ${industryAvg.order_rate}%），均高于行业水平。虽然获客成本较高，但转化效果好，ROI值得投入。`
          )
        } else if (leadRateDiff < -1 || orderRateDiff < -0.3) {
          insights.push(
            `⚠️ **${channel.channel}**（付费渠道）需要优化：询单率 ${channel.lead_rate.toFixed(2)}%（低于行业均值），下单率 ${channel.order_rate.toFixed(2)}%（低于行业均值）。作为付费渠道，获客成本高但转化效果不佳，建议优化投放策略或暂停投放。`
          )
        }
      } else if (isAffiliate) {
        // 联盟渠道分析
        if (conversionRateDiff > 5) {
          insights.push(
            `✅ **${channel.channel}**（联盟渠道）转化率高：转化率 ${channel.conversion_rate.toFixed(2)}%（行业均值 ${industryAvg.conversion_rate}%），获客成本低，是性价比高的渠道。建议保持或增加投入。`
          )
        }
      } else if (isOrganic) {
        // 自然渠道分析
        if (channel.sessions > 2000 && channel.order_rate > industryAvg.order_rate) {
          insights.push(
            `✅ **${channel.channel}**（自然渠道）表现稳定：流量大（${channel.sessions.toLocaleString()}会话），下单率 ${channel.order_rate.toFixed(2)}%高于行业均值，获客成本几乎为0，是优质渠道。建议持续优化SEO/内容策略。`
          )
        }
      }

      // 转化率分析
      if (channel.conversion_rate > 30) {
        recommendations.push(
          `💡 **${channel.channel}** 转化率优秀（${channel.conversion_rate.toFixed(2)}%），说明该渠道用户质量高。建议：1) 增加该渠道的询单量；2) 分析该渠道用户特征，复制到其他渠道。`
        )
      } else if (channel.conversion_rate < 20) {
        recommendations.push(
          `⚠️ **${channel.channel}** 转化率偏低（${channel.conversion_rate.toFixed(2)}%），可能存在：1) 询单质量不高；2) 产品匹配度低；3) 用户需求不明确。建议优化询单筛选或产品推荐策略。`
        )
      }
    })

    // 渠道对比分析
    const paidAvgLeadRate = data.filter(d => paidChannels.includes(d.channel))
      .reduce((sum, d) => sum + d.lead_rate, 0) / data.filter(d => paidChannels.includes(d.channel)).length
    const affiliateAvgLeadRate = data.filter(d => affiliateChannels.includes(d.channel))
      .reduce((sum, d) => sum + d.lead_rate, 0) / data.filter(d => affiliateChannels.includes(d.channel)).length

    if (paidAvgLeadRate > 0 && affiliateAvgLeadRate > 0) {
      const costEfficiency = (affiliateAvgLeadRate / paidAvgLeadRate).toFixed(2)
      insights.push(
        `📊 渠道类型对比：联盟渠道平均询单率 ${affiliateAvgLeadRate.toFixed(2)}%，付费渠道平均询单率 ${paidAvgLeadRate.toFixed(2)}%。虽然付费渠道获客成本更高，但询单率也更高。建议根据ROI目标平衡分配预算。`
      )
    }

    // 找出最佳渠道
    const bestChannel = [...data].sort((a, b) => {
      // 综合评分：转化率权重50%，下单率权重30%，会话数权重20%
      const scoreA = a.conversion_rate * 0.5 + a.order_rate * 30 + (a.sessions / 100) * 0.2
      const scoreB = b.conversion_rate * 0.5 + b.order_rate * 30 + (b.sessions / 100) * 0.2
      return scoreB - scoreA
    })[0]

    let overallConclusion = ''
    if (bestChannel) {
      overallConclusion = `渠道转化总览：**${bestChannel.channel}** 综合表现最佳（转化率 ${bestChannel.conversion_rate.toFixed(2)}%，下单率 ${bestChannel.order_rate.toFixed(2)}%）。整体来看，${data.filter(d => d.conversion_rate > industryAvg.conversion_rate).length} 个渠道转化率高于行业均值，渠道质量整体${data.filter(d => d.conversion_rate > industryAvg.conversion_rate).length > data.length / 2 ? '良好' : '一般'}。`
    }

    return {
      overallConclusion,
      insights,
      recommendations,
    }
  }, [data])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '0',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '2px solid #3b82f6',
          maxWidth: '700px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'white',
            margin: '0',
          }}>
            📊 渠道转化总览 - AI分析
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: '24px' }}>
          {analysis ? (
            <>
              <div style={{
                backgroundColor: '#f0f9ff',
                borderLeft: '4px solid #3b82f6',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
              }}>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#1e40af',
                  whiteSpace: 'pre-line',
                }}>
                  {analysis.overallConclusion}
                </div>
              </div>

              {analysis.insights.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1a202c',
                    marginBottom: '12px',
                  }}>
                    渠道效果分析
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {analysis.insights.map((insight, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '12px 16px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '14px',
                          lineHeight: '1.6',
                          color: '#4a5568',
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ 
                          __html: insight.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #1a202c;">$1</strong>')
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.recommendations.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1a202c',
                    marginBottom: '12px',
                  }}>
                    优化建议
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {analysis.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '12px 16px',
                          backgroundColor: '#fef3c7',
                          borderRadius: '8px',
                          border: '1px solid #fde68a',
                          fontSize: '14px',
                          lineHeight: '1.6',
                          color: '#78350f',
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ 
                          __html: rec.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #92400e;">$1</strong>')
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#718096',
              }}>
                <strong style={{ color: '#4a5568' }}>分析说明：</strong>
                <br />
                • 对比行业均值：询单率 4.0%，下单率 1.0%，转化率 25.0%
                <br />
                • 付费渠道（SEM/ASA等）获客成本高，但转化率可能更高
                <br />
                • 联盟渠道（Affiliate等）获客成本低，适合规模化
                <br />
                • 自然渠道（SEO/Direct等）成本最低，但需要长期积累
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px', color: '#718096' }}>
              数据加载中...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


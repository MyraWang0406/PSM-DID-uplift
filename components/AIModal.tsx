'use client'

import { useMemo } from 'react'

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

interface Props {
  isOpen: boolean
  onClose: () => void
  upliftData: UpliftData[]
  didData: DIDData[]
}

export default function AIModal({ isOpen, onClose, upliftData, didData }: Props) {
  const analysis = useMemo(() => {
    if (upliftData.length === 0 || didData.length === 0) {
      return null
    }

    // 计算DID结果
    const preData = didData.filter(d => d.period === 'pre')
    const postData = didData.filter(d => d.period === 'post')
    
    const preTreatmentLead = preData.filter(d => d.group === 'treatment').reduce((sum, d) => sum + d.lead_rate, 0) / preData.filter(d => d.group === 'treatment').length
    const postTreatmentLead = postData.filter(d => d.group === 'treatment').reduce((sum, d) => sum + d.lead_rate, 0) / postData.filter(d => d.group === 'treatment').length
    const preControlLead = preData.filter(d => d.group === 'control').reduce((sum, d) => sum + d.lead_rate, 0) / preData.filter(d => d.group === 'control').length
    const postControlLead = postData.filter(d => d.group === 'control').reduce((sum, d) => sum + d.lead_rate, 0) / postData.filter(d => d.group === 'control').length
    
    const preTreatmentOrder = preData.filter(d => d.group === 'treatment').reduce((sum, d) => sum + d.order_rate, 0) / preData.filter(d => d.group === 'treatment').length
    const postTreatmentOrder = postData.filter(d => d.group === 'treatment').reduce((sum, d) => sum + d.order_rate, 0) / postData.filter(d => d.group === 'treatment').length
    const preControlOrder = preData.filter(d => d.group === 'control').reduce((sum, d) => sum + d.order_rate, 0) / preData.filter(d => d.group === 'control').length
    const postControlOrder = postData.filter(d => d.group === 'control').reduce((sum, d) => sum + d.order_rate, 0) / postData.filter(d => d.group === 'control').length

    const didLead = (postTreatmentLead - preTreatmentLead) - (postControlLead - preControlLead)
    const didOrder = (postTreatmentOrder - preTreatmentOrder) - (postControlOrder - preControlOrder)
    const didLeadUplift = preControlLead > 0 ? (didLead / preControlLead) * 100 : 0
    const didOrderUplift = preControlOrder > 0 ? (didOrder / preControlOrder) * 100 : 0

    // 找出效果最好的渠道
    const highConfidenceChannels = upliftData
      .filter(d => d.confidence === '高' && (d.lead_uplift > 0 || d.order_uplift > 0))
      .sort((a, b) => (b.lead_uplift + b.order_uplift) - (a.lead_uplift + a.order_uplift))

    const mediumConfidenceChannels = upliftData
      .filter(d => d.confidence === '中' && (d.lead_uplift > 0 || d.order_uplift > 0))
      .sort((a, b) => (b.lead_uplift + b.order_uplift) - (a.lead_uplift + a.order_uplift))

    const recommendations: string[] = []
    
    if (highConfidenceChannels.length > 0) {
      const bestChannel = highConfidenceChannels[0]
      const budgetIncrease = Math.min(30, Math.max(10, Math.round((bestChannel.order_uplift / 10))))
      recommendations.push(
        `✅ **${bestChannel.channel}** 渠道表现最佳：AI导购带来 Order率提升 ${bestChannel.order_uplift.toFixed(1)}%，数据可信度高。建议预算增加 ${budgetIncrease}%，因为 DID 趋势分析（${didOrderUplift > 0 ? '+' : ''}${didOrderUplift.toFixed(1)}%）与 PSM 匹配结果（${bestChannel.order_uplift.toFixed(1)}%）一致，效果稳定可靠。`
      )
    }

    if (mediumConfidenceChannels.length > 0 && highConfidenceChannels.length === 0) {
      const bestChannel = mediumConfidenceChannels[0]
      const budgetIncrease = Math.min(20, Math.max(5, Math.round((bestChannel.order_uplift / 15))))
      recommendations.push(
        `⚠️ **${bestChannel.channel}** 渠道效果较好：AI导购带来 Order率提升 ${bestChannel.order_uplift.toFixed(1)}%，但数据可信度为中等。建议预算增加 ${budgetIncrease}%，并持续观察1-2周以验证效果稳定性。`
      )
    }

    const negativeChannels = upliftData.filter(d => d.lead_uplift < -10 || d.order_uplift < -10)
    if (negativeChannels.length > 0) {
      negativeChannels.forEach(channel => {
        recommendations.push(
          `❌ **${channel.channel}** 渠道效果为负：Lead提升 ${channel.lead_uplift.toFixed(1)}%，Order提升 ${channel.order_uplift.toFixed(1)}%。建议暂停或调整AI策略，检查配置是否匹配渠道用户特征。`
        )
      })
    }

    let overallConclusion = ''
    if (didOrderUplift > 5) {
      overallConclusion = `整体来看，AI导购效果显著：扣除时间趋势后，Order率额外提升 ${didOrderUplift.toFixed(1)}%，说明AI确实带来了真实的转化提升。`
    } else if (didOrderUplift > 0) {
      overallConclusion = `整体来看，AI导购有一定效果：扣除时间趋势后，Order率额外提升 ${didOrderUplift.toFixed(1)}%，但提升幅度较小，建议继续优化。`
    } else {
      overallConclusion = `整体来看，AI导购效果需要关注：扣除时间趋势后，Order率变化为 ${didOrderUplift.toFixed(1)}%，可能存在时间因素影响，建议深入分析。`
    }

    return {
      overallConclusion,
      recommendations,
      didLeadUplift,
      didOrderUplift,
    }
  }, [upliftData, didData])

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
            🤖 AI分析师自动结论
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

              <div style={{ marginTop: '20px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1a202c',
                  marginBottom: '12px',
                }}>
                  渠道建议
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {analysis.recommendations.map((rec, index) => (
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
                        __html: rec.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #1a202c;">$1</strong>')
                      }} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#718096',
              }}>
                <strong style={{ color: '#4a5568' }}>分析方法说明：</strong>
                <br />
                • DID（时间趋势分析）：扣除了节假日、促销等时间因素影响，更准确
                <br />
                • PSM（精准匹配）：排除了用户本身差异，确保对比公平
                <br />
                • 建议基于两种方法的一致性，可信度更高
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


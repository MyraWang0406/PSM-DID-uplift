'use client'

import { useMemo } from 'react'

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
  data: DIDData[]
}

export default function DIDAIModal({ isOpen, onClose, data }: Props) {
  const analysis = useMemo(() => {
    if (data.length === 0) return null

    // 分离pre和post时期
    const preData = data.filter(d => d.period === 'pre')
    const postData = data.filter(d => d.period === 'post')
    
    // 计算treatment和control的平均值
    const preTreatmentLead = preData.filter(d => d.group === 'treatment')
      .reduce((sum, d) => sum + d.lead_rate, 0) / preData.filter(d => d.group === 'treatment').length
    const postTreatmentLead = postData.filter(d => d.group === 'treatment')
      .reduce((sum, d) => sum + d.lead_rate, 0) / postData.filter(d => d.group === 'treatment').length
    const preControlLead = preData.filter(d => d.group === 'control')
      .reduce((sum, d) => sum + d.lead_rate, 0) / preData.filter(d => d.group === 'control').length
    const postControlLead = postData.filter(d => d.group === 'control')
      .reduce((sum, d) => sum + d.lead_rate, 0) / postData.filter(d => d.group === 'control').length
    
    const preTreatmentOrder = preData.filter(d => d.group === 'treatment')
      .reduce((sum, d) => sum + d.order_rate, 0) / preData.filter(d => d.group === 'treatment').length
    const postTreatmentOrder = postData.filter(d => d.group === 'treatment')
      .reduce((sum, d) => sum + d.order_rate, 0) / postData.filter(d => d.group === 'treatment').length
    const preControlOrder = preData.filter(d => d.group === 'control')
      .reduce((sum, d) => sum + d.order_rate, 0) / preData.filter(d => d.group === 'control').length
    const postControlOrder = postData.filter(d => d.group === 'control')
      .reduce((sum, d) => sum + d.order_rate, 0) / postData.filter(d => d.group === 'control').length

    // DID计算：排除时间趋势的影响
    // DID = (Treatment_post - Treatment_pre) - (Control_post - Control_pre)
    const didLead = (postTreatmentLead - preTreatmentLead) - (postControlLead - preControlLead)
    const didOrder = (postTreatmentOrder - preTreatmentOrder) - (postControlOrder - preControlOrder)
    
    // 计算uplift百分比
    const didLeadUplift = preControlLead > 0 ? (didLead / preControlLead) * 100 : 0
    const didOrderUplift = preControlOrder > 0 ? (didOrder / preControlOrder) * 100 : 0

    // 时间趋势分析
    const controlLeadTrend = postControlLead - preControlLead
    const controlOrderTrend = postControlOrder - preControlOrder
    const treatmentLeadTrend = postTreatmentLead - preTreatmentLead
    const treatmentOrderTrend = postTreatmentOrder - preTreatmentOrder

    const insights: string[] = []
    const recommendations: string[] = []

    // 分析时间趋势
    if (controlLeadTrend > 0.005 || controlOrderTrend > 0.002) {
      insights.push(
        `📅 时间趋势分析：活动周后，对照组（AI Off）的Lead率变化 ${(controlLeadTrend * 100).toFixed(2)}%，Order率变化 ${(controlOrderTrend * 100).toFixed(2)}%，说明存在明显的时间因素影响（如节假日、促销活动等）。`
      )
    }

    // DID结果分析
    if (didOrderUplift > 10) {
      insights.push(
        `✅ AI导购真实效果显著：通过DID分析排除时间因素后，AI导购对Order率的额外提升为 ${didOrderUplift.toFixed(1)}%。这意味着除了自然的时间增长，AI确实带来了 ${didOrderUplift.toFixed(1)}% 的真实转化提升。`
      )
      recommendations.push(
        `💡 建议：AI导购效果稳定可靠，建议保持或扩大使用范围。时间窗口分析显示AI带来的提升是真实的，不受外部因素影响。`
      )
    } else if (didOrderUplift > 0) {
      insights.push(
        `⚠️ AI导购有一定效果：通过DID分析排除时间因素后，AI导购对Order率的额外提升为 ${didOrderUplift.toFixed(1)}%，但提升幅度较小。可能存在：1) AI配置需要优化；2) 用户接受度需要提升；3) 产品匹配度需要改进。`
      )
      recommendations.push(
        `💡 建议：继续使用AI导购，但需要优化策略。可以尝试：1) 调整AI推荐算法；2) 优化AI交互体验；3) 提升AI响应速度。`
      )
    } else {
      insights.push(
        `❌ AI导购效果需要关注：通过DID分析排除时间因素后，AI导购对Order率的影响为 ${didOrderUplift.toFixed(1)}%。这可能意味着：1) 时间因素掩盖了AI的真实效果；2) AI策略需要调整；3) 用户对AI的接受度较低。`
      )
      recommendations.push(
        `💡 建议：深入分析AI使用情况，检查是否存在配置问题。建议进行A/B测试，对比不同AI策略的效果。`
      )
    }

    // 对比分析
    const treatmentTotalChange = (postTreatmentOrder - preTreatmentOrder) * 100
    const controlTotalChange = (postControlOrder - preControlOrder) * 100
    
    insights.push(
      `📊 变化对比：AI开启组（Treatment）Order率从 ${preTreatmentOrder.toFixed(2)}% 变化到 ${postTreatmentOrder.toFixed(2)}%（${treatmentTotalChange > 0 ? '+' : ''}${treatmentTotalChange.toFixed(2)}%），AI未开启组（Control）从 ${preControlOrder.toFixed(2)}% 变化到 ${postControlOrder.toFixed(2)}%（${controlTotalChange > 0 ? '+' : ''}${controlTotalChange.toFixed(2)}%）。DID分析扣除了共同的时间趋势（${controlTotalChange > 0 ? '+' : ''}${controlTotalChange.toFixed(2)}%），得出AI的真实影响为 ${didOrderUplift > 0 ? '+' : ''}${didOrderUplift.toFixed(1)}%。`
    )

    // 活动周分析
    const campaignWeek = data.find(d => d.is_campaign_week)
    if (campaignWeek) {
      insights.push(
        `🎯 活动周（第${campaignWeek.week}周，${campaignWeek.week_range}）分析：这是关键的时间窗口。DID方法通过对比活动周前后的变化，排除了活动本身带来的影响，更准确地评估了AI的真实效果。`
      )
    }

    let overallConclusion = ''
    if (didOrderUplift > 10) {
      overallConclusion = `DID时间窗口分析结论：AI导购在排除时间因素（节假日、促销等）后，对Order率的真实提升为 ${didOrderUplift.toFixed(1)}%。这个结果扣除了共同的时间趋势影响，更准确地反映了AI的真实价值。`
    } else if (didOrderUplift > 0) {
      overallConclusion = `DID时间窗口分析结论：AI导购在排除时间因素后，对Order率的真实提升为 ${didOrderUplift.toFixed(1)}%，提升幅度有限。建议继续优化AI策略以提升效果。`
    } else {
      overallConclusion = `DID时间窗口分析结论：AI导购在排除时间因素后，对Order率的影响为 ${didOrderUplift.toFixed(1)}%。需要深入分析是否存在时间因素掩盖了AI效果，或AI策略需要调整。`
    }

    return {
      overallConclusion,
      insights,
      recommendations,
      didLeadUplift,
      didOrderUplift,
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
            ⏰ DID时间窗口分析 - AI分析
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
                    时间窗口分析
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
                <strong style={{ color: '#4a5568' }}>DID方法说明：</strong>
                <br />
                • DID（双重差分）通过对比AI开启组和未开启组在活动周前后的变化差异，排除共同的时间趋势影响
                <br />
                • 公式：DID = (AI开启组_活动后 - AI开启组_活动前) - (AI未开启组_活动后 - AI未开启组_活动前)
                <br />
                • 这样可以更准确地评估AI导购的真实效果，不受节假日、促销等外部因素影响
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


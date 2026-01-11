'use client'

import { useMemo } from 'react'

interface UpliftData {
  channel: string
  lead_uplift: number
  order_uplift: number
  sample_size: number
  confidence: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  data: UpliftData[]
}

export default function UpliftAIModal({ isOpen, onClose, data }: Props) {
  const analysis = useMemo(() => {
    if (data.length === 0) return null

    const recommendations: string[] = []
    const insights: string[] = []

    // 按可信度分类
    const highConfidence = data.filter(d => d.confidence === '高')
    const mediumConfidence = data.filter(d => d.confidence === '中')
    const lowConfidence = data.filter(d => d.confidence === '低')

    // 找出效果最好的渠道（高可信度）
    const bestHighConf = highConfidence
      .filter(d => d.order_uplift > 0)
      .sort((a, b) => b.order_uplift - a.order_uplift)[0]

    if (bestHighConf) {
      const budgetIncrease = Math.min(30, Math.max(10, Math.round((bestHighConf.order_uplift / 10))))
      recommendations.push(
        `✅ **${bestHighConf.channel}** 渠道AI效果最佳：通过PSM精准匹配分析，AI导购带来 Order率提升 ${bestHighConf.order_uplift.toFixed(1)}%，Lead率提升 ${bestHighConf.lead_uplift.toFixed(1)}%。数据可信度高（样本量 ${bestHighConf.sample_size.toLocaleString()}），建议预算增加 ${budgetIncrease}%。`
      )
    }

    // 找出中等可信度但效果好的渠道
    const bestMediumConf = mediumConfidence
      .filter(d => d.order_uplift > 10)
      .sort((a, b) => b.order_uplift - a.order_uplift)[0]

    if (bestMediumConf) {
      const budgetIncrease = Math.min(20, Math.max(5, Math.round((bestMediumConf.order_uplift / 15))))
      insights.push(
        `⚠️ **${bestMediumConf.channel}** 渠道AI效果较好：Order率提升 ${bestMediumConf.order_uplift.toFixed(1)}%，但数据可信度为中等（样本量 ${bestMediumConf.sample_size.toLocaleString()}）。建议预算增加 ${budgetIncrease}%，并持续观察1-2周验证效果稳定性。`
      )
    }

    // 找出效果为负的渠道
    const negativeChannels = data.filter(d => d.lead_uplift < -10 || d.order_uplift < -10)
    if (negativeChannels.length > 0) {
      negativeChannels.forEach(channel => {
        recommendations.push(
          `❌ **${channel.channel}** 渠道AI效果为负：Lead提升 ${channel.lead_uplift.toFixed(1)}%，Order提升 ${channel.order_uplift.toFixed(1)}%。PSM匹配分析显示AI可能不适合该渠道用户特征，建议：1) 暂停AI策略；2) 调整AI配置；3) 检查用户需求匹配度。`
        )
      })
    }

    // 整体分析
    const avgOrderUplift = data.reduce((sum, d) => sum + d.order_uplift, 0) / data.length
    const positiveChannels = data.filter(d => d.order_uplift > 0).length
    const totalChannels = data.length

    let overallConclusion = ''
    if (avgOrderUplift > 10) {
      overallConclusion = `PSM精准匹配分析结果：平均Order率提升 ${avgOrderUplift.toFixed(1)}%，${positiveChannels}/${totalChannels} 个渠道效果为正。AI导购整体效果显著，通过精准匹配排除了用户差异影响，结果可信度高。`
    } else if (avgOrderUplift > 0) {
      overallConclusion = `PSM精准匹配分析结果：平均Order率提升 ${avgOrderUplift.toFixed(1)}%，${positiveChannels}/${totalChannels} 个渠道效果为正。AI导购有一定效果，但提升幅度有限，建议继续优化AI策略。`
    } else {
      overallConclusion = `PSM精准匹配分析结果：平均Order率提升 ${avgOrderUplift.toFixed(1)}%，仅 ${positiveChannels}/${totalChannels} 个渠道效果为正。AI导购效果需要关注，可能存在配置问题或用户匹配度低的情况。`
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
            📈 PSM Uplift - AI分析
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
                    渠道效果洞察
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
                    预算分配建议
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
              )}

              <div style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#718096',
              }}>
                <strong style={{ color: '#4a5568' }}>PSM分析方法说明：</strong>
                <br />
                • PSM（倾向得分匹配）：通过匹配相似用户（渠道、需求清晰度、购买倾向），排除用户本身差异的影响
                <br />
                • 可信度：高（样本量≥500且稳定）、中（样本量100-499）、低（样本量不足或波动大）
                <br />
                • 建议优先参考高可信度渠道的分析结果
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


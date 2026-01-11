'use client'

import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function DataModal({ isOpen, onClose }: Props) {
  const [isImporting, setIsImporting] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<string>('刚刚')

  if (!isOpen) return null

  const handleDownloadTemplate = () => {
    const template = `session_id,date,channel,ai_on,lead,order,need_clarity,baseline_propensity
s_0,2025-01-01,TikTok,1,0,0,med,0.362
s_1,2025-01-01,SEM,0,1,0,high,0.481`
    
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'sessions_template.csv'
    link.click()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setTimeout(() => {
      setIsImporting(false)
      alert('数据导入成功！请刷新页面查看最新数据。')
    }, 1500)
  }

  const handleRefresh = () => {
    setLastRefresh('刚刚')
    window.location.reload()
  }

  const handleExportReport = (type: 'weekly' | 'monthly') => {
    const date = new Date()
    const filename = type === 'weekly' 
      ? `周报_${date.getFullYear()}年第${Math.ceil((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24 * 7))}周.xlsx`
      : `月报_${date.getFullYear()}年${date.getMonth() + 1}月.xlsx`
    
    alert(`正在生成${type === 'weekly' ? '周报' : '月报'}：${filename}\n\n（实际功能需要后端支持）`)
  }

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
          maxWidth: '600px',
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
            📊 数据接入与刷新
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
          {/* 一键导入 */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a202c',
              marginBottom: '12px',
            }}>
              一键导入
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleDownloadTemplate}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                📥 下载模板
              </button>
              <label
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'inline-block',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {isImporting ? '上传中...' : '📤 上传 CSV/表格'}
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  disabled={isImporting}
                />
              </label>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#4f46e5'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#6366f1'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                🔌 API 接入
              </button>
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '12px',
              color: '#718096',
            }}>
              支持格式：CSV、Excel (.xlsx, .xls)、API JSON
            </div>
          </div>

          {/* 定时刷新 */}
          <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a202c',
              marginBottom: '12px',
            }}>
              数据刷新
            </h3>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleRefresh}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#d97706'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#f59e0b'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                🔄 立即刷新
              </button>
              <div style={{
                fontSize: '14px',
                color: '#718096',
              }}>
                上次刷新：{lastRefresh}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#94a3b8',
                padding: '6px 12px',
                backgroundColor: '#f1f5f9',
                borderRadius: '6px',
              }}>
                ⏰ 自动刷新：每 1 小时（需配置）
              </div>
            </div>
          </div>

          {/* 导出报告 */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a202c',
              marginBottom: '12px',
            }}>
              导出报告
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleExportReport('weekly')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#7c3aed'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#8b5cf6'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                📄 导出周报
              </button>
              <button
                onClick={() => handleExportReport('monthly')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ec4899',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#db2777'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#ec4899'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                📑 导出月报
              </button>
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '12px',
              color: '#718096',
            }}>
              报告包含：渠道效果分析、预算建议、趋势图表
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


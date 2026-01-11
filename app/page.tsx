'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import DataModal from '@/components/DataModal'
import './page.css'

export default function Home() {
  const [isDataModalOpen, setIsDataModalOpen] = useState(false)

  return (
    <main style={{ minHeight: '100vh', padding: '24px', position: 'relative' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ marginBottom: '32px', position: 'relative' }}>
          <div className="wave-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h1 className="wave-title">
                  AI导购效果分析看板
                </h1>
                <p className="wave-subtitle">
                  基于渠道询单线索及成单转化等维度的获客成本，及AI导购对转化率提升的增益，进行渠道广告预算的动态分配（数据为模拟数据）
                </p>
              </div>
              <button
                onClick={() => setIsDataModalOpen(true)}
                style={{
                  marginLeft: '20px',
                  padding: '10px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  zIndex: 10,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                }}
              >
                📊 数据导入
              </button>
            </div>
          </div>
        </header>
        <Dashboard />
      </div>
      
      {/* 数据接入弹窗 */}
      <DataModal isOpen={isDataModalOpen} onClose={() => setIsDataModalOpen(false)} />
      
      {/* 右下角联系信息 */}
      <div className="contact-info">
        <div style={{ marginBottom: '8px', fontWeight: 600 }}>联系作者</div>
        <div style={{ fontSize: '13px' }}>myrawzm0406@163.com</div>
        <div style={{ fontSize: '13px' }}>15301052620</div>
      </div>
    </main>
  )
}


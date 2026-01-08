import Dashboard from '@/components/Dashboard'
import './page.css'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '24px', position: 'relative' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ marginBottom: '32px' }}>
          <div className="wave-header">
            <h1 className="wave-title">
              AI导购效果分析看板
            </h1>
            <p className="wave-subtitle">
              基于渠道询单线索及成单转化等维度的获客成本，及AI导购对转化率提升的增益，进行渠道广告预算的动态分配（数据为模拟数据）
            </p>
          </div>
        </header>
        <Dashboard />
      </div>
      
      {/* 右下角联系信息 */}
      <div className="contact-info">
        <div style={{ marginBottom: '8px', fontWeight: 600 }}>联系作者</div>
        <div style={{ fontSize: '13px' }}>myrawzm0406@163.com</div>
        <div style={{ fontSize: '13px' }}>15301052620</div>
      </div>
    </main>
  )
}


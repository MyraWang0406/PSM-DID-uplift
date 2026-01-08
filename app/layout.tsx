import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI导购效果分析看板',
  description: 'AI导购渠道质量评判 Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}


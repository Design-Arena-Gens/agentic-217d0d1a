import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'مزرعتي - إدارة المزارع',
  description: 'نظام إدارة المزارع الذكي',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}

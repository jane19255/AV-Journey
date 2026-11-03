import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MoveAV',
  description: 'Autonomous bus journey planner',
  applicationName: 'MoveAV',
  appleWebApp: { capable: true, title: 'MoveAV', statusBarStyle: 'default' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
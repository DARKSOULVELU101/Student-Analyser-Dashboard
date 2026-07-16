import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Student Analyser Dashboard | Sri Krishna Engineering College & Sri Krishna Institute of Technology',
  description: 'AI-powered student performance analysis dashboard for Sri Krishna Engineering College and Sri Krishna Institute of Technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        {children}
      </body>
    </html>
  )
}

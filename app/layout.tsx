import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Student Analyser Dashboard | Sri Krishna Engineering College',
  description: 'AI-powered student performance analysis dashboard for Sri Krishna Engineering College and Sri Krishna Institute of Technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-950 min-h-screen">
        {children}
      </body>
    </html>
  )
}

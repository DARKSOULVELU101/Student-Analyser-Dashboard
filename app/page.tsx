'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Dashboard from '@/components/Dashboard'
import FileUpload from '@/components/FileUpload'
import Analytics from '@/components/Analytics'
import AIAssistant from '@/components/AIAssistant'
import Footer from '@/components/Footer'

export default function Home() {
  const [uploadedData, setUploadedData] = useState<any[]>([])
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <main className="min-h-screen bg-dark-950 bg-grid">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === 'dashboard' && (
        <>
          <Hero />
          <Dashboard data={uploadedData} />
        </>
      )}
      
      {activeSection === 'upload' && (
        <FileUpload onDataUpload={setUploadedData} />
      )}
      
      {activeSection === 'analytics' && (
        <Analytics data={uploadedData} />
      )}
      
      {activeSection === 'ai-assistant' && (
        <AIAssistant data={uploadedData} />
      )}
      
      <Footer />
    </main>
  )
}

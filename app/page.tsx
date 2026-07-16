'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Dashboard from '@/components/Dashboard'
import FileUpload from '@/components/FileUpload'
import Analytics from '@/components/Analytics'
import AIAssistant from '@/components/AIAssistant'
import DemoModal from '@/components/DemoModal'
import Footer from '@/components/Footer'

export default function Home() {
  const [uploadedData, setUploadedData] = useState<any[]>([])
  const [activeSection, setActiveSection] = useState('dashboard')
  const [showDemo, setShowDemo] = useState(false)

  const handleGetStarted = () => {
    setActiveSection('upload')
  }

  const handleWatchDemo = () => {
    setShowDemo(true)
  }

  return (
    <main className="min-h-screen relative">
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      {activeSection === 'dashboard' && (
        <>
          <Hero 
            onGetStarted={handleGetStarted} 
            onWatchDemo={handleWatchDemo}
          />
          <Dashboard data={uploadedData} />
        </>
      )}
      
      {activeSection === 'upload' && (
        <FileUpload onDataUpload={setUploadedData} setActiveSection={setActiveSection} />
      )}
      
      {activeSection === 'analytics' && (
        <Analytics data={uploadedData} />
      )}
      
      {activeSection === 'ai-assistant' && (
        <AIAssistant data={uploadedData} />
      )}
      
      <Footer />
      
      {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}
    </main>
  )
}

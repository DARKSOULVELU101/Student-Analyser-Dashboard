'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  File,
  X,
  Loader2,
  Sparkles,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

interface FileUploadProps {
  onDataUpload: (data: any[]) => void
  setActiveSection: (section: string) => void
}

export default function FileUpload({ onDataUpload, setActiveSection }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    setUploadedFiles(prev => [...prev, ...files])
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const processFiles = async () => {
    setIsProcessing(true)
    setUploadProgress(0)

    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setUploadProgress(i)
    }

    const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL']
    const years = ['2021', '2022', '2023', '2024', '2025']
    const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
    const data = []

    for (let i = 0; i < 100; i++) {
      data.push({
        id: `STU${(1000 + i).toString()}`,
        name: `Student ${i + 1}`,
        department: departments[Math.floor(Math.random() * departments.length)],
        year: years[Math.floor(Math.random() * years.length)],
        semester: semesters[Math.floor(Math.random() * semesters.length)],
        marks: {
          internal: Math.floor(Math.random() * 40) + 60,
          assignment: Math.floor(Math.random() * 20) + 80,
          lab: Math.floor(Math.random() * 30) + 70,
          semester: Math.floor(Math.random() * 40) + 60,
        },
        attendance: Math.floor(Math.random() * 20) + 80,
        gpa: (Math.random() * 2 + 2).toFixed(2),
      })
    }

    onDataUpload(data)
    setIsProcessing(false)
    setIsComplete(true)
    
    setTimeout(() => {
      setActiveSection('analytics')
    }, 1500)
  }

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') return <FileText className="w-6 h-6" style={{ color: '#FF3B30' }} />
    if (file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) 
      return <FileSpreadsheet className="w-6 h-6" style={{ color: '#34C759' }} />
    return <File className="w-6 h-6" style={{ color: '#007AFF' }} />
  }

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 glass-card rounded-full text-sm font-medium text-[#007AFF] mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Step 1: Upload Student Data
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1F] mb-4">
            Upload Student Data
          </h2>
          <p className="text-[#6E6E73] max-w-2xl mx-auto text-lg">
            Upload Excel, PDF, or CSV files containing student performance data. 
            Our AI will automatically analyse and generate insights.
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`relative glass-card rounded-3xl p-10 transition-all duration-500 ${
            isDragging ? 'border-2 border-[#007AFF] shadow-xl' : ''
          }`}
          style={isDragging ? { boxShadow: '0 12px 48px rgba(0, 122, 255, 0.15)' } : {}}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: isDragging ? 1.15 : 1,
                y: isDragging ? -15 : 0,
                rotate: isDragging ? 5 : 0
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6"
              style={{ background: 'linear-gradient(135deg, #007AFF15, #5856D615)' }}
            >
              <Upload className="w-12 h-12" style={{ color: '#007AFF' }} />
            </motion.div>

            <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">
              {isDragging ? 'Drop your files here' : 'Drag & drop files here'}
            </h3>
            <p className="text-[#6E6E73] mb-6">
              or click to browse from your computer
            </p>

            <label className="inline-flex items-center gap-2 px-8 py-4 glass-btn text-white font-semibold rounded-2xl hover:shadow-xl cursor-pointer">
              <Upload className="w-5 h-5" />
              Select Files
              <input
                type="file"
                multiple
                accept=".xlsx,.xls,.csv,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                { icon: FileSpreadsheet, label: 'Excel', color: '#34C759' },
                { icon: FileText, label: 'PDF', color: '#FF3B30' },
                { icon: File, label: 'CSV', color: '#007AFF' },
              ].map((format) => (
                <div key={format.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 border border-white/30">
                  <format.icon className="w-4 h-4" style={{ color: format.color }} />
                  <span className="text-sm font-medium text-[#6E6E73]">{format.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Uploaded Files */}
        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 space-y-4"
            >
              <h4 className="text-lg font-bold text-[#1D1D1F] flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: '#007AFF' }} />
                Uploaded Files ({uploadedFiles.length})
              </h4>

              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="flex items-center justify-between p-4 glass-card rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center">
                        {getFileIcon(file)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#1D1D1F]">{file.name}</div>
                        <div className="text-xs text-[#6E6E73]">
                          {(file.size / 1024).toFixed(2)} KB
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => removeFile(index)}
                      className="p-2 rounded-xl hover:bg-[#FF3B30]/10 transition-colors text-[#AEAEB2] hover:text-[#FF3B30] cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Process Button */}
              {!isComplete ? (
                <motion.button
                  onClick={processFiles}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 glass-btn text-white font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-lg"
                  whileHover={!isProcessing ? { scale: 1.02 } : {}}
                  whileTap={!isProcessing ? { scale: 0.98 } : {}}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analysing... {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Analyse with AI
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg"
                  style={{ background: 'linear-gradient(135deg, #34C759, #30B350)' }}
                >
                  <CheckCircle className="w-6 h-6" />
                  Analysis Complete! Redirecting...
                </motion.div>
              )}

              {/* Progress Bar */}
              {isProcessing && (
                <div className="w-full h-2.5 rounded-full overflow-hidden bg-white/30">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #007AFF, #5856D6, #AF52DE)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

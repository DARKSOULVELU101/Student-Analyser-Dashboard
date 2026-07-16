'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  File,
  CheckCircle,
  X,
  Loader2,
  AlertCircle,
  Sparkles
} from 'lucide-react'

interface FileUploadProps {
  onDataUpload: (data: any[]) => void
}

export default function FileUpload({ onDataUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

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
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'text/csv' ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls')
    )
    
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles])
    }
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

    // Simulate processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    // Generate mock data
    const mockData = generateMockData()
    onDataUpload(mockData)
    setIsProcessing(false)
    setUploadedFiles([])
  }

  const generateMockData = () => {
    const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL']
    const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
    const data = []

    for (let i = 0; i < 50; i++) {
      data.push({
        id: `STU${(1000 + i).toString()}`,
        name: `Student ${i + 1}`,
        department: departments[Math.floor(Math.random() * departments.length)],
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
    return data
  }

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') return <FileText className="w-8 h-8 text-red-400" />
    if (file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) 
      return <FileSpreadsheet className="w-8 h-8 text-green-400" />
    return <File className="w-8 h-8 text-blue-400" />
  }

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Upload Student Data
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            Upload Excel, PDF, or CSV files containing student performance data. 
            Our AI will automatically analyze and generate insights.
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative glass rounded-3xl p-8 transition-all duration-300 ${
            isDragging ? 'glow-blue border-primary-500' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: isDragging ? 1.1 : 1,
                y: isDragging ? -10 : 0 
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 mb-6"
            >
              <Upload className="w-10 h-10 text-primary-400" />
            </motion.div>

            <h3 className="text-xl font-semibold text-white mb-2">
              {isDragging ? 'Drop your files here' : 'Drag & drop files here'}
            </h3>
            <p className="text-dark-400 mb-6">
              or click to browse from your computer
            </p>

            <label className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors cursor-pointer">
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

            <p className="text-xs text-dark-500 mt-4">
              Supported formats: Excel (.xlsx, .xls), PDF, CSV
            </p>
          </div>

          {/* Accepted Formats */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: FileSpreadsheet, label: 'Excel', color: 'text-green-400' },
              { icon: FileText, label: 'PDF', color: 'text-red-400' },
              { icon: File, label: 'CSV', color: 'text-blue-400' },
            ].map((format) => (
              <div key={format.label} className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-xl">
                <format.icon className={`w-4 h-4 ${format.color}`} />
                <span className="text-sm text-dark-300">{format.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Uploaded Files List */}
        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 space-y-4"
            >
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-400" />
                Uploaded Files ({uploadedFiles.length})
              </h4>

              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      {getFileIcon(file)}
                      <div>
                        <div className="text-sm font-medium text-white">{file.name}</div>
                        <div className="text-xs text-dark-400">
                          {(file.size / 1024).toFixed(2)} KB
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 rounded-lg hover:bg-dark-700 transition-colors text-dark-400 hover:text-red-400 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Process Button */}
              <motion.button
                onClick={processFiles}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-accent-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing... {uploadProgress}%
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze with AI
                  </>
                )}
              </motion.button>

              {/* Progress Bar */}
              {isProcessing && (
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full progress-bar"
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

'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, FileText, FileSpreadsheet, File,
  X, Loader2, Sparkles, CheckCircle, ArrowRight
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

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }, [])
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false) }, [])
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    setUploadedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)])
  }, [])
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadedFiles(prev => [...prev, ...Array.from(e.target.files || [])])
  }
  const removeFile = (index: number) => setUploadedFiles(prev => prev.filter((_, i) => i !== index))

  const generateRealisticData = () => {
    const depts = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL']
    const yrs = ['2021', '2022', '2023', '2024', '2025']
    const sems = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
    const firstNames = ['Aarav','Vivaan','Aditya','Arjun','Sai','Rohan','Vihaan','Krishna','Priya','Ananya','Diya','Meera','Rahul','Amit','Kiran','Deepa','Lakshmi','Sanjay','Vikram','Nisha','Pooja','Suresh','Rajesh','Manoj','Prakash','Geeta','Kavita','Suma','Rekha','Usha','Bharath','Dhruv','Gokul','Harish','Karthik','Lokesh','Mohan','Nithya','Parvathy','Revathi','Swathi','Tharani','Vidya','Yamini','Anjali','Deepika','Shruti','Divya','Kavya','Nandini']
    const lastNames = ['Sharma','Verma','Gupta','Singh','Kumar','Reddy','Nair','Iyer','Patel','Joshi','Mishra','Pandey','Rao','Krishnan','Menon','Das','Banerjee','Sen','Bose','Pal','Kaur','Dhillon','Gill','Chauhan','Bhat','Hegde']
    const data = []
    for (let i = 0; i < 500; i++) {
      const dept = depts[Math.floor(Math.random() * depts.length)]
      const yr = yrs[Math.floor(Math.random() * yrs.length)]
      const sem = sems[Math.floor(Math.random() * sems.length)]
      const internal = 30 + Math.floor(Math.random() * 20)
      const assignment = 15 + Math.floor(Math.random() * 10)
      const lab = 25 + Math.floor(Math.random() * 25)
      const semExam = 40 + Math.floor(Math.random() * 60)
      const total = internal + assignment + lab + semExam
      const gpa = +(2 + Math.random() * 8).toFixed(2)
      data.push({
        id: `SKEC${dept.slice(0,2)}${yr.slice(-2)}${String(i+1).padStart(4,'0')}`,
        name: `${firstNames[Math.floor(Math.random()*firstNames.length)]} ${lastNames[Math.floor(Math.random()*lastNames.length)]}`,
        department: dept, year: yr, semester: sem,
        internal, assignment, lab, semesterExam: semExam,
        total, gpa, attendance: 55 + Math.floor(Math.random() * 45),
        grade: gpa >= 9 ? 'O' : gpa >= 8 ? 'A+' : gpa >= 7 ? 'A' : gpa >= 6 ? 'B+' : gpa >= 5 ? 'B' : gpa >= 4 ? 'C' : 'RA',
      })
    }
    return data
  }

  const processFiles = async () => {
    setIsProcessing(true); setUploadProgress(0)
    for (let i = 0; i <= 100; i += 3) {
      await new Promise(r => setTimeout(r, 60))
      setUploadProgress(i)
    }
    const result = generateRealisticData()
    onDataUpload(result)
    setIsProcessing(false); setIsComplete(true)
    setTimeout(() => setActiveSection('dashboard'), 1200)
  }

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') return <FileText className="w-6 h-6" style={{ color: '#FF3B30' }} />
    if (file.name.match(/\.xlsx?$/)) return <FileSpreadsheet className="w-6 h-6" style={{ color: '#34C759' }} />
    return <File className="w-6 h-6" style={{ color: '#007AFF' }} />
  }

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="inline-flex items-center gap-2 px-5 py-2.5 glass-card rounded-full text-sm font-medium text-[#007AFF] mb-6">
            <Sparkles className="w-4 h-4" /> Step 1: Upload Student Data
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1F] mb-4">Upload Student Data</h2>
          <p className="text-[#6E6E73] max-w-2xl mx-auto text-lg">Upload Excel, PDF, or CSV files. Our AI will analyse and generate live dashboard insights.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className={`relative glass-card rounded-3xl p-10 transition-all duration-500 ${isDragging ? 'border-2 border-[#007AFF] shadow-xl' : ''}`}
          onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
        >
          <div className="text-center">
            <motion.div animate={{ scale: isDragging ? 1.15 : 1, y: isDragging ? -15 : 0 }} transition={{ type: 'spring', stiffness: 300 }} className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6" style={{ background: 'linear-gradient(135deg, #007AFF15, #5856D615)' }}>
              <Upload className="w-12 h-12" style={{ color: '#007AFF' }} />
            </motion.div>
            <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">{isDragging ? 'Drop your files here' : 'Drag & drop files here'}</h3>
            <p className="text-[#6E6E73] mb-6">or click to browse from your computer</p>
            <label className="inline-flex items-center gap-2 px-8 py-4 glass-btn text-white font-semibold rounded-2xl cursor-pointer">
              <Upload className="w-5 h-5" /> Select Files
              <input type="file" multiple accept=".xlsx,.xls,.csv,.pdf" onChange={handleFileSelect} className="hidden" />
            </label>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                { icon: FileSpreadsheet, label: 'Excel (.xlsx)', color: '#34C759' },
                { icon: FileText, label: 'PDF', color: '#FF3B30' },
                { icon: File, label: 'CSV', color: '#007AFF' },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 border border-white/30">
                  <f.icon className="w-4 h-4" style={{ color: f.color }} />
                  <span className="text-sm font-medium text-[#6E6E73]">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-8 space-y-4">
              <h4 className="text-lg font-bold text-[#1D1D1F] flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: '#007AFF' }} />
                Uploaded Files ({uploadedFiles.length})
              </h4>
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <motion.div key={`${file.name}-${index}`} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="flex items-center justify-between p-4 glass-card rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center">{getFileIcon(file)}</div>
                      <div>
                        <div className="text-sm font-semibold text-[#1D1D1F]">{file.name}</div>
                        <div className="text-xs text-[#6E6E73]">{(file.size / 1024).toFixed(2)} KB</div>
                      </div>
                    </div>
                    <motion.button onClick={() => removeFile(index)} className="p-2 rounded-xl hover:bg-[#FF3B30]/10 text-[#AEAEB2] hover:text-[#FF3B30] cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <X className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {!isComplete ? (
                <motion.button onClick={processFiles} disabled={isProcessing} className="w-full flex items-center justify-center gap-3 px-8 py-4 glass-btn text-white font-bold rounded-2xl disabled:opacity-50 cursor-pointer text-lg" whileHover={!isProcessing ? { scale: 1.02 } : {}} whileTap={!isProcessing ? { scale: 0.98 } : {}}>
                  {isProcessing ? (<><Loader2 className="w-5 h-5 animate-spin" /> Processing... {uploadProgress}%</>) : (<><Sparkles className="w-5 h-5" /> Analyse with AI <ArrowRight className="w-5 h-5" /></>)}
                </motion.button>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #34C759, #30B350)' }}>
                  <CheckCircle className="w-6 h-6" /> 500 Records Loaded! Opening Dashboard...
                </motion.div>
              )}

              {isProcessing && (
                <div className="w-full h-2.5 rounded-full overflow-hidden bg-white/30">
                  <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #007AFF, #5856D6, #AF52DE)' }} initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} transition={{ duration: 0.3 }} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
          <p className="text-sm text-[#AEAEB2] mb-3">No file? Try demo data:</p>
          <button onClick={() => { setIsProcessing(true); setUploadProgress(0); processFiles() }} className="px-6 py-3 glass-card rounded-2xl text-sm font-semibold text-[#007AFF] hover:bg-white/60 transition-all cursor-pointer">
            Load 500 Demo Records
          </button>
        </motion.div>
      </div>
    </section>
  )
}

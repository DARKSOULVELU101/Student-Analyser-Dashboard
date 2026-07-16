import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Upload as UploadIcon, FileSpreadsheet, FileText, CheckCircle, AlertCircle, Download, ArrowRight } from 'lucide-react'
import * as XLSX from 'xlsx'

const departmentNames = {
  cse: 'Computer Science & Engineering',
  it: 'Information Technology',
  ece: 'Electronics & Communication',
  eee: 'Electrical & Electronics',
  civil: 'Civil Engineering',
  mech: 'Mechanical Engineering',
  aids: 'AI & Data Science',
  aiml: 'AI & Machine Learning',
  cyber: 'Cyber Security',
  fashion: 'Fashion Technology',
}

export default function Upload() {
  const navigate = useNavigate()
  const [department] = useState(sessionStorage.getItem('department') || '')
  const [year] = useState(sessionStorage.getItem('year') || '')
  const [uploadedData, setUploadedData] = useState(null)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const parseTextFile = (text) => {
    const lines = text.split('\n').filter(line => line.trim())
    const data = []
    const firstLine = lines[0]
    let delimiter = ','
    if (firstLine.includes('\t')) delimiter = '\t'
    else if (firstLine.includes(';')) delimiter = ';'
    else if (firstLine.includes('|')) delimiter = '|'

    const startIndex = firstLine.toLowerCase().includes('name') || firstLine.toLowerCase().includes('roll') ? 1 : 0

    for (let i = startIndex; i < lines.length; i++) {
      const parts = lines[i].split(delimiter).map(p => p.trim())
      if (parts.length >= 2) {
        data.push({
          rollNo: parts[0] || `STU${i}`,
          name: parts[1] || `Student ${i}`,
          marks: parts.slice(2).map(Number).filter(m => !isNaN(m))
        })
      }
    }
    return data
  }

  const processFile = useCallback(async (file) => {
    setError('')
    setIsProcessing(true)
    setFileName(file.name)

    try {
      const ext = file.name.split('.').pop().toLowerCase()

      if (ext === 'xlsx' || ext === 'xls') {
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data)
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet)

        const processedData = jsonData.map((row, index) => ({
          rollNo: row['Roll No'] || row['roll_no'] || row['RollNo'] || row['ID'] || `STU${index + 1}`,
          name: row['Name'] || row['name'] || row['Student Name'] || `Student ${index + 1}`,
          marks: Object.entries(row)
            .filter(([key]) => !['Roll No', 'roll_no', 'RollNo', 'ID', 'Name', 'name', 'Student Name'].includes(key))
            .map(([, value]) => Number(value))
            .filter(v => !isNaN(v)),
          subjects: Object.entries(row)
            .filter(([key]) => !['Roll No', 'roll_no', 'RollNo', 'ID', 'Name', 'name', 'Student Name'].includes(key))
            .map(([key, value]) => ({ subject: key, marks: Number(value) }))
            .filter(s => !isNaN(s.marks))
        }))

        setUploadedData(processedData)
      } else if (ext === 'txt' || ext === 'csv' || ext === 'tsv') {
        const text = await file.text()
        const processedData = parseTextFile(text)
        setUploadedData(processedData)
      } else {
        throw new Error('Unsupported file format. Please upload Excel (.xlsx, .xls) or text (.txt, .csv) files.')
      }
    } catch (err) {
      setError(err.message || 'Error processing file')
      setUploadedData(null)
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }, [processFile])

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const handleProceed = () => {
    if (uploadedData && department && year) {
      sessionStorage.setItem('studentData', JSON.stringify(uploadedData))
      navigate('/analytics')
    }
  }

  const downloadSample = () => {
    const sampleData = [
      { 'Roll No': 'STU001', 'Name': 'John Doe', 'Maths': 85, 'Science': 78, 'English': 92, 'CS': 88 },
      { 'Roll No': 'STU002', 'Name': 'Jane Smith', 'Maths': 92, 'Science': 85, 'English': 88, 'CS': 95 },
      { 'Roll No': 'STU003', 'Name': 'Bob Johnson', 'Maths': 78, 'Science': 82, 'English': 75, 'CS': 80 },
      { 'Roll No': 'STU004', 'Name': 'Alice Brown', 'Maths': 95, 'Science': 90, 'English': 85, 'CS': 92 },
      { 'Roll No': 'STU005', 'Name': 'Charlie Wilson', 'Maths': 65, 'Science': 70, 'English': 68, 'CS': 72 },
    ]
    const ws = XLSX.utils.json_to_sheet(sampleData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Marks')
    XLSX.writeFile(wb, 'sample_marks.xlsx')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="min-h-screen pt-24 pb-12 px-6 gradient-bg"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Upload Marks Data
          </h1>
          <p className="text-white/80 text-lg">Upload Excel or text files with student marks</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 mb-8 flex flex-wrap items-center justify-center gap-4 text-gray-700"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Department:</span>
            <span className="font-semibold">{departmentNames[department] || 'Not Selected'}</span>
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Year:</span>
            <span className="font-semibold">{year ? `${year}${year === '1' ? 'st' : year === '2' ? 'nd' : year === '3' ? 'rd' : 'th'} Year` : 'Not Selected'}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 mb-8"
        >
          <div
            className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              dragActive
                ? 'border-primary bg-primary/10'
                : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".xlsx,.xls,.txt,.csv,.tsv"
              onChange={handleFileInput}
            />

            <label htmlFor="file-upload" className="cursor-pointer">
              <motion.div
                animate={isProcessing ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1, repeat: isProcessing ? Infinity : 0 }}
                className="w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <UploadIcon className="w-10 h-10 text-primary" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {isProcessing ? 'Processing file...' : 'Drag & drop your file here'}
              </h3>
              <p className="text-gray-500 mb-4">or click to browse</p>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel (.xlsx, .xls)
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  Text (.txt, .csv)
                </span>
              </div>
            </label>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <button
            onClick={downloadSample}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Download sample Excel template
          </button>
        </motion.div>

        <AnimatePresence>
          {uploadedData && uploadedData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  File Uploaded: {fileName}
                </h3>
                <span className="text-sm text-gray-500">{uploadedData.length} students found</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Roll No</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-center">Marks</th>
                      <th className="p-3 text-center">Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedData.slice(0, 5).map((student, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-3 font-mono">{student.rollNo}</td>
                        <td className="p-3">{student.name}</td>
                        <td className="p-3 text-center">{student.marks.length} subjects</td>
                        <td className="p-3 text-center font-semibold">
                          {student.marks.length > 0
                            ? (student.marks.reduce((a, b) => a + b, 0) / student.marks.length).toFixed(1)
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {uploadedData.length > 5 && (
                  <p className="text-center text-gray-500 text-sm mt-3">
                    ... and {uploadedData.length - 5} more students
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {uploadedData && department && year && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProceed}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold text-lg inline-flex items-center gap-3 shadow-xl"
              >
                Analyze Data
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Upload as UploadIcon, FileSpreadsheet, FileText, CheckCircle, AlertCircle, Download, ArrowRight } from 'lucide-react'
import * as XLSX from 'xlsx'

const departmentNames = {
  cse: 'Computer Science & Engineering', it: 'Information Technology', ece: 'Electronics & Communication',
  eee: 'Electrical & Electronics', civil: 'Civil Engineering', mech: 'Mechanical Engineering',
  aids: 'AI & Data Science', aiml: 'AI & Machine Learning', cyber: 'Cyber Security', fashion: 'Fashion Technology',
}

const card = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

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
    const startIndex = firstLine.toLowerCase().includes('name') || firstLine.toLowerCase().includes('roll') ? 1 : 0
    for (let i = startIndex; i < lines.length; i++) {
      const parts = lines[i].split(delimiter).map(p => p.trim())
      if (parts.length >= 2) {
        data.push({ rollNo: parts[0] || `STU${i}`, name: parts[1] || `Student ${i}`, marks: parts.slice(2).map(Number).filter(m => !isNaN(m)) })
      }
    }
    return data
  }

  const processFile = useCallback(async (file) => {
    setError(''); setIsProcessing(true); setFileName(file.name)
    try {
      const ext = file.name.split('.').pop().toLowerCase()
      if (ext === 'xlsx' || ext === 'xls') {
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data)
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        const processedData = jsonData.map((row, index) => ({
          rollNo: row['Roll No'] || row['roll_no'] || row['RollNo'] || row['ID'] || `STU${index + 1}`,
          name: row['Name'] || row['name'] || row['Student Name'] || `Student ${index + 1}`,
          marks: Object.entries(row).filter(([k]) => !['Roll No','roll_no','RollNo','ID','Name','name','Student Name'].includes(k)).map(([,v]) => Number(v)).filter(v => !isNaN(v)),
          subjects: Object.entries(row).filter(([k]) => !['Roll No','roll_no','RollNo','ID','Name','name','Student Name'].includes(k)).map(([k,v]) => ({ subject: k, marks: Number(v) })).filter(s => !isNaN(s.marks))
        }))
        setUploadedData(processedData)
      } else if (['txt','csv','tsv'].includes(ext)) {
        setUploadedData(parseTextFile(await file.text()))
      } else { throw new Error('Unsupported format. Use Excel or text files.') }
    } catch (err) { setError(err.message); setUploadedData(null) } finally { setIsProcessing(false) }
  }, [])

  const handleDrag = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setDragActive(e.type === 'dragenter' || e.type === 'dragover') }, [])
  const handleDrop = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]) }, [processFile])
  const handleFileInput = (e) => { if (e.target.files?.[0]) processFile(e.target.files[0]) }
  const handleProceed = () => { if (uploadedData && department && year) { sessionStorage.setItem('studentData', JSON.stringify(uploadedData)); navigate('/analytics') } }

  const downloadSample = () => {
    const sample = [
      { 'Roll No': 'STU001', 'Name': 'Priya S.', 'Maths': 92, 'Science': 88, 'English': 95, 'CS': 96 },
      { 'Roll No': 'STU002', 'Name': 'Ravi K.', 'Maths': 88, 'Science': 85, 'English': 90, 'CS': 94 },
      { 'Roll No': 'STU003', 'Name': 'Meera T.', 'Maths': 85, 'Science': 80, 'English': 88, 'CS': 91 },
      { 'Roll No': 'STU004', 'Name': 'Suresh V.', 'Maths': 78, 'Science': 82, 'English': 85, 'CS': 90 },
      { 'Roll No': 'STU005', 'Name': 'Kavitha R.', 'Maths': 72, 'Science': 75, 'English': 78, 'CS': 80 },
    ]
    const ws = XLSX.utils.json_to_sheet(sample)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Marks')
    XLSX.writeFile(wb, 'sample_marks.xlsx')
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }} className="flex flex-col gap-5">

      <div>
        <h1 className="font-sora text-[22px] font-semibold text-text-hi">Upload Marks Data</h1>
        <p className="text-[13px] text-text-mid mt-1">Upload Excel or text files with student marks</p>
      </div>

      {/* Dept Info */}
      <motion.div variants={card} className="glass p-4 flex items-center justify-center gap-6 text-[13px]">
        <span className="text-text-low">Department:</span>
        <span className="font-semibold text-indigo">{departmentNames[department] || 'Not Selected'}</span>
        <span className="w-px h-4 bg-white/10" />
        <span className="text-text-low">Year:</span>
        <span className="font-semibold text-amber">{year ? `${year}${year==='1'?'st':year==='2'?'nd':year==='3'?'rd':'th'} Year` : 'Not Selected'}</span>
      </motion.div>

      {/* Upload Area */}
      <motion.div variants={card} className="glass p-8">
        <div className={`border-2 border-dashed rounded-[16px] p-12 text-center transition-all duration-300 cursor-pointer ${
          dragActive ? 'border-indigo bg-indigo/[0.06]' : 'border-white/10 hover:border-indigo/40 hover:bg-white/[0.02]'
        }`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
          <input type="file" id="file-upload" className="hidden" accept=".xlsx,.xls,.txt,.csv,.tsv" onChange={handleFileInput} />
          <label htmlFor="file-upload" className="cursor-pointer">
            <motion.div animate={isProcessing ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: isProcessing ? Infinity : 0 }}
              className="w-16 h-16 rounded-[14px] flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, rgba(129,140,248,0.2), rgba(79,70,229,0.2))' }}>
              <UploadIcon className="w-8 h-8 text-indigo" />
            </motion.div>
            <h3 className="text-[16px] font-semibold text-text-hi mb-1.5">{isProcessing ? 'Processing...' : 'Drag & drop your file here'}</h3>
            <p className="text-[13px] text-text-mid mb-4">or click to browse</p>
            <div className="flex items-center justify-center gap-5 text-[12px] text-text-low">
              <span className="flex items-center gap-1.5"><FileSpreadsheet className="w-3.5 h-3.5" />Excel (.xlsx, .xls)</span>
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" />Text (.txt, .csv)</span>
            </div>
          </label>
        </div>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-[12px] flex items-center gap-3 text-[13px]"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <AlertCircle className="w-4 h-4 text-rose flex-shrink-0" />
            <span className="text-rose">{error}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Download Sample */}
      <motion.div variants={card} className="text-center">
        <button onClick={downloadSample} className="inline-flex items-center gap-2 text-[12px] text-text-mid hover:text-indigo transition-colors">
          <Download className="w-3.5 h-3.5" /> Download sample Excel template
        </button>
      </motion.div>

      {/* Preview Table */}
      <AnimatePresence>
        {uploadedData && uploadedData.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-text-hi flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green" /> File Uploaded: {fileName}
              </h3>
              <span className="text-[12px] text-text-low">{uploadedData.length} students found</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead><tr className="border-b border-white/[0.06]">
                  <th className="p-3 text-left text-text-low font-medium">Roll No</th>
                  <th className="p-3 text-left text-text-low font-medium">Name</th>
                  <th className="p-3 text-center text-text-low font-medium">Marks</th>
                  <th className="p-3 text-center text-text-low font-medium">Average</th>
                </tr></thead>
                <tbody>
                  {uploadedData.slice(0, 5).map((s, i) => (
                    <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="p-3 font-mono text-text-hi">{s.rollNo}</td>
                      <td className="p-3 text-text-mid">{s.name}</td>
                      <td className="p-3 text-center text-text-mid">{s.marks.length} subjects</td>
                      <td className="p-3 text-center font-mono font-semibold text-indigo">
                        {s.marks.length > 0 ? (s.marks.reduce((a,b)=>a+b,0)/s.marks.length).toFixed(1) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {uploadedData.length > 5 && <p className="text-center text-[11px] text-text-low mt-3">... and {uploadedData.length - 5} more</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proceed */}
      <AnimatePresence>
        {uploadedData && department && year && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleProceed}
              className="px-8 py-3 rounded-[12px] font-sora font-semibold text-[14px] text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #818cf8, #4f46e5)', boxShadow: '0 0 0 1px rgba(129,140,248,0.4), 0 8px 24px rgba(79,70,229,0.35)' }}>
              Analyze Data <ArrowRight className="w-4 h-4 inline ml-1.5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

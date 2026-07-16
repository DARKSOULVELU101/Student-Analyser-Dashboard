'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  PieChart as PieChartIcon,
  TrendingUp,
  Filter,
  Download,
  Calendar,
  Building2,
  GraduationCap,
  BookOpen,
  Users,
  Target,
  ChevronDown,
  FileSpreadsheet
} from 'lucide-react'
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ScatterChart, Scatter, ZAxis
} from 'recharts'

interface AnalyticsProps {
  data: any[]
}

const DEPARTMENTS = ['All', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL']
const YEARS = ['All', '2021', '2022', '2023', '2024', '2025']
const REGULATIONS = ['All', 'R2021', 'R2022', 'R2023', 'R2024']
const SEMESTERS = ['All', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']

const ANNA_UNIVERSITY_SUBJECTS: Record<string, { code: string; name: string; credits: number }[]> = {
  CSE: [
    { code: 'CS8491', name: 'Data Structures', credits: 4 },
    { code: 'CS8492', name: 'Database Management Systems', credits: 4 },
    { code: 'CS8493', name: 'Operating Systems', credits: 4 },
    { code: 'CS8494', name: 'Computer Networks', credits: 4 },
    { code: 'CS8495', name: 'Algorithm Design & Analysis', credits: 4 },
    { code: 'CS8496', name: 'Software Engineering', credits: 3 },
    { code: 'MA8491', name: 'Discrete Mathematics', credits: 4 },
    { code: 'CS8497', name: 'Compiler Design', credits: 4 },
  ],
  ECE: [
    { code: 'EC8491', name: 'Signals & Systems', credits: 4 },
    { code: 'EC8492', name: 'Analog Electronics', credits: 4 },
    { code: 'EC8493', name: 'Digital Electronics', credits: 4 },
    { code: 'EC8494', name: 'Communication Systems', credits: 4 },
    { code: 'EC8495', name: 'VLSI Design', credits: 4 },
    { code: 'EC8496', name: 'Embedded Systems', credits: 3 },
    { code: 'MA8491', name: 'Engineering Mathematics', credits: 4 },
    { code: 'EC8497', name: 'DSP', credits: 4 },
  ],
  EEE: [
    { code: 'EE8491', name: 'Circuit Theory', credits: 4 },
    { code: 'EE8492', name: 'Electrical Machines', credits: 4 },
    { code: 'EE8493', name: 'Power Systems', credits: 4 },
    { code: 'EE8494', name: 'Control Systems', credits: 4 },
    { code: 'EE8495', name: 'Power Electronics', credits: 4 },
    { code: 'EE8496', name: 'Instrumentation', credits: 3 },
    { code: 'MA8491', name: 'Mathematics', credits: 4 },
    { code: 'EE8497', name: 'Digital Electronics', credits: 4 },
  ],
  MECH: [
    { code: 'ME8491', name: 'Engineering Mechanics', credits: 4 },
    { code: 'ME8492', name: 'Thermodynamics', credits: 4 },
    { code: 'ME8493', name: 'Fluid Mechanics', credits: 4 },
    { code: 'ME8494', name: 'Manufacturing Tech', credits: 4 },
    { code: 'ME8495', name: 'Machine Design', credits: 4 },
    { code: 'ME8496', name: 'CAD/CAM', credits: 3 },
    { code: 'MA8491', name: 'Mathematics', credits: 4 },
    { code: 'ME8497', name: 'Heat Transfer', credits: 4 },
  ],
  CIVIL: [
    { code: 'CE8491', name: 'Structural Analysis', credits: 4 },
    { code: 'CE8492', name: 'Geotechnical Engg', credits: 4 },
    { code: 'CE8493', name: 'Surveying', credits: 4 },
    { code: 'CE8494', name: 'Transportation Engg', credits: 4 },
    { code: 'CE8495', name: 'Environmental Engg', credits: 4 },
    { code: 'CE8496', name: 'Construction Tech', credits: 3 },
    { code: 'MA8491', name: 'Mathematics', credits: 4 },
    { code: 'CE8497', name: 'Estimation & Costing', credits: 4 },
  ],
}

export default function Analytics({ data }: AnalyticsProps) {
  const [activeChart, setActiveChart] = useState('performance')
  const [viewMode, setViewMode] = useState<'year' | 'department'>('year')
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedRegulation, setSelectedRegulation] = useState('All')
  const [selectedSemester, setSelectedSemester] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Filter data based on selections
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return generateMockData()
    return data.filter(d => {
      if (selectedDept !== 'All' && d.department !== selectedDept) return false
      if (selectedYear !== 'All' && d.year !== selectedYear) return false
      if (selectedSemester !== 'All' && d.semester !== selectedSemester) return false
      return true
    })
  }, [data, selectedDept, selectedYear, selectedSemester])

  function generateMockData() {
    const depts = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL']
    const yrs = ['2021', '2022', '2023', '2024', '2025']
    const sems = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
    const mock = []
    for (let i = 0; i < 500; i++) {
      const dept = depts[Math.floor(Math.random() * depts.length)]
      const yr = yrs[Math.floor(Math.random() * yrs.length)]
      const sem = sems[Math.floor(Math.random() * sems.length)]
      const internal = 30 + Math.floor(Math.random() * 20)
      const assignment = 15 + Math.floor(Math.random() * 10)
      const lab = 25 + Math.floor(Math.random() * 25)
      const semExam = 40 + Math.floor(Math.random() * 60)
      mock.push({
        id: `SKEC${i + 1}`,
        name: `Student ${i + 1}`,
        department: dept,
        year: yr,
        semester: sem,
        internal,
        assignment,
        lab,
        semesterExam: semExam,
        total: internal + assignment + lab + semExam,
        gpa: +(2 + Math.random() * 8).toFixed(2),
        attendance: 55 + Math.floor(Math.random() * 45),
      })
    }
    return mock
  }

  const exportChartData = (chartName: string, chartData: any[]) => {
    const csv = [
      Object.keys(chartData[0]).join(','),
      ...chartData.map(row => Object.values(row).join(','))
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${chartName.replace(/\s+/g, '_')}_export.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ===== COMPUTED DATA =====
  const yearWiseData = useMemo(() => {
    const years = ['2021', '2022', '2023', '2024', '2025']
    return years.map(yr => {
      const yearStudents = filteredData.filter(d => d.year === yr)
      const avg = yearStudents.length ? Math.round(yearStudents.reduce((s, d) => s + d.total, 0) / yearStudents.length / 2.8) : 0
      const pass = yearStudents.length ? Math.round((yearStudents.filter(d => d.gpa >= 4).length / yearStudents.length) * 100) : 0
      return { year: yr, avg, pass, students: yearStudents.length, topPerformers: yearStudents.filter(d => d.gpa >= 8.5).length }
    })
  }, [filteredData])

  const semDeptData = useMemo(() => {
    const sems = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
    const depts = selectedDept === 'All' ? ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'] : [selectedDept]
    return sems.map(sem => {
      const row: any = { semester: sem }
      depts.forEach(dept => {
        const students = filteredData.filter(d => d.semester === sem && d.department === dept)
        row[dept] = students.length ? Math.round(students.reduce((s, d) => s + d.gpa, 0) / students.length * 10) : 0
      })
      return row
    })
  }, [filteredData, selectedDept])

  const subjectData = useMemo(() => {
    const dept = selectedDept === 'All' ? 'CSE' : selectedDept
    const subjects = ANNA_UNIVERSITY_SUBJECTS[dept] || ANNA_UNIVERSITY_SUBJECTS.CSE
    return subjects.map(sub => {
      const baseAvg = 60 + Math.random() * 25
      return {
        subject: sub.name,
        code: sub.code,
        credits: sub.credits,
        avg: Math.round(baseAvg),
        max: Math.min(100, Math.round(baseAvg + 15 + Math.random() * 10)),
        min: Math.max(10, Math.round(baseAvg - 25 - Math.random() * 15)),
        passRate: Math.round(75 + Math.random() * 20),
      }
    })
  }, [selectedDept])

  const radarData = useMemo(() => {
    const dept = selectedDept === 'All' ? 'CSE' : selectedDept
    const subjects = ANNA_UNIVERSITY_SUBJECTS[dept] || ANNA_UNIVERSITY_SUBJECTS.CSE
    return subjects.slice(0, 6).map(sub => ({
      subject: sub.name.substring(0, 12),
      score: 60 + Math.floor(Math.random() * 35),
      fullMark: 100,
    }))
  }, [selectedDept])

  const attendanceVsScore = useMemo(() => {
    return filteredData.slice(0, 80).map(d => ({
      attendance: d.attendance,
      score: d.total,
      gpa: d.gpa,
    }))
  }, [filteredData])

  const deptPassedData = useMemo(() => {
    const depts = selectedDept === 'All' ? ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'] : [selectedDept]
    return depts.map(dept => {
      const students = filteredData.filter(d => d.department === dept)
      const passed = students.filter(d => d.gpa >= 4).length
      const failed = students.length - passed
      return { dept, passed, failed, total: students.length }
    })
  }, [filteredData, selectedDept])

  const perfDistribution = useMemo(() => {
    const excellent = filteredData.filter(d => d.gpa >= 8.5).length
    const good = filteredData.filter(d => d.gpa >= 7 && d.gpa < 8.5).length
    const average = filteredData.filter(d => d.gpa >= 5 && d.gpa < 7).length
    const below = filteredData.filter(d => d.gpa < 5).length
    return [
      { name: 'Excellent (8.5+)', value: excellent, color: '#34C759' },
      { name: 'Good (7-8.4)', value: good, color: '#007AFF' },
      { name: 'Average (5-6.9)', value: average, color: '#FF9500' },
      { name: 'Below Avg (<5)', value: below, color: '#FF3B30' },
    ]
  }, [filteredData])

  const deptPerformance = useMemo(() => {
    const depts = selectedDept === 'All' ? ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'] : [selectedDept]
    return depts.map(dept => {
      const students = filteredData.filter(d => d.department === dept)
      const avgGpa = students.length ? +(students.reduce((s, d) => s + d.gpa, 0) / students.length).toFixed(2) : 0
      const avgAttendance = students.length ? Math.round(students.reduce((s, d) => s + d.attendance, 0) / students.length) : 0
      const passRate = students.length ? Math.round((students.filter(d => d.gpa >= 4).length / students.length) * 100) : 0
      const avgInternal = students.length ? Math.round(students.reduce((s, d) => s + d.internal, 0) / students.length) : 0
      return { dept, students: students.length, avgGpa, avgAttendance, passRate, avgInternal }
    })
  }, [filteredData, selectedDept])

  const overallStats = useMemo(() => ({
    total: filteredData.length,
    avgGpa: filteredData.length ? +(filteredData.reduce((s, d) => s + d.gpa, 0) / filteredData.length).toFixed(2) : 0,
    passRate: filteredData.length ? Math.round((filteredData.filter(d => d.gpa >= 4).length / filteredData.length) * 100) : 0,
    avgAttendance: filteredData.length ? Math.round(filteredData.reduce((s, d) => s + d.attendance, 0) / filteredData.length) : 0,
  }), [filteredData])

  const chartOptions = [
    { id: 'performance', label: 'Sem & Dept', icon: TrendingUp },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'correlation', label: 'Correlation', icon: PieChartIcon },
    { id: 'dept-perf', label: 'Dept Performance', icon: Building2 },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-3 border border-white/40">
          <p className="text-sm font-semibold text-[#1D1D1F] mb-1">{label}</p>
          {payload.map((entry: any, i: number) => (
            <p key={i} className="text-xs text-[#6E6E73]">
              {entry.name}: <span className="font-semibold text-[#1D1D1F]">{entry.value}</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const itemV = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } }

  const FilterBlock = () => (
    <motion.div variants={itemV} className="glass-card rounded-3xl p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-[#007AFF]" />
        <span className="text-sm font-bold text-[#1D1D1F]">Filters</span>
        <span className="text-xs text-[#AEAEB2] ml-auto">Anna University Chennai</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Department', value: selectedDept, set: setSelectedDept, options: DEPARTMENTS },
          { label: 'Year', value: selectedYear, set: setSelectedYear, options: YEARS },
          { label: 'Regulation', value: selectedRegulation, set: setSelectedRegulation, options: REGULATIONS },
          { label: 'Semester', value: selectedSemester, set: setSelectedSemester, options: SEMESTERS },
        ].map(f => (
          <div key={f.label}>
            <label className="text-xs font-semibold text-[#6E6E73] mb-1 block">{f.label}</label>
            <div className="relative">
              <select
                value={f.value}
                onChange={e => f.set(e.target.value)}
                className="w-full appearance-none bg-white/50 border border-white/40 rounded-xl px-3 py-2.5 pr-8 text-sm font-medium text-[#1D1D1F] focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-all cursor-pointer"
              >
                {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEAEB2] pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mt-4">
        {[
          { label: 'Total Students', value: overallStats.total, color: '#007AFF' },
          { label: 'Avg GPA', value: overallStats.avgGpa, color: '#5856D6' },
          { label: 'Pass Rate', value: `${overallStats.passRate}%`, color: '#34C759' },
          { label: 'Avg Attendance', value: `${overallStats.avgAttendance}%`, color: '#FF9500' },
        ].map(s => (
          <div key={s.label} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/40 border border-white/30">
            <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            <span className="text-xs text-[#6E6E73]">{s.label}:</span>
            <span className="text-xs font-bold text-[#1D1D1F]">{s.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )

  return (
    <section ref={ref} className="py-28 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={containerV} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={itemV} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1D1D1F] mb-2">Advanced Analytics</h2>
              <p className="text-[#6E6E73]">Anna University Chennai - Department & Subject Analysis</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button
                onClick={() => exportChartData('analytics-overview', filteredData)}
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </motion.div>

          <FilterBlock />

          {/* View Mode + Chart Tabs */}
          <motion.div variants={itemV} className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex gap-2">
              <motion.button onClick={() => setViewMode('year')} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${viewMode === 'year' ? 'text-white' : 'glass-card text-[#6E6E73]'}`} style={viewMode === 'year' ? { background: 'linear-gradient(135deg, #007AFF, #5856D6)', boxShadow: '0 4px 16px rgba(0,122,255,0.3)' } : {}} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Calendar className="w-4 h-4" /> Year-wise
              </motion.button>
              <motion.button onClick={() => setViewMode('department')} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${viewMode === 'department' ? 'text-white' : 'glass-card text-[#6E6E73]'}`} style={viewMode === 'department' ? { background: 'linear-gradient(135deg, #5856D6, #AF52DE)', boxShadow: '0 4px 16px rgba(88,86,214,0.3)' } : {}} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Building2 className="w-4 h-4" /> Department-wise
              </motion.button>
            </div>
            <div className="flex gap-1 sm:ml-auto overflow-x-auto">
              {chartOptions.map(opt => (
                <motion.button key={opt.id} onClick={() => setActiveChart(opt.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${activeChart === opt.id ? 'text-white' : 'glass-card text-[#6E6E73]'}`} style={activeChart === opt.id ? { background: 'linear-gradient(135deg, #007AFF, #5856D6)', boxShadow: '0 4px 12px rgba(0,122,255,0.25)' } : {}} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <opt.icon className="w-3.5 h-3.5" /> {opt.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Year / Dept Overview */}
          <AnimatePresence mode="wait">
            <motion.div key={viewMode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {viewMode === 'year' ? (
                <>
                  <div className="glass-card rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-[#1D1D1F]">Year-wise Performance</h3>
                      <button onClick={() => exportChartData('year-performance', yearWiseData)} className="p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer"><FileSpreadsheet className="w-4 h-4 text-[#AEAEB2]" /></button>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                      <AreaChart data={yearWiseData}>
                        <defs><linearGradient id="gAvg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#007AFF" stopOpacity={0.2}/><stop offset="95%" stopColor="#007AFF" stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                        <XAxis dataKey="year" stroke="#AEAEB2" />
                        <YAxis stroke="#AEAEB2" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area type="monotone" dataKey="avg" stroke="#007AFF" fillOpacity={1} fill="url(#gAvg)" strokeWidth={2.5} name="Avg %" />
                        <Area type="monotone" dataKey="pass" stroke="#34C759" fillOpacity={0.1} fill="#34C759" strokeWidth={2} name="Pass %" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="glass-card rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-[#1D1D1F]">Year-wise Students & Top Performers</h3>
                      <button onClick={() => exportChartData('year-students', yearWiseData)} className="p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer"><FileSpreadsheet className="w-4 h-4 text-[#AEAEB2]" /></button>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={yearWiseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                        <XAxis dataKey="year" stroke="#AEAEB2" />
                        <YAxis stroke="#AEAEB2" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="students" fill="#007AFF" radius={[8, 8, 0, 0]} name="Students" />
                        <Bar dataKey="topPerformers" fill="#34C759" radius={[8, 8, 0, 0]} name="Top Performers" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              ) : (
                <>
                  <div className="glass-card rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-[#1D1D1F]">Department-wise Students</h3>
                      <button onClick={() => exportChartData('dept-students', deptPassedData)} className="p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer"><FileSpreadsheet className="w-4 h-4 text-[#AEAEB2]" /></button>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={deptPassedData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                        <XAxis dataKey="dept" stroke="#AEAEB2" />
                        <YAxis stroke="#AEAEB2" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="passed" fill="#34C759" radius={[8, 8, 0, 0]} name="Passed" />
                        <Bar dataKey="failed" fill="#FF3B30" radius={[8, 8, 0, 0]} name="Failed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="glass-card rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-[#1D1D1F]">Dept Performance Radar</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                      <RadarChart data={deptPerformance.map(d => ({ subject: d.dept, A: d.passRate }))}>
                        <PolarGrid stroke="#E5E5EA" />
                        <PolarAngleAxis dataKey="subject" stroke="#AEAEB2" />
                        <PolarRadiusAxis stroke="#AEAEB2" />
                        <Radar name="Pass Rate" dataKey="A" stroke="#007AFF" fill="#007AFF" fillOpacity={0.3} strokeWidth={2} />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Main Chart Sections */}
          <AnimatePresence mode="wait">
            {activeChart === 'performance' && (
              <motion.div key="perf" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Semester-wise Dept Analysis</h3>
                    <button onClick={() => exportChartData('sem-dept', semDeptData)} className="p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer"><FileSpreadsheet className="w-4 h-4 text-[#AEAEB2]" /></button>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={semDeptData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                      <XAxis dataKey="semester" stroke="#AEAEB2" />
                      <YAxis stroke="#AEAEB2" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      {(selectedDept === 'All' ? ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'] : [selectedDept]).map((dept, i) => (
                        <Bar key={dept} dataKey={dept} fill={['#007AFF', '#5856D6', '#34C759', '#FF9500', '#AF52DE'][i]} radius={[6, 6, 0, 0]} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Dept-wise Performance</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={deptPerformance.map(d => ({ subject: d.dept, A: d.avgGpa * 10, B: d.avgAttendance, fullMark: 100 }))}>
                      <PolarGrid stroke="#E5E5EA" />
                      <PolarAngleAxis dataKey="subject" stroke="#AEAEB2" />
                      <PolarRadiusAxis stroke="#AEAEB2" />
                      <Radar name="GPA x10" dataKey="A" stroke="#007AFF" fill="#007AFF" fillOpacity={0.25} strokeWidth={2} />
                      <Radar name="Attendance" dataKey="B" stroke="#34C759" fill="#34C759" fillOpacity={0.15} strokeWidth={2} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeChart === 'subjects' && (
              <motion.div key="subj" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Subject-wise Analysis ({selectedDept === 'All' ? 'CSE' : selectedDept})</h3>
                    <button onClick={() => exportChartData('subject-analysis', subjectData)} className="p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer"><FileSpreadsheet className="w-4 h-4 text-[#AEAEB2]" /></button>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={subjectData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                      <XAxis type="number" stroke="#AEAEB2" />
                      <YAxis dataKey="subject" type="category" stroke="#AEAEB2" width={120} tick={{ fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="avg" fill="#007AFF" radius={[0, 6, 6, 0]} name="Avg" />
                      <Bar dataKey="max" fill="#34C759" radius={[0, 6, 6, 0]} name="Max" />
                      <Bar dataKey="min" fill="#FF3B30" radius={[0, 6, 6, 0]} name="Min" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Skill Radar - {selectedDept === 'All' ? 'CSE' : selectedDept}</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#E5E5EA" />
                      <PolarAngleAxis dataKey="subject" stroke="#AEAEB2" tick={{ fontSize: 10 }} />
                      <PolarRadiusAxis stroke="#AEAEB2" />
                      <Radar name="Score" dataKey="score" stroke="#5856D6" fill="#5856D6" fillOpacity={0.3} strokeWidth={2} />
                      <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeChart === 'correlation' && (
              <motion.div key="corr" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Attendance vs Score</h3>
                    <button onClick={() => exportChartData('attendance-score', attendanceVsScore)} className="p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer"><FileSpreadsheet className="w-4 h-4 text-[#AEAEB2]" /></button>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                      <XAxis dataKey="attendance" name="Attendance %" stroke="#AEAEB2" label={{ value: 'Attendance %', position: 'bottom', fill: '#AEAEB2', fontSize: 11 }} />
                      <YAxis dataKey="score" name="Score" stroke="#AEAEB2" label={{ value: 'Total Score', angle: -90, position: 'insideLeft', fill: '#AEAEB2', fontSize: 11 }} />
                      <ZAxis dataKey="gpa" range={[30, 300]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Scatter data={attendanceVsScore} fill="#007AFF" fillOpacity={0.6} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Dept vs Passed Count</h3>
                    <button onClick={() => exportChartData('dept-passed', deptPassedData)} className="p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer"><FileSpreadsheet className="w-4 h-4 text-[#AEAEB2]" /></button>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={deptPassedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                      <XAxis dataKey="dept" stroke="#AEAEB2" />
                      <YAxis stroke="#AEAEB2" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="passed" fill="#34C759" radius={[8, 8, 0, 0]} name="Passed" />
                      <Bar dataKey="failed" fill="#FF3B30" radius={[8, 8, 0, 0]} name="Failed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card rounded-3xl p-6 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Performance Distribution</h3>
                    <button onClick={() => exportChartData('perf-distribution', perfDistribution)} className="p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer"><FileSpreadsheet className="w-4 h-4 text-[#AEAEB2]" /></button>
                  </div>
                  <div className="flex justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={perfDistribution} cx="50%" cy="50%" outerRadius={110} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {perfDistribution.map((entry, i) => <Cell key={i} fill={entry.color} stroke="white" strokeWidth={2} />)}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {activeChart === 'dept-perf' && (
              <motion.div key="dept" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="glass-card rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Department Wise Performance Analysis</h3>
                    <button onClick={() => exportChartData('dept-performance', deptPerformance)} className="p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer"><FileSpreadsheet className="w-4 h-4 text-[#AEAEB2]" /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {deptPerformance.map((dept, i) => (
                      <motion.div key={dept.dept} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-5 rounded-2xl bg-white/40 border border-white/30">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(135deg, ${['#007AFF', '#5856D6', '#34C759', '#FF9500', '#AF52DE'][i]}, ${['#007AFF', '#5856D6', '#34C759', '#FF9500', '#AF52DE'][i]}99)` }}>
                            {dept.dept}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#1D1D1F]">{dept.dept}</div>
                            <div className="text-xs text-[#6E6E73]">{dept.students} students</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-center p-2 rounded-xl bg-white/50">
                            <div className="text-lg font-extrabold text-[#1D1D1F]">{dept.avgGpa}</div>
                            <div className="text-xs text-[#6E6E73]">Avg GPA</div>
                          </div>
                          <div className="text-center p-2 rounded-xl bg-white/50">
                            <div className="text-lg font-extrabold text-[#1D1D1F]">{dept.passRate}%</div>
                            <div className="text-xs text-[#6E6E73]">Pass Rate</div>
                          </div>
                          <div className="text-center p-2 rounded-xl bg-white/50">
                            <div className="text-lg font-extrabold text-[#1D1D1F]">{dept.avgAttendance}%</div>
                            <div className="text-xs text-[#6E6E73]">Attendance</div>
                          </div>
                          <div className="text-center p-2 rounded-xl bg-white/50">
                            <div className="text-lg font-extrabold text-[#1D1D1F]">{dept.avgInternal}</div>
                            <div className="text-xs text-[#6E6E73]">Avg Internal</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={deptPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                      <XAxis dataKey="dept" stroke="#AEAEB2" />
                      <YAxis stroke="#AEAEB2" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="avgGpa" fill="#007AFF" radius={[8, 8, 0, 0]} name="Avg GPA" />
                      <Bar dataKey="passRate" fill="#34C759" radius={[8, 8, 0, 0]} name="Pass Rate %" />
                      <Bar dataKey="avgAttendance" fill="#FF9500" radius={[8, 8, 0, 0]} name="Avg Attendance %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

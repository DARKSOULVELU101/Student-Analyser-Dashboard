'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  PieChart as PieChartIcon,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Building2
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts'

interface AnalyticsProps {
  data: any[]
}

export default function Analytics({ data }: AnalyticsProps) {
  const [activeChart, setActiveChart] = useState('performance')
  const [viewMode, setViewMode] = useState<'year' | 'department'>('year')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Year-wise data
  const yearWiseData = [
    { year: '2021', avg: 72, pass: 85, fail: 15, topPerformers: 12 },
    { year: '2022', avg: 75, pass: 88, fail: 12, topPerformers: 15 },
    { year: '2023', avg: 78, pass: 90, fail: 10, topPerformers: 18 },
    { year: '2024', avg: 82, pass: 92, fail: 8, topPerformers: 22 },
    { year: '2025', avg: 85, pass: 94, fail: 6, topPerformers: 25 },
  ]

  // Department-wise data
  const departmentWiseData = [
    { dept: 'CSE', sem1: 78, sem2: 82, sem3: 80, sem4: 85, sem5: 88, sem6: 90, sem7: 92, sem8: 94 },
    { dept: 'ECE', sem1: 75, sem2: 78, sem3: 76, sem4: 80, sem5: 83, sem6: 85, sem7: 87, sem8: 89 },
    { dept: 'EEE', sem1: 72, sem2: 75, sem3: 73, sem4: 78, sem5: 80, sem6: 82, sem7: 84, sem8: 86 },
    { dept: 'MECH', sem1: 70, sem2: 72, sem3: 71, sem4: 75, sem5: 78, sem6: 80, sem7: 82, sem8: 84 },
    { dept: 'CIVIL', sem1: 68, sem2: 70, sem3: 69, sem4: 73, sem5: 76, sem6: 78, sem7: 80, sem8: 82 },
  ]

  const performanceMetrics = [
    { month: 'Sem 1', pass: 85, fail: 15, avg: 72 },
    { month: 'Sem 2', pass: 88, fail: 12, avg: 75 },
    { month: 'Sem 3', pass: 82, fail: 18, avg: 70 },
    { month: 'Sem 4', pass: 90, fail: 10, avg: 78 },
    { month: 'Sem 5', pass: 87, fail: 13, avg: 76 },
    { month: 'Sem 6', pass: 92, fail: 8, avg: 82 },
    { month: 'Sem 7', pass: 89, fail: 11, avg: 79 },
    { month: 'Sem 8', pass: 94, fail: 6, avg: 85 },
  ]

  const subjectWise = [
    { subject: 'Mathematics', avg: 75, max: 98, min: 35 },
    { subject: 'Physics', avg: 78, max: 96, min: 42 },
    { subject: 'Chemistry', avg: 72, max: 94, min: 38 },
    { subject: 'Programming', avg: 82, max: 100, min: 45 },
    { subject: 'Data Structures', avg: 79, max: 99, min: 40 },
    { subject: 'Database', avg: 76, max: 97, min: 36 },
  ]

  const radarData = [
    { subject: 'Math', A: 85, fullMark: 100 },
    { subject: 'Physics', A: 78, fullMark: 100 },
    { subject: 'Programming', A: 92, fullMark: 100 },
    { subject: 'Database', A: 75, fullMark: 100 },
    { subject: 'Networks', A: 80, fullMark: 100 },
    { subject: 'OS', A: 88, fullMark: 100 },
  ]

  const correlationData = [
    { attendance: 95, marks: 88, size: 20 },
    { attendance: 88, marks: 82, size: 18 },
    { attendance: 75, marks: 68, size: 15 },
    { attendance: 92, marks: 85, size: 19 },
    { attendance: 65, marks: 55, size: 12 },
    { attendance: 85, marks: 78, size: 17 },
    { attendance: 70, marks: 62, size: 14 },
    { attendance: 98, marks: 92, size: 22 },
  ]

  const chartOptions = [
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'subjects', label: 'Subjects', icon: BarChart3 },
    { id: 'correlation', label: 'Correlation', icon: PieChartIcon },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-3 border border-white/40">
          <p className="text-sm font-semibold text-[#1D1D1F] mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs text-[#6E6E73]">
              {entry.name}: <span className="font-semibold text-[#1D1D1F]">{entry.value}</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  return (
    <section ref={ref} className="py-28 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1D1D1F] mb-2">Advanced Analytics</h2>
              <p className="text-[#6E6E73]">Deep dive into student performance metrics</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </motion.div>

          {/* View Mode Toggle */}
          <motion.div variants={itemVariants} className="flex gap-3 mb-6">
            <motion.button
              onClick={() => setViewMode('year')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                viewMode === 'year' ? 'text-white' : 'glass-card text-[#6E6E73]'
              }`}
              style={viewMode === 'year' ? { 
                background: 'linear-gradient(135deg, #007AFF, #5856D6)',
                boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)'
              } : {}}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Calendar className="w-4 h-4" />
              Year-wise
            </motion.button>
            <motion.button
              onClick={() => setViewMode('department')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                viewMode === 'department' ? 'text-white' : 'glass-card text-[#6E6E73]'
              }`}
              style={viewMode === 'department' ? { 
                background: 'linear-gradient(135deg, #5856D6, #AF52DE)',
                boxShadow: '0 4px 16px rgba(88, 86, 214, 0.3)'
              } : {}}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Building2 className="w-4 h-4" />
              Department-wise
            </motion.button>
          </motion.div>

          {/* Year-wise / Department-wise Charts */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            >
              {viewMode === 'year' ? (
                <>
                  <div className="glass-card rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Year-wise Performance Trend</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={yearWiseData}>
                        <defs>
                          <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#007AFF" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                        <XAxis dataKey="year" stroke="#AEAEB2" />
                        <YAxis stroke="#AEAEB2" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area type="monotone" dataKey="avg" stroke="#007AFF" fillOpacity={1} fill="url(#colorAvg)" strokeWidth={2.5} name="Average" />
                        <Area type="monotone" dataKey="pass" stroke="#34C759" fillOpacity={0.1} fill="#34C759" strokeWidth={2} name="Pass %" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="glass-card rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Year-wise Top Performers</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={yearWiseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                        <XAxis dataKey="year" stroke="#AEAEB2" />
                        <YAxis stroke="#AEAEB2" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="topPerformers" fill="#5856D6" radius={[8, 8, 0, 0]} name="Top Performers %" />
                        <Bar dataKey="fail" fill="#FF3B30" radius={[8, 8, 0, 0]} name="Fail %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              ) : (
                <>
                  <div className="glass-card rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Department-wise Average</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={departmentWiseData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                        <XAxis type="number" stroke="#AEAEB2" />
                        <YAxis dataKey="dept" type="category" stroke="#AEAEB2" width={60} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="sem8" fill="#007AFF" radius={[0, 8, 8, 0]} name="8th Sem" />
                        <Bar dataKey="sem4" fill="#5856D6" radius={[0, 8, 8, 0]} name="4th Sem" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="glass-card rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Department Progression</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <RadarChart data={departmentWiseData.map(d => ({ subject: d.dept, A: d.sem8 }))}>
                        <PolarGrid stroke="#E5E5EA" />
                        <PolarAngleAxis dataKey="subject" stroke="#AEAEB2" />
                        <PolarRadiusAxis stroke="#AEAEB2" />
                        <Radar name="Performance" dataKey="A" stroke="#007AFF" fill="#007AFF" fillOpacity={0.3} strokeWidth={2} />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Chart Tabs */}
          <motion.div variants={itemVariants} className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {chartOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setActiveChart(option.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeChart === option.id
                    ? 'text-white'
                    : 'glass-card text-[#6E6E73]'
                }`}
                style={activeChart === option.id ? { 
                  background: 'linear-gradient(135deg, #007AFF, #5856D6)',
                  boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)'
                } : {}}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <option.icon className="w-4 h-4" />
                {option.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Detailed Charts */}
          <AnimatePresence mode="wait">
            {activeChart === 'performance' && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div className="glass-card rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Semester Performance</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={performanceMetrics}>
                      <defs>
                        <linearGradient id="colorPass2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#34C759" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#34C759" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                      <XAxis dataKey="month" stroke="#AEAEB2" />
                      <YAxis stroke="#AEAEB2" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area type="monotone" dataKey="pass" stroke="#34C759" fillOpacity={1} fill="url(#colorPass2)" strokeWidth={2.5} name="Pass %" />
                      <Area type="monotone" dataKey="avg" stroke="#FF9500" fillOpacity={0.1} fill="#FF9500" strokeWidth={2} name="Average" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass-card rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Study Hours vs Score</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                      <XAxis dataKey="month" stroke="#AEAEB2" />
                      <YAxis stroke="#AEAEB2" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="pass" fill="#007AFF" radius={[8, 8, 0, 0]} name="Pass %" />
                      <Bar dataKey="fail" fill="#FF3B30" radius={[8, 8, 0, 0]} name="Fail %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeChart === 'subjects' && (
              <motion.div
                key="subjects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div className="glass-card rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Subject-wise Analysis</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={subjectWise} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                      <XAxis type="number" stroke="#AEAEB2" />
                      <YAxis dataKey="subject" type="category" stroke="#AEAEB2" width={100} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="avg" fill="#007AFF" radius={[0, 8, 8, 0]} name="Average" />
                      <Bar dataKey="max" fill="#34C759" radius={[0, 8, 8, 0]} name="Max" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass-card rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Skill Radar</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#E5E5EA" />
                      <PolarAngleAxis dataKey="subject" stroke="#AEAEB2" />
                      <PolarRadiusAxis stroke="#AEAEB2" />
                      <Radar name="Skills" dataKey="A" stroke="#007AFF" fill="#007AFF" fillOpacity={0.3} strokeWidth={2} />
                      <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeChart === 'correlation' && (
              <motion.div
                key="correlation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div className="glass-card rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Attendance vs Marks</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                      <XAxis dataKey="attendance" name="Attendance" stroke="#AEAEB2" label={{ value: 'Attendance %', position: 'bottom', fill: '#AEAEB2' }} />
                      <YAxis dataKey="marks" name="Marks" stroke="#AEAEB2" label={{ value: 'Marks', angle: -90, position: 'insideLeft', fill: '#AEAEB2' }} />
                      <ZAxis dataKey="size" range={[40, 400]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Scatter data={correlationData} fill="#007AFF" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass-card rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Performance Distribution</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Excellent (90+)', value: 25, color: '#34C759' },
                          { name: 'Good (75-89)', value: 40, color: '#007AFF' },
                          { name: 'Average (60-74)', value: 20, color: '#FF9500' },
                          { name: 'Below Avg (<60)', value: 15, color: '#FF3B30' },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { color: '#34C759' },
                          { color: '#007AFF' },
                          { color: '#FF9500' },
                          { color: '#FF3B30' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
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

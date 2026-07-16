'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  PieChart as PieChartIcon,
  TrendingUp,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
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

  const radarData = [
    { subject: 'Math', A: 85, fullMark: 100 },
    { subject: 'Physics', A: 78, fullMark: 100 },
    { subject: 'Programming', A: 92, fullMark: 100 },
    { subject: 'Database', A: 75, fullMark: 100 },
    { subject: 'Networks', A: 80, fullMark: 100 },
    { subject: 'OS', A: 88, fullMark: 100 },
  ]

  const heatmapData = [
    { day: 'Mon', hours: 8, score: 75 },
    { day: 'Tue', hours: 6, score: 72 },
    { day: 'Wed', hours: 9, score: 82 },
    { day: 'Thu', hours: 7, score: 78 },
    { day: 'Fri', hours: 5, score: 68 },
    { day: 'Sat', hours: 4, score: 65 },
    { day: 'Sun', hours: 2, score: 55 },
  ]

  const chartOptions = [
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'subjects', label: 'Subjects', icon: BarChart3 },
    { id: 'correlation', label: 'Correlation', icon: PieChartIcon },
  ]

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Advanced Analytics</h2>
            <p className="text-dark-400">Deep dive into student performance metrics</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm text-dark-300 hover:text-white transition-colors cursor-pointer">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm text-dark-300 hover:text-white transition-colors cursor-pointer">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm text-dark-300 hover:text-white transition-colors cursor-pointer">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Chart Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2"
        >
          {chartOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveChart(option.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeChart === option.id
                  ? 'bg-primary-600 text-white glow-blue'
                  : 'glass text-dark-300 hover:text-white'
              }`}
            >
              <option.icon className="w-4 h-4" />
              {option.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeChart === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Semester Performance</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={performanceMetrics}>
                    <defs>
                      <linearGradient id="colorPass" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
                    <Legend />
                    <Area type="monotone" dataKey="pass" stroke="#22c55e" fillOpacity={1} fill="url(#colorPass)" />
                    <Line type="monotone" dataKey="avg" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Study Hours vs Score</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={heatmapData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
                    <Legend />
                    <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="score" fill="#f59e0b" radius={[4, 4, 0, 0]} />
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
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Subject-wise Analysis</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={subjectWise} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis dataKey="subject" type="category" stroke="#94a3b8" width={100} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
                    <Legend />
                    <Bar dataKey="avg" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="max" fill="#22c55e" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Skill Radar</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                    <PolarRadiusAxis stroke="#94a3b8" />
                    <Radar name="Skills" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
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
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Attendance vs Marks</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="attendance" name="Attendance" stroke="#94a3b8" label={{ value: 'Attendance %', position: 'bottom', fill: '#94a3b8' }} />
                    <YAxis dataKey="marks" name="Marks" stroke="#94a3b8" label={{ value: 'Marks', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                    <ZAxis dataKey="size" range={[40, 400]} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
                    <Scatter data={correlationData} fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Distribution</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Excellent (90+)', value: 25, color: '#22c55e' },
                        { name: 'Good (75-89)', value: 40, color: '#3b82f6' },
                        { name: 'Average (60-74)', value: 20, color: '#f59e0b' },
                        { name: 'Below Avg (<60)', value: 15, color: '#ef4444' },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { color: '#22c55e' },
                        { color: '#3b82f6' },
                        { color: '#f59e0b' },
                        { color: '#ef4444' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  Award, 
  AlertTriangle,
  Clock,
  Target
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts'

interface DashboardProps {
  data: any[]
}

export default function Dashboard({ data }: DashboardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const performanceData = [
    { month: 'Jan', average: 78, toppers: 92, needsImprovement: 45 },
    { month: 'Feb', average: 82, toppers: 95, needsImprovement: 48 },
    { month: 'Mar', average: 79, toppers: 93, needsImprovement: 42 },
    { month: 'Apr', average: 85, toppers: 97, needsImprovement: 52 },
    { month: 'May', average: 88, toppers: 98, needsImprovement: 55 },
    { month: 'Jun', average: 91, toppers: 99, needsImprovement: 58 },
  ]

  const gradeDistribution = [
    { name: 'O', value: 45, color: '#34C759' },
    { name: 'A+', value: 120, color: '#007AFF' },
    { name: 'A', value: 180, color: '#5856D6' },
    { name: 'B+', value: 95, color: '#FF9500' },
    { name: 'B', value: 40, color: '#FF3B30' },
    { name: 'RA', value: 20, color: '#AEAEB2' },
  ]

  const departmentData = [
    { name: 'CSE', students: 180, pass: 165, fail: 15 },
    { name: 'ECE', students: 120, pass: 108, fail: 12 },
    { name: 'EEE', students: 90, pass: 82, fail: 8 },
    { name: 'MECH', students: 60, pass: 54, fail: 6 },
    { name: 'CIVIL', students: 50, pass: 46, fail: 4 },
  ]

  const quickStats = [
    { icon: Users, label: 'Total Students', value: '500', change: '+12%', trend: 'up' as const, color: '#007AFF' },
    { icon: Award, label: 'Top Performers', value: '85', change: '+8%', trend: 'up' as const, color: '#34C759' },
    { icon: AlertTriangle, label: 'At Risk', value: '23', change: '-5%', trend: 'down' as const, color: '#FF9500' },
    { icon: Target, label: 'Avg Score', value: '78.5%', change: '+3.2%', trend: 'up' as const, color: '#5856D6' },
  ]

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

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -6 }}
                className="glass-card rounded-3xl p-5 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="p-2.5 rounded-xl"
                    style={{ background: `${stat.color}12` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'text-[#34C759] bg-[#34C759]/10' : 'text-[#FF3B30] bg-[#FF3B30]/10'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-[#1D1D1F] mb-1">{stat.value}</div>
                <div className="text-sm text-[#6E6E73]">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Performance Trend */}
            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-4 flex items-center gap-2">
                <div className="p-1.5 rounded-lg" style={{ background: '#007AFF12' }}>
                  <TrendingUp className="w-4 h-4" style={{ color: '#007AFF' }} />
                </div>
                Performance Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007AFF" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorToppers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34C759" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#34C759" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                  <XAxis dataKey="month" stroke="#AEAEB2" fontSize={12} />
                  <YAxis stroke="#AEAEB2" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="average" stroke="#007AFF" fillOpacity={1} fill="url(#colorAverage)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="toppers" stroke="#34C759" fillOpacity={1} fill="url(#colorToppers)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Grade Distribution */}
            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-4 flex items-center gap-2">
                <div className="p-1.5 rounded-lg" style={{ background: '#5856D612' }}>
                  <Award className="w-4 h-4" style={{ color: '#5856D6' }} />
                </div>
                Grade Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Department Performance */}
          <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6 mb-8">
            <h3 className="text-lg font-bold text-[#1D1D1F] mb-4 flex items-center gap-2">
              <div className="p-1.5 rounded-lg" style={{ background: '#FF950012' }}>
                <BookOpen className="w-4 h-4" style={{ color: '#FF9500' }} />
              </div>
              Department-wise Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                <XAxis dataKey="name" stroke="#AEAEB2" fontSize={12} />
                <YAxis stroke="#AEAEB2" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="pass" fill="#34C759" radius={[8, 8, 0, 0]} />
                <Bar dataKey="fail" fill="#FF3B30" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-bold text-[#1D1D1F] mb-4 flex items-center gap-2">
              <div className="p-1.5 rounded-lg" style={{ background: '#6E6E7312' }}>
                <Clock className="w-4 h-4" style={{ color: '#6E6E73' }} />
              </div>
              Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                { action: 'Report uploaded', department: 'CSE - 3rd Semester', time: '2 mins ago', status: 'success' },
                { action: 'AI Analysis completed', department: 'ECE - 5th Semester', time: '15 mins ago', status: 'success' },
                { action: 'Performance alert', department: 'MECH - 2nd Semester', time: '1 hour ago', status: 'warning' },
                { action: 'Batch processed', department: 'EEE - 4th Semester', time: '2 hours ago', status: 'success' },
              ].map((activity, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/30 hover:bg-white/60 transition-all cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      activity.status === 'success' ? 'bg-[#34C759]' : 'bg-[#FF9500]'
                    }`} />
                    <div>
                      <div className="text-sm font-semibold text-[#1D1D1F]">{activity.action}</div>
                      <div className="text-xs text-[#6E6E73]">{activity.department}</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#AEAEB2]">{activity.time}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

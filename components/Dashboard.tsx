'use client'

import { motion } from 'framer-motion'
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
  LineChart, 
  Line, 
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
  const performanceData = [
    { month: 'Jan', average: 78, toppers: 92, needsImprovement: 45 },
    { month: 'Feb', average: 82, toppers: 95, needsImprovement: 48 },
    { month: 'Mar', average: 79, toppers: 93, needsImprovement: 42 },
    { month: 'Apr', average: 85, toppers: 97, needsImprovement: 52 },
    { month: 'May', average: 88, toppers: 98, needsImprovement: 55 },
    { month: 'Jun', average: 91, toppers: 99, needsImprovement: 58 },
  ]

  const departmentData = [
    { name: 'CSE', students: 180, pass: 165, fail: 15 },
    { name: 'ECE', students: 120, pass: 108, fail: 12 },
    { name: 'EEE', students: 90, pass: 82, fail: 8 },
    { name: 'MECH', students: 60, pass: 54, fail: 6 },
    { name: 'CIVIL', students: 50, pass: 46, fail: 4 },
  ]

  const gradeDistribution = [
    { name: 'O', value: 45, color: '#22c55e' },
    { name: 'A+', value: 120, color: '#3b82f6' },
    { name: 'A', value: 180, color: '#6366f1' },
    { name: 'B+', value: 95, color: '#f59e0b' },
    { name: 'B', value: 40, color: '#ef4444' },
    { name: 'RA', value: 20, color: '#64748b' },
  ]

  const quickStats = [
    { icon: Users, label: 'Total Students', value: '500', change: '+12%', trend: 'up', color: 'text-blue-400' },
    { icon: Award, label: 'Top Performers', value: '85', change: '+8%', trend: 'up', color: 'text-green-400' },
    { icon: AlertTriangle, label: 'At Risk', value: '23', change: '-5%', trend: 'down', color: 'text-amber-400' },
    { icon: Target, label: 'Avg Score', value: '78.5%', change: '+3.2%', trend: 'up', color: 'text-purple-400' },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-5 card-hover cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl bg-dark-800/50 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-dark-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-400" />
              Performance Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorToppers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '12px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="average" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAverage)" />
                <Area type="monotone" dataKey="toppers" stroke="#22c55e" fillOpacity={1} fill="url(#colorToppers)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Grade Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-400" />
              Grade Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '12px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-400" />
            Department-wise Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '12px'
                }}
              />
              <Legend />
              <Bar dataKey="pass" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fail" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-dark-400" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { action: 'Report uploaded', department: 'CSE - 3rd Semester', time: '2 mins ago', status: 'success' },
              { action: 'AI Analysis completed', department: 'ECE - 5th Semester', time: '15 mins ago', status: 'success' },
              { action: 'Performance alert', department: 'MECH - 2nd Semester', time: '1 hour ago', status: 'warning' },
              { action: 'Batch processed', department: 'EEE - 4th Semester', time: '2 hours ago', status: 'success' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-dark-800/30 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-400' : 'bg-amber-400'
                  }`} />
                  <div>
                    <div className="text-sm font-medium text-white">{activity.action}</div>
                    <div className="text-xs text-dark-400">{activity.department}</div>
                  </div>
                </div>
                <div className="text-xs text-dark-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

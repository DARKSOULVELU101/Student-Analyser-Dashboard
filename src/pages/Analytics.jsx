import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Brain, TrendingUp, Award, Users, AlertTriangle, CheckCircle, ArrowLeft, Sparkles, BarChart3, Activity } from 'lucide-react'

const COLORS = ['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

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

export default function Analytics() {
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState([])
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')
  const [aiInsights, setAiInsights] = useState([])

  useEffect(() => {
    const data = sessionStorage.getItem('studentData')
    const dept = sessionStorage.getItem('department')
    const yr = sessionStorage.getItem('year')
    if (data) {
      setStudentData(JSON.parse(data))
      setDepartment(dept || '')
      setYear(yr || '')
    }
  }, [])

  const analytics = useMemo(() => {
    if (studentData.length === 0) return null

    const studentsWithAvg = studentData.map(s => ({
      ...s,
      average: s.marks.length > 0 ? s.marks.reduce((a, b) => a + b, 0) / s.marks.length : 0
    }))

    const allAverages = studentsWithAvg.map(s => s.average).filter(a => a > 0)
    const overallAvg = allAverages.length > 0 ? allAverages.reduce((a, b) => a + b, 0) / allAverages.length : 0
    const highestAvg = allAverages.length > 0 ? Math.max(...allAverages) : 0
    const lowestAvg = allAverages.length > 0 ? Math.min(...allAverages) : 0
    const passRate = allAverages.length > 0 ? (allAverages.filter(a => a >= 40).length / allAverages.length * 100) : 0
    const excellenceRate = allAverages.length > 0 ? (allAverages.filter(a => a >= 80).length / allAverages.length * 100) : 0

    const gradeDistribution = {
      'A+ (90-100)': allAverages.filter(a => a >= 90).length,
      'A (80-89)': allAverages.filter(a => a >= 80 && a < 90).length,
      'B (70-79)': allAverages.filter(a => a >= 70 && a < 80).length,
      'C (60-69)': allAverages.filter(a => a >= 60 && a < 70).length,
      'D (50-59)': allAverages.filter(a => a >= 50 && a < 60).length,
      'E (40-49)': allAverages.filter(a => a >= 40 && a < 50).length,
      'F (<40)': allAverages.filter(a => a < 40).length,
    }

    const topPerformers = [...studentsWithAvg].sort((a, b) => b.average - a.average).slice(0, 10)
    const bottomPerformers = [...studentsWithAvg].sort((a, b) => a.average - b.average).slice(0, 10)

    const subjectAverages = []
    if (studentData[0]?.subjects && studentData[0].subjects.length > 0) {
      const subjectMap = {}
      studentData.forEach(s => {
        s.subjects?.forEach(sub => {
          if (!subjectMap[sub.subject]) subjectMap[sub.subject] = []
          subjectMap[sub.subject].push(sub.marks)
        })
      })
      Object.entries(subjectMap).forEach(([subject, marks]) => {
        subjectAverages.push({
          subject,
          average: marks.reduce((a, b) => a + b, 0) / marks.length,
          highest: Math.max(...marks),
          lowest: Math.min(...marks),
          count: marks.length
        })
      })
    }

    const distribution = Array.from({ length: 11 }, (_, i) => ({
      range: `${i * 10}-${i * 10 + 9}`,
      count: allAverages.filter(a => a >= i * 10 && a < (i + 1) * 10).length
    }))

    const performanceTrend = studentsWithAvg.slice(0, 20).map((s, i) => ({
      name: s.rollNo || `S${i + 1}`,
      average: s.average
    }))

    return {
      totalStudents: studentData.length,
      overallAvg,
      highestAvg,
      lowestAvg,
      passRate,
      excellenceRate,
      gradeDistribution,
      topPerformers,
      bottomPerformers,
      subjectAverages,
      distribution,
      performanceTrend,
      studentsWithAvg
    }
  }, [studentData])

  useEffect(() => {
    if (!analytics) return
    const insights = []

    if (analytics.overallAvg >= 80) {
      insights.push({ type: 'success', icon: CheckCircle, title: 'Excellent Performance', message: `The class is performing exceptionally well with an average of ${analytics.overallAvg.toFixed(1)}%.` })
    } else if (analytics.overallAvg >= 60) {
      insights.push({ type: 'warning', icon: TrendingUp, title: 'Good Performance', message: `The class average is ${analytics.overallAvg.toFixed(1)}%. There's room for improvement.` })
    } else {
      insights.push({ type: 'danger', icon: AlertTriangle, title: 'Needs Attention', message: `The class average is ${analytics.overallAvg.toFixed(1)}%. Immediate intervention recommended.` })
    }

    if (analytics.passRate < 90) {
      insights.push({ type: 'warning', icon: Users, title: 'Pass Rate Alert', message: `${(100 - analytics.passRate).toFixed(1)}% of students are below passing marks.` })
    }

    if (analytics.excellenceRate > 50) {
      insights.push({ type: 'success', icon: Award, title: 'High Excellence Rate', message: `${analytics.excellenceRate.toFixed(1)}% of students scored above 80%.` })
    }

    if (analytics.subjectAverages.length > 0) {
      const weakest = analytics.subjectAverages.reduce((a, b) => a.average < b.average ? a : b)
      const strongest = analytics.subjectAverages.reduce((a, b) => a.average > b.average ? a : b)
      insights.push({ type: 'info', icon: Brain, title: 'Subject Analysis', message: `Strongest: ${strongest.subject} (${strongest.average.toFixed(1)}%). Weakest: ${weakest.subject} (${weakest.average.toFixed(1)}%).` })
    }

    const atRisk = analytics.bottomPerformers.filter(s => s.average < 40).length
    if (atRisk > 0) {
      insights.push({ type: 'danger', icon: AlertTriangle, title: 'At-Risk Students', message: `${atRisk} students are at risk of failing.` })
    }

    setAiInsights(insights)
  }, [analytics])

  if (!analytics || studentData.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-24 pb-12 px-6 gradient-bg flex items-center justify-center">
        <div className="glass-card p-12 text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Available</h2>
          <p className="text-gray-600 mb-6">Please upload student marks data first.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/upload')} className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold">
            Go to Upload
          </motion.button>
        </div>
      </motion.div>
    )
  }

  const gradePieData = Object.entries(analytics.gradeDistribution)
    .filter(([, count]) => count > 0)
    .map(([name, value]) => ({ name, value }))

  return (
    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="min-h-screen pt-24 pb-12 px-6 gradient-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <motion.button whileHover={{ x: -5 }} onClick={() => navigate('/upload')} className="flex items-center gap-2 text-white/70 hover:text-white mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Upload
            </motion.button>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-white/80">{departmentNames[department]} &bull; {year}{year === '1' ? 'st' : year === '2' ? 'nd' : year === '3' ? 'rd' : 'th'} Year</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Students', value: analytics.totalStudents, icon: Users, color: 'from-blue-500 to-indigo-600' },
            { label: 'Average Score', value: `${analytics.overallAvg.toFixed(1)}%`, icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
            { label: 'Pass Rate', value: `${analytics.passRate.toFixed(1)}%`, icon: CheckCircle, color: 'from-purple-500 to-pink-600' },
            { label: 'Excellence Rate', value: `${analytics.excellenceRate.toFixed(1)}%`, icon: Award, color: 'from-yellow-500 to-orange-600' },
          ].map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI-Powered Insights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-4 rounded-xl border-l-4 ${
                  insight.type === 'success' ? 'bg-green-50 border-green-500' :
                  insight.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                  insight.type === 'danger' ? 'bg-red-50 border-red-500' :
                  'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <insight.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    insight.type === 'success' ? 'text-green-600' :
                    insight.type === 'warning' ? 'text-yellow-600' :
                    insight.type === 'danger' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                  <div>
                    <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{insight.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Grade Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={gradePieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value"
                  label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}>
                  {gradePieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              Score Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.distribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="glass-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Performance Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics.performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="average" stroke="#6366f1" fillOpacity={1} fill="url(#colorAvg)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {analytics.subjectAverages.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="glass-card p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-success" />
                Subject-wise Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={analytics.subjectAverages}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Average" dataKey="average" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="glass-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Top Performers
            </h3>
            <div className="space-y-3">
              {analytics.topPerformers.map((student, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">{index + 1}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.rollNo}</p>
                  </div>
                  <p className="text-lg font-bold text-green-600">{student.average.toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="glass-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Students Needing Support
            </h3>
            <div className="space-y-3">
              {analytics.bottomPerformers.filter(s => s.average < 50).length > 0 ? (
                analytics.bottomPerformers.filter(s => s.average < 50).map((student, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">{index + 1}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.rollNo}</p>
                    </div>
                    <p className="text-lg font-bold text-red-600">{student.average.toFixed(1)}%</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">All students are performing well!</p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="glass-card p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Complete Student Data
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Roll No</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-center">Subjects</th>
                  <th className="p-3 text-center">Average</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.studentsWithAvg.map((student, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-mono">{student.rollNo}</td>
                    <td className="p-3">{student.name}</td>
                    <td className="p-3 text-center">{student.marks.length}</td>
                    <td className="p-3 text-center font-semibold">{student.average.toFixed(1)}%</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        student.average >= 80 ? 'bg-green-100 text-green-700' :
                        student.average >= 60 ? 'bg-blue-100 text-blue-700' :
                        student.average >= 40 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {student.average >= 80 ? 'Excellent' : student.average >= 60 ? 'Good' : student.average >= 40 ? 'Average' : 'At Risk'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

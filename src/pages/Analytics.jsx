import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Brain, TrendingUp, Award, Users, AlertTriangle, CheckCircle, ArrowLeft, Sparkles, BarChart3, Activity } from 'lucide-react'

const COLORS = ['#818cf8', '#f87171', '#fbbf24', '#34d399', '#22d3ee', '#a78bfa', '#f472b6']
const departmentNames = {
  cse: 'Computer Science & Engineering', it: 'Information Technology', ece: 'Electronics & Communication',
  eee: 'Electrical & Electronics', civil: 'Civil Engineering', mech: 'Mechanical Engineering',
  aids: 'AI & Data Science', aiml: 'AI & Machine Learning', cyber: 'Cyber Security', fashion: 'Fashion Technology',
}

const card = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export default function Analytics() {
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState([])
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')
  const [aiInsights, setAiInsights] = useState([])

  useEffect(() => {
    const data = sessionStorage.getItem('studentData')
    if (data) { setStudentData(JSON.parse(data)); setDepartment(sessionStorage.getItem('department') || ''); setYear(sessionStorage.getItem('year') || '') }
  }, [])

  const analytics = useMemo(() => {
    if (studentData.length === 0) return null
    const swa = studentData.map(s => ({ ...s, average: s.marks.length > 0 ? s.marks.reduce((a,b)=>a+b,0)/s.marks.length : 0 }))
    const allAvg = swa.map(s => s.average).filter(a => a > 0)
    const overallAvg = allAvg.length > 0 ? allAvg.reduce((a,b)=>a+b,0)/allAvg.length : 0
    const passRate = allAvg.length > 0 ? (allAvg.filter(a => a >= 40).length / allAvg.length * 100) : 0
    const excellenceRate = allAvg.length > 0 ? (allAvg.filter(a => a >= 80).length / allAvg.length * 100) : 0
    const gradeDist = { 'A+ (90-100)': allAvg.filter(a=>a>=90).length, 'A (80-89)': allAvg.filter(a=>a>=80&&a<90).length, 'B (70-79)': allAvg.filter(a=>a>=70&&a<80).length, 'C (60-69)': allAvg.filter(a=>a>=60&&a<70).length, 'D (50-59)': allAvg.filter(a=>a>=50&&a<60).length, 'E (40-49)': allAvg.filter(a=>a>=40&&a<50).length, 'F (<40)': allAvg.filter(a=>a<40).length }
    const topPerformers = [...swa].sort((a,b)=>b.average-a.average).slice(0,10)
    const bottomPerformers = [...swa].sort((a,b)=>a.average-b.average).slice(0,10)
    const subjectAvgs = []
    if (studentData[0]?.subjects?.length > 0) {
      const sm = {}; studentData.forEach(s => s.subjects?.forEach(sub => { if(!sm[sub.subject]) sm[sub.subject]=[]; sm[sub.subject].push(sub.marks) }))
      Object.entries(sm).forEach(([sub, marks]) => { subjectAvgs.push({ subject: sub, average: marks.reduce((a,b)=>a+b,0)/marks.length, highest: Math.max(...marks), lowest: Math.min(...marks) }) })
    }
    const dist = Array.from({length:11}, (_,i) => ({ range: `${i*10}-${i*10+9}`, count: allAvg.filter(a=>a>=i*10&&a<(i+1)*10).length }))
    const trend = swa.slice(0,20).map((s,i) => ({ name: s.rollNo||`S${i+1}`, average: s.average }))
    return { totalStudents: studentData.length, overallAvg, passRate, excellenceRate, gradeDist, topPerformers, bottomPerformers, subjectAvgs, dist, trend, swa }
  }, [studentData])

  useEffect(() => {
    if (!analytics) return
    const ins = []
    if (analytics.overallAvg >= 80) ins.push({ type:'success', icon: CheckCircle, title:'Excellent Performance', msg:`Class average is ${analytics.overallAvg.toFixed(1)}%. Outstanding results!` })
    else if (analytics.overallAvg >= 60) ins.push({ type:'warning', icon: TrendingUp, title:'Good Performance', msg:`Class average is ${analytics.overallAvg.toFixed(1)}%. Room for improvement.` })
    else ins.push({ type:'danger', icon: AlertTriangle, title:'Needs Attention', msg:`Class average is ${analytics.overallAvg.toFixed(1)}%. Intervention recommended.` })
    if (analytics.passRate < 90) ins.push({ type:'warning', icon: Users, title:'Pass Rate Alert', msg:`${(100-analytics.passRate).toFixed(1)}% below passing marks.` })
    if (analytics.excellenceRate > 50) ins.push({ type:'success', icon: Award, title:'High Excellence', msg:`${analytics.excellenceRate.toFixed(1)}% scored above 80%.` })
    if (analytics.subjectAvgs.length > 0) {
      const w = analytics.subjectAvgs.reduce((a,b)=>a.average<b.average?a:b)
      const s = analytics.subjectAvgs.reduce((a,b)=>a.average>b.average?a:b)
      ins.push({ type:'info', icon: Brain, title:'Subject Analysis', msg:`Strongest: ${s.subject} (${s.average.toFixed(1)}). Weakest: ${w.subject} (${w.average.toFixed(1)}).` })
    }
    setAiInsights(ins)
  }, [analytics])

  if (!analytics || studentData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="glass p-10 text-center max-w-sm">
          <AlertTriangle className="w-12 h-12 text-amber mx-auto mb-4" />
          <h2 className="font-sora text-[18px] font-semibold text-text-hi mb-2">No Data Available</h2>
          <p className="text-[13px] text-text-mid mb-5">Please upload student marks data first.</p>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/upload')}
            className="px-5 py-2.5 rounded-[10px] font-semibold text-[13px] text-white"
            style={{ background: 'linear-gradient(135deg, #818cf8, #4f46e5)' }}>Go to Upload</motion.button>
        </div>
      </div>
    )
  }

  const gradePie = Object.entries(analytics.gradeDist).filter(([,c])=>c>0).map(([name,value])=>({name,value}))

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }} className="flex flex-col gap-5">

      <div className="flex items-center justify-between">
        <div>
          <motion.button whileHover={{ x: -3 }} onClick={() => navigate('/upload')} className="flex items-center gap-1.5 text-[12px] text-text-low hover:text-indigo mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Upload
          </motion.button>
          <h1 className="font-sora text-[22px] font-semibold text-text-hi">Analytics Dashboard</h1>
          <p className="text-[13px] text-text-mid mt-1">{departmentNames[department]} · {year}{year==='1'?'st':year==='2'?'nd':year==='3'?'rd':'th'} Year</p>
        </div>
      </div>

      {/* Stats */}
      <motion.div variants={card} className="grid grid-cols-4 gap-4">
        {[
          { label: "TOTAL STUDENTS", value: analytics.totalStudents, color: "text-indigo", icon: Users },
          { label: "AVG. SCORE", value: `${analytics.overallAvg.toFixed(1)}`, color: "text-green", icon: TrendingUp },
          { label: "PASS RATE", value: `${analytics.passRate.toFixed(0)}%`, color: "text-amber", icon: CheckCircle },
          { label: "EXCELLENCE", value: `${analytics.excellenceRate.toFixed(0)}%`, color: "text-green", icon: Award },
        ].map((s, i) => (
          <motion.div key={i} variants={card} whileHover={{ borderColor: "rgba(129,140,248,0.35)", y: -2 }}
            className="glass p-5 flex flex-col gap-2 transition-all duration-200">
            <span className="text-[11.5px] text-text-mid uppercase tracking-[0.06em] font-medium flex items-center gap-1.5">
              <s.icon className="w-3.5 h-3.5" /> {s.label}
            </span>
            <span className={`font-mono text-[28px] font-bold ${s.color}`}>{s.value}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Insights */}
      <motion.div variants={card} className="glass p-5">
        <h2 className="font-sora text-[15px] font-semibold text-text-hi mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo" /> AI-Powered Insights
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {aiInsights.map((ins, i) => (
            <motion.div key={i} variants={card}
              className="p-4 rounded-[14px] border-l-[3px]"
              style={{
                background: ins.type==='success' ? 'rgba(52,211,153,0.06)' : ins.type==='warning' ? 'rgba(251,191,36,0.06)' : ins.type==='danger' ? 'rgba(248,113,113,0.06)' : 'rgba(129,140,248,0.06)',
                borderColor: ins.type==='success' ? '#34d399' : ins.type==='warning' ? '#fbbf24' : ins.type==='danger' ? '#f87171' : '#818cf8',
              }}>
              <div className="flex items-start gap-2.5">
                <ins.icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${ins.type==='success'?'text-green':ins.type==='warning'?'text-amber':ins.type==='danger'?'text-rose':'text-indigo'}`} />
                <div>
                  <h4 className="text-[13px] font-semibold text-text-hi">{ins.title}</h4>
                  <p className="text-[11.5px] text-text-mid mt-1 leading-relaxed">{ins.msg}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div variants={card} className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-sora text-[14px] font-semibold text-text-hi">Grade Distribution</h3>
            <span className="text-[11px] text-text-low">Class average</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart><Pie data={gradePie} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value"
              label={({ name, percent }) => `${name.split(' ')[0]} ${(percent*100).toFixed(0)}%`} labelLine={false}>
              {gradePie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={card} className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-sora text-[14px] font-semibold text-text-hi">Score Distribution</h3>
            <span className="text-[11px] text-text-low">Histogram</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics.dist}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="range" tick={{ fontSize: 10, fill: '#666c8c' }} /><YAxis tick={{ fontSize: 10, fill: '#666c8c' }} />
              <Tooltip contentStyle={{ background: '#0d1120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="count" fill="url(#barGrad)" radius={[5,5,2,2]} />
              <defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#4f46e5" />
              </linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={card} className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-sora text-[14px] font-semibold text-text-hi">Performance Trend</h3>
            <span className="text-[11px] text-text-low">Student order</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={analytics.trend}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#666c8c' }} /><YAxis domain={[0,100]} tick={{ fontSize: 10, fill: '#666c8c' }} />
              <Tooltip contentStyle={{ background: '#0d1120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 12 }} />
              <defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} /><stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient></defs>
              <Area type="monotone" dataKey="average" stroke="#818cf8" fill="url(#areaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {analytics.subjectAvgs.length > 0 && (
          <motion.div variants={card} className="glass p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sora text-[14px] font-semibold text-text-hi">Subject Performance</h3>
              <span className="text-[11px] text-text-low">Radar</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={analytics.subjectAvgs}><PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#a3a8c3' }} />
                <PolarRadiusAxis angle={30} domain={[0,100]} tick={{ fontSize: 9, fill: '#666c8c' }} />
                <Radar name="Avg" dataKey="average" stroke="#818cf8" fill="#818cf8" fillOpacity={0.25} />
                <Tooltip contentStyle={{ background: '#0d1120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>

      {/* Leaderboard + At Risk */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div variants={card} className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-sora text-[14px] font-semibold text-text-hi flex items-center gap-2">
              <Award className="w-4 h-4 text-amber" /> Top Performers
            </h3>
            <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-green/10 text-green border border-green/25">Live</span>
          </div>
          {analytics.topPerformers.slice(0,5).map((s, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold"
                style={{ background: 'linear-gradient(135deg, rgba(129,140,248,0.5), rgba(251,191,36,0.4))', border: '1px solid rgba(255,255,255,0.15)' }}>
                {i+1}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-text-hi">{s.name}</div>
                <div className="text-[11px] text-text-low">{s.rollNo}</div>
              </div>
              <span className="font-mono text-[13px] font-semibold text-amber">{s.average.toFixed(1)}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={card} className="glass p-5">
          <h3 className="font-sora text-[14px] font-semibold text-text-hi mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose" /> Students Needing Support
          </h3>
          {analytics.bottomPerformers.filter(s=>s.average<50).length > 0 ? (
            analytics.bottomPerformers.filter(s=>s.average<50).map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold bg-rose/20 text-rose border border-rose/25">{i+1}</div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-text-hi">{s.name}</div>
                  <div className="text-[11px] text-text-low">{s.rollNo}</div>
                </div>
                <span className="font-mono text-[13px] font-semibold text-rose">{s.average.toFixed(1)}</span>
              </div>
            ))
          ) : <p className="text-center text-[13px] text-text-low py-6">All students performing well!</p>}
        </motion.div>
      </div>

      {/* Full Table */}
      <motion.div variants={card} className="glass p-5">
        <h3 className="font-sora text-[14px] font-semibold text-text-hi mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo" /> Complete Student Data
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead><tr className="border-b border-white/[0.06]">
              <th className="p-3 text-left text-text-low font-medium">Roll No</th>
              <th className="p-3 text-left text-text-low font-medium">Name</th>
              <th className="p-3 text-center text-text-low font-medium">Subjects</th>
              <th className="p-3 text-center text-text-low font-medium">Average</th>
              <th className="p-3 text-center text-text-low font-medium">Status</th>
            </tr></thead>
            <tbody>
              {analytics.swa.map((s, i) => (
                <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="p-3 font-mono text-text-hi">{s.rollNo}</td>
                  <td className="p-3 text-text-mid">{s.name}</td>
                  <td className="p-3 text-center text-text-mid">{s.marks.length}</td>
                  <td className="p-3 text-center font-mono font-semibold text-indigo">{s.average.toFixed(1)}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                      s.average>=80?'bg-green/10 text-green border border-green/25':s.average>=60?'bg-indigo/10 text-indigo border border-indigo/25':s.average>=40?'bg-amber/10 text-amber border border-amber/25':'bg-rose/10 text-rose border border-rose/25'
                    }`}>
                      {s.average>=80?'Excellent':s.average>=60?'Good':s.average>=40?'Average':'At Risk'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}

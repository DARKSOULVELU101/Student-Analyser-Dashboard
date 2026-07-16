import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Users, Award, AlertTriangle, ArrowRight, BarChart3, Activity, GraduationCap, BookOpen, Target, Building2, Phone, Mail, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'

const quotes = [
  "Engineering your future with excellence",
  "Time to learn, Moment to Celebrate",
  "Inspiring Faculty, World Class Facility",
  "A place for learning, discovery, innovation",
]

const departments = [
  { name: "CSE", full: "Computer Science & Engineering", students: 120 },
  { name: "IT", full: "Information Technology", students: 60 },
  { name: "ECE", full: "Electronics & Communication", students: 60 },
  { name: "EEE", full: "Electrical & Electronics", students: 60 },
  { name: "CIVIL", full: "Civil Engineering", students: 60 },
  { name: "MECH", full: "Mechanical Engineering", students: 60 },
  { name: "AIDS", full: "AI & Data Science", students: 60 },
  { name: "AIML", full: "AI & Machine Learning", students: 60 },
  { name: "CYBER", full: "Cyber Security", students: 40 },
  { name: "FASHION", full: "Fashion Technology", students: 40 },
]

const facilities = [
  { icon: "📚", title: "Library", desc: "Excellent library for students and faculty" },
  { icon: "🚌", title: "Transport", desc: "Buses reach campus before 8:05 AM daily" },
  { icon: "🏠", title: "Hostel", desc: "Separate hostels for boys and girls" },
  { icon: "🏆", title: "Sports", desc: "Best sports facilities and coaches" },
]

const recruiters = ["TCS", "Infosys", "Cognizant", "Wipro", "IBM", "Mahindra"]

function TypingText() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const current = quotes[idx]
    const timeout = setTimeout(() => {
      if (!del) {
        setText(current.substring(0, text.length + 1))
        if (text.length === current.length) setTimeout(() => setDel(true), 2500)
      } else {
        setText(current.substring(0, text.length - 1))
        if (text.length === 0) { setDel(false); setIdx((i) => (i + 1) % quotes.length) }
      }
    }, del ? 40 : 80)
    return () => clearTimeout(timeout)
  }, [text, del, idx])

  return <span>{text}<span className="text-indigo animate-pulse">|</span></span>
}

const card = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export default function Home() {
  const navigate = useNavigate()

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="flex flex-col gap-5">

      {/* Topbar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sora text-[22px] font-semibold text-text-hi">SRI KRISHNA ENGINEERING COLLEGE</h1>
          <p className="text-[13px] text-text-mid mt-1">& SRI KRISHNA INSTITUTE OF TECHNOLOGY — <TypingText /></p>
        </div>
        <div className="flex items-center gap-3 text-[12px] text-text-low">
          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />+91 81108 61000</span>
          <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />principal.skec@gmail.com</span>
        </div>
      </div>

      {/* Stat Cards */}
      <motion.div variants={card} className="grid grid-cols-4 gap-4">
        {[
          { label: "DEPARTMENTS", value: "10", delta: "+2 new", up: true, color: "text-indigo" },
          { label: "ACADEMIC YEARS", value: "4", delta: "B.E / B.Tech", up: true, color: "text-amber" },
          { label: "TOTAL STUDENTS", value: "620+", delta: "All departments", up: true, color: "text-green" },
          { label: "SUCCESS RATE", value: "94%", delta: "↑ 3.1% vs last", up: true, color: "text-green" },
        ].map((s, i) => (
          <motion.div key={i} variants={card} whileHover={{ borderColor: "rgba(129,140,248,0.35)", y: -2 }}
            className="glass p-5 flex flex-col gap-2 transition-all duration-200 cursor-pointer">
            <span className="text-[11.5px] text-text-mid uppercase tracking-[0.06em] font-medium">{s.label}</span>
            <span className={`font-mono text-[28px] font-bold ${s.color}`}>{s.value}</span>
            <span className={`text-[11.5px] font-medium ${s.up ? 'text-green' : 'text-rose'}`}>{s.delta}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={card} className="grid grid-cols-3 gap-4">
        {[
          { icon: Building2, title: "Student Management", desc: "Track student data across all departments", action: () => navigate('/department'), color: "from-indigo/20 to-indigo-deep/20" },
          { icon: BarChart3, title: "Performance Analytics", desc: "AI-powered academic progress insights", action: () => navigate('/analytics'), color: "from-amber/20 to-orange-500/20" },
          { icon: Award, title: "Grade Analysis", desc: "Comprehensive marks evaluation system", action: () => navigate('/upload'), color: "from-green/20 to-emerald-500/20" },
        ].map((item, i) => (
          <motion.div key={i} variants={card} whileHover={{ borderColor: "rgba(129,140,248,0.35)", y: -3 }}
            className="glass p-6 cursor-pointer transition-all duration-200 group" onClick={item.action}>
            <div className={`w-12 h-12 rounded-[12px] bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
              <item.icon className="w-6 h-6 text-indigo" />
            </div>
            <h3 className="font-sora text-[15px] font-semibold text-text-hi mb-1.5">{item.title}</h3>
            <p className="text-[13px] text-text-mid leading-relaxed">{item.desc}</p>
            <div className="flex items-center gap-1.5 text-[12px] text-indigo mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Open <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Departments Grid */}
      <motion.div variants={card} className="glass p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-sora text-[15px] font-semibold text-text-hi">Departments</h2>
          <span className="text-[11.5px] text-text-low">Anna University Affiliated</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {departments.map((dept, i) => (
            <motion.div key={i} variants={card} whileHover={{ borderColor: "rgba(129,140,248,0.35)", y: -2 }}
              className="glass p-3 text-center cursor-pointer transition-all duration-200 rounded-[14px]">
              <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-indigo/20 to-indigo-deep/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-[11px] font-bold text-indigo font-mono">{dept.name}</span>
              </div>
              <div className="text-[11px] font-medium text-text-hi leading-tight">{dept.name}</div>
              <div className="text-[10px] text-text-low mt-1">{dept.students} students</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Facilities */}
        <motion.div variants={card} className="glass p-6">
          <h2 className="font-sora text-[15px] font-semibold text-text-hi mb-4">Campus Facilities</h2>
          <div className="grid grid-cols-2 gap-3">
            {facilities.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-[12px] hover:bg-white/[0.03] transition-colors">
                <span className="text-[20px]">{f.icon}</span>
                <div>
                  <div className="text-[13px] font-medium text-text-hi">{f.title}</div>
                  <div className="text-[11px] text-text-low mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recruiters */}
        <motion.div variants={card} className="glass p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-sora text-[15px] font-semibold text-text-hi">Industry Partners</h2>
            <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-green/10 text-green border border-green/25">Top Recruiters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recruiters.map((r, i) => (
              <span key={i} className="px-4 py-2 glass text-[13px] font-medium text-text-mid rounded-[10px] hover:text-text-hi hover:border-[rgba(129,140,248,0.35)] transition-all cursor-pointer">
                {r}
              </span>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 text-[12px] text-text-low">
              <MapPin className="w-3.5 h-3.5" />
              Panapakkam, Near Padappai, Via - Tambaram, Chennai - 601 301
            </div>
          </div>
        </motion.div>
      </div>

      {/* Get Started CTA */}
      <motion.div variants={card} className="glass p-8 text-center">
        <h2 className="font-sora text-[20px] font-semibold text-text-hi mb-2">Start Analyzing Student Performance</h2>
        <p className="text-[13px] text-text-mid mb-5">Upload marks data and get AI-powered insights instantly</p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/department')}
          className="px-8 py-3 rounded-[12px] font-sora font-semibold text-[14px] text-white transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #818cf8, #4f46e5)', boxShadow: '0 0 0 1px rgba(129,140,248,0.4), 0 8px 24px rgba(79,70,229,0.35)' }}
        >
          Get Started <ArrowRight className="w-4 h-4 inline ml-1.5" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

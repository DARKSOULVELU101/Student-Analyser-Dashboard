import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Building2, ChevronRight, Cpu, Zap, Code, Settings, Brain, Shield, Shirt, GraduationCap } from 'lucide-react'

const departments = [
  { id: 'cse', name: 'Computer Science & Engineering', short: 'CSE', icon: Cpu, color: '#818cf8' },
  { id: 'it', name: 'Information Technology', short: 'IT', icon: Code, color: '#c084fc' },
  { id: 'ece', name: 'Electronics & Communication', short: 'ECE', icon: Zap, color: '#fbbf24' },
  { id: 'eee', name: 'Electrical & Electronics', short: 'EEE', icon: Settings, color: '#f87171' },
  { id: 'civil', name: 'Civil Engineering', short: 'CIVIL', icon: Building2, color: '#34d399' },
  { id: 'mech', name: 'Mechanical Engineering', short: 'MECH', icon: Settings, color: '#94a3b8' },
  { id: 'aids', name: 'AI & Data Science', short: 'AIDS', icon: Brain, color: '#22d3ee' },
  { id: 'aiml', name: 'AI & Machine Learning', short: 'AIML', icon: Brain, color: '#a78bfa' },
  { id: 'cyber', name: 'Cyber Security', short: 'CYBER', icon: Shield, color: '#34d399' },
  { id: 'fashion', name: 'Fashion Technology', short: 'FASHION', icon: Shirt, color: '#f472b6' },
]

const years = [
  { id: 1, label: '1st Year', subtitle: 'Foundation' },
  { id: 2, label: '2nd Year', subtitle: 'Intermediate' },
  { id: 3, label: '3rd Year', subtitle: 'Advanced' },
  { id: 4, label: '4th Year', subtitle: 'Final' },
]

const card = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export default function Department() {
  const navigate = useNavigate()
  const [selectedDept, setSelectedDept] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)

  const handleProceed = () => {
    if (selectedDept && selectedYear) {
      sessionStorage.setItem('department', selectedDept)
      sessionStorage.setItem('year', String(selectedYear))
      navigate('/upload')
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }} className="flex flex-col gap-5">

      <div>
        <h1 className="font-sora text-[22px] font-semibold text-text-hi">Select Department & Year</h1>
        <p className="text-[13px] text-text-mid mt-1">Choose your department and academic year to continue</p>
      </div>

      {/* Departments */}
      <motion.div variants={card}>
        <h2 className="text-[13px] text-text-mid uppercase tracking-widest font-medium mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4" /> Departments
        </h2>
        <div className="grid grid-cols-5 gap-3">
          {departments.map((dept, index) => {
            const Icon = dept.icon
            const isSelected = selectedDept === dept.id
            return (
              <motion.button key={dept.id} variants={card}
                whileHover={{ borderColor: `${dept.color}60`, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedDept(dept.id)}
                className={`glass p-4 text-left transition-all duration-200 cursor-pointer ${isSelected ? 'border-2' : ''}`}
                style={isSelected ? { borderColor: dept.color, boxShadow: `0 0 20px ${dept.color}20` } : {}}
              >
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-3" style={{ background: `${dept.color}20` }}>
                  <Icon className="w-5 h-5" style={{ color: dept.color }} />
                </div>
                <div className="text-[13px] font-semibold text-text-hi">{dept.short}</div>
                <div className="text-[10.5px] text-text-low mt-0.5 line-clamp-2">{dept.name}</div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Years */}
      <motion.div variants={card}>
        <h2 className="text-[13px] text-text-mid uppercase tracking-widest font-medium mb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" /> Academic Year
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {years.map((year) => {
            const isSelected = selectedYear === year.id
            return (
              <motion.button key={year.id} variants={card}
                whileHover={{ borderColor: "rgba(129,140,248,0.35)", y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedYear(year.id)}
                className={`glass p-5 text-center transition-all duration-200 cursor-pointer ${isSelected ? 'border-2 border-indigo' : ''}`}
                style={isSelected ? { boxShadow: '0 0 20px rgba(129,140,248,0.15)' } : {}}
              >
                <div className="text-[32px] font-bold font-mono text-indigo mb-1">{year.id}</div>
                <div className="text-[13px] font-semibold text-text-hi">{year.label}</div>
                <div className="text-[11px] text-text-low mt-0.5">{year.subtitle}</div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Summary */}
      <AnimatePresence>
        {selectedDept && selectedYear && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
            className="glass p-5 flex items-center justify-between">
            <div>
              <div className="text-[14px] font-semibold text-text-hi">Selection Summary</div>
              <div className="text-[13px] text-text-mid mt-1">
                <span className="text-indigo">{departments.find(d => d.id === selectedDept)?.name}</span>
                {' · '}
                <span className="text-amber">{years.find(y => y.id === selectedYear)?.label}</span>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleProceed}
              className="flex items-center gap-2 px-6 py-2.5 rounded-[12px] font-semibold text-[13px] text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #818cf8, #4f46e5)', boxShadow: '0 0 0 1px rgba(129,140,248,0.4), 0 6px 18px rgba(79,70,229,0.35)' }}>
              Continue <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

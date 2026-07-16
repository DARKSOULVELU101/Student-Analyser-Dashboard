import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Building2, ChevronRight, Cpu, Zap, Code, Settings, Brain, Shield, Shirt, GraduationCap } from 'lucide-react'

const departments = [
  { id: 'cse', name: 'Computer Science & Engineering', short: 'CSE', icon: Cpu, color: 'from-blue-500 to-indigo-600' },
  { id: 'it', name: 'Information Technology', short: 'IT', icon: Code, color: 'from-purple-500 to-pink-600' },
  { id: 'ece', name: 'Electronics & Communication', short: 'ECE', icon: Zap, color: 'from-yellow-500 to-orange-600' },
  { id: 'eee', name: 'Electrical & Electronics', short: 'EEE', icon: Settings, color: 'from-red-500 to-rose-600' },
  { id: 'civil', name: 'Civil Engineering', short: 'CIVIL', icon: Building2, color: 'from-green-500 to-emerald-600' },
  { id: 'mech', name: 'Mechanical Engineering', short: 'MECH', icon: Settings, color: 'from-gray-500 to-slate-600' },
  { id: 'aids', name: 'AI & Data Science', short: 'AIDS', icon: Brain, color: 'from-cyan-500 to-blue-600' },
  { id: 'aiml', name: 'AI & Machine Learning', short: 'AIML', icon: Brain, color: 'from-violet-500 to-purple-600' },
  { id: 'cyber', name: 'Cyber Security', short: 'CYBER', icon: Shield, color: 'from-emerald-500 to-teal-600' },
  { id: 'fashion', name: 'Fashion Technology', short: 'FASHION', icon: Shirt, color: 'from-pink-500 to-rose-600' },
]

const years = [
  { id: 1, label: '1st Year', subtitle: 'Foundation' },
  { id: 2, label: '2nd Year', subtitle: 'Intermediate' },
  { id: 3, label: '3rd Year', subtitle: 'Advanced' },
  { id: 4, label: '4th Year', subtitle: 'Final' },
]

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
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="min-h-screen pt-24 pb-12 px-6 gradient-bg"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Select Department & Year
          </h1>
          <p className="text-white/80 text-lg">Choose your department and academic year to continue</p>
        </motion.div>

        <div className="mb-12">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
          >
            <Building2 className="w-6 h-6" />
            Departments
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {departments.map((dept, index) => {
              const Icon = dept.icon
              const isSelected = selectedDept === dept.id
              return (
                <motion.button
                  key={dept.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDept(dept.id)}
                  className={`relative p-4 rounded-2xl text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-white shadow-2xl ring-4 ring-yellow-400'
                      : 'bg-white/90 hover:bg-white'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${dept.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{dept.short}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{dept.name}</p>
                </motion.button>
              )
            })}
          </div>
        </div>

        <div className="mb-12">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
          >
            <GraduationCap className="w-6 h-6" />
            Academic Year
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {years.map((year, index) => {
              const isSelected = selectedYear === year.id
              return (
                <motion.button
                  key={year.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedYear(year.id)}
                  className={`relative p-6 rounded-2xl text-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-white shadow-2xl ring-4 ring-green-400'
                      : 'bg-white/90 hover:bg-white'
                  }`}
                >
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                    {year.id}
                  </div>
                  <h3 className="font-bold text-gray-800">{year.label}</h3>
                  <p className="text-sm text-gray-500">{year.subtitle}</p>
                </motion.button>
              )
            })}
          </div>
        </div>

        <AnimatePresence>
          {selectedDept && selectedYear && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-card p-6 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Selection Summary</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold">{departments.find(d => d.id === selectedDept)?.name}</span>
                    {' \u2022 '}
                    <span className="font-semibold">{years.find(y => y.id === selectedYear)?.label}</span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProceed}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold flex items-center gap-2 shadow-lg"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

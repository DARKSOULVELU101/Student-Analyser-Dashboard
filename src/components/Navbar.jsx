import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Home, Building2, Upload, BarChart3 } from 'lucide-react'

const navItems = [
  { path: '#/', label: 'Home', icon: Home },
  { path: '#/department', label: 'Departments', icon: Building2 },
  { path: '#/upload', label: 'Upload', icon: Upload },
  { path: '#/analytics', label: 'Analytics', icon: BarChart3 },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center"
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-white font-bold text-xl hidden md:block">SKEC Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path.replace('#', '')
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/20 rounded-xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

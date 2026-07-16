import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Building2, Upload, BarChart3, Award, Home } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/department', label: 'Departments', icon: Building2 },
  { path: '/upload', label: 'Upload Data', icon: Upload },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="glass w-[240px] flex-shrink-0 p-6 flex flex-col gap-7 sticky top-6 h-[calc(100vh-48px)]"
    >
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div
          className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[14px] font-bold font-mono"
          style={{
            background: 'linear-gradient(135deg, #818cf8, #4f46e5)',
            boxShadow: '0 0 0 1px rgba(129,140,248,0.4), 0 6px 18px rgba(79,70,229,0.35)',
            color: '#fff',
          }}
        >
          SA
        </div>
        <div>
          <div className="font-sora font-semibold text-[15px] text-text-hi leading-tight">Student Analyser</div>
          <div className="text-[10px] text-text-low mt-0.5">SKEC Dashboard</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13.5px] font-medium transition-all duration-150 ${
                isActive
                  ? 'text-text-hi border border-[rgba(129,140,248,0.35)]'
                  : 'text-text-mid hover:text-text-hi hover:bg-white/[0.04]'
              }`}
              style={isActive ? { background: 'rgba(129,140,248,0.14)' } : {}}
            >
              <span
                className="w-[5px] h-[5px] rounded-full opacity-60"
                style={{ background: isActive ? '#818cf8' : 'currentColor' }}
              />
              <Icon className="w-[16px] h-[16px]" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* College Info */}
      <div className="mt-auto">
        <div className="glass p-4 text-center rounded-[14px]">
          <div
            className="w-[70px] h-[70px] rounded-full mx-auto mb-3 flex items-center justify-center p-[5px]"
            style={{
              background: 'conic-gradient(#fbbf24 0deg 252deg, rgba(255,255,255,0.08) 252deg 360deg)',
            }}
          >
            <div className="w-full h-full rounded-full bg-bg-1 flex flex-col items-center justify-center">
              <span className="text-[9px] text-text-low tracking-widest font-mono">RANK</span>
              <span className="text-[20px] font-bold text-amber font-mono">A+</span>
            </div>
          </div>
          <div className="text-[13px] font-semibold text-text-hi">SKEC College</div>
          <div className="text-[11px] text-text-low mt-1">Counselling Code: 1427</div>
          <div className="text-[10px] text-text-low mt-0.5">Panapakkam, Chennai - 601 301</div>
        </div>
      </div>
    </motion.aside>
  )
}

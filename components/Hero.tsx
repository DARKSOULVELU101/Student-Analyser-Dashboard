'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  FileCheck, 
  Brain,
  ArrowRight,
  Sparkles,
  Play,
  ChevronRight
} from 'lucide-react'
import { useRef } from 'react'

interface HeroProps {
  onGetStarted: () => void
  onWatchDemo: () => void
}

export default function Hero({ onGetStarted, onWatchDemo }: HeroProps) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const stats = [
    { icon: Users, label: 'Total Students', value: '2,500+', color: '#007AFF' },
    { icon: FileCheck, label: 'Reports Analysed', value: '15,000+', color: '#5856D6' },
    { icon: TrendingUp, label: 'Performance Rate', value: '94%', color: '#34C759' },
    { icon: Brain, label: 'AI Accuracy', value: '98.5%', color: '#FF9500' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  return (
    <section ref={containerRef} className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-5 py-2.5 glass-card rounded-full text-sm font-medium text-[#007AFF] mb-8"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Student Performance Analysis
            <ChevronRight className="w-4 h-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight"
          >
            <span className="text-[#1D1D1F]">Student Performance</span>
            <br />
            <span className="gradient-text">Analyser Dashboard</span>
          </motion.h1>

          {/* College Name - Highlighted with Animation */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.p
              className="text-lg sm:text-xl font-bold tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <span className="college-highlight text-[#1D1D1F]">
                SRI KRISHNA ENGINEERING COLLEGE
              </span>
              <span className="text-[#6E6E73] mx-2">&</span>
              <span className="college-highlight text-[#1D1D1F]">
                SRI KRISHNA INSTITUTE OF TECHNOLOGY
              </span>
            </motion.p>
            <motion.p
              className="text-sm text-[#6E6E73] mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Empowering educators with AI-driven insights for student success
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={onGetStarted}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 glass-btn text-white font-semibold rounded-2xl cursor-pointer text-lg"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles className="w-5 h-5" />
              Get Started
              <motion.div
                className="group-hover:translate-x-1 transition-transform"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
            
            <motion.button
              onClick={onWatchDemo}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 glass-card text-[#1D1D1F] font-semibold rounded-2xl cursor-pointer text-lg border border-white/40"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007AFF, #5856D6)' }}>
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              className="glass-card rounded-3xl p-6 text-center cursor-pointer"
              style={{ 
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                style={{ 
                  background: `${stat.color}15`,
                  boxShadow: `0 4px 20px ${stat.color}20`
                }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
              </motion.div>
              <motion.div 
                className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: 'spring' }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-[#6E6E73] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  FileCheck, 
  Brain,
  ArrowRight,
  Sparkles
} from 'lucide-react'

export default function Hero() {
  const stats = [
    { icon: Users, label: 'Total Students', value: '2,500+', color: 'from-blue-500 to-blue-600' },
    { icon: FileCheck, label: 'Reports Analysed', value: '15,000+', color: 'from-amber-500 to-amber-600' },
    { icon: TrendingUp, label: 'Performance Rate', value: '94%', color: 'from-green-500 to-green-600' },
    { icon: Brain, label: 'AI Accuracy', value: '98.5%', color: 'from-purple-500 to-purple-600' },
  ]

  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-primary-300 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent-500" />
            AI-Powered Student Performance Analysis
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">Student Performance</span>
            <br />
            <span className="gradient-text">Analyser Dashboard</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-dark-300 max-w-3xl mx-auto mb-8"
          >
            Sri Krishna Engineering College & Sri Krishna Institute of Technology
            <br />
            <span className="text-dark-400">Empowering educators with AI-driven insights for student success</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 glow-blue cursor-pointer">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-dark-700/50 transition-all duration-300 cursor-pointer">
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="glass rounded-2xl p-6 text-center card-hover cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-dark-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

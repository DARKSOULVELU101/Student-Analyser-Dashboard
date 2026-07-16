import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, BookOpen, TrendingUp, ArrowRight, Sparkles, Users, Award, Target } from 'lucide-react'

const quotes = [
  "Education is the passport to the future.",
  "Success is not final, failure is not fatal.",
  "The future belongs to those who believe in education.",
  "Knowledge is power. Education is the key.",
]

const features = [
  { icon: Users, title: "Student Management", desc: "Track and manage student data efficiently" },
  { icon: TrendingUp, title: "Performance Analytics", desc: "AI-powered insights into academic progress" },
  { icon: Award, title: "Grade Analysis", desc: "Comprehensive marks evaluation system" },
  { icon: Target, title: "Goal Tracking", desc: "Set and monitor academic milestones" },
]

export default function Home() {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen pt-24 pb-12 px-6 gradient-bg relative overflow-hidden"
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 100, 0],
            x: [0, Math.random() * 100 - 50, Math.random() * -100 + 50, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-white mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Analytics Platform</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            SRI KRISHNA ENGINEERING
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              COLLEGE
            </span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/90 font-medium mb-4"
          >
            & SRI KRISHNA INSTITUTE OF TECHNOLOGY
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/50" />
            <GraduationCap className="w-8 h-8 text-yellow-300" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/50" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-white/80 max-w-2xl mx-auto mb-8 italic"
          >
            &ldquo;{quotes[0]}&rdquo;
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/department')}
              className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <BookOpen className="w-5 h-5" />
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/analytics')}
              className="px-8 py-4 bg-white/20 text-white rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/30 transition-colors"
            >
              View Dashboard
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-6 text-center cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 glass-card p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10+", label: "Departments" },
              { value: "4", label: "Academic Years" },
              { value: "1000+", label: "Students" },
              { value: "95%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: 'spring' }}
              >
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16 text-white/70"
        >
          <p className="text-lg italic">&ldquo;The beautiful thing about learning is that nobody can take it away from you.&rdquo;</p>
          <p className="text-sm mt-2">&mdash; B.B. King</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

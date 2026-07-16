import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, BookOpen, TrendingUp, ArrowRight, Sparkles, Users, Award, Target, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

const quotes = [
  "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Knowledge is power. Education is the key to unlocking the world.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
]

const colors = ['#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f97316']

const features = [
  { icon: Users, title: "Student Management", desc: "Track and manage student data efficiently across all departments", color: "from-blue-500 to-indigo-600" },
  { icon: TrendingUp, title: "Performance Analytics", desc: "AI-powered insights into academic progress and trends", color: "from-green-500 to-emerald-600" },
  { icon: Award, title: "Grade Analysis", desc: "Comprehensive marks evaluation and grading system", color: "from-purple-500 to-pink-600" },
  { icon: Target, title: "Goal Tracking", desc: "Set and monitor academic milestones for every student", color: "from-yellow-500 to-orange-600" },
]

const departments = [
  "CSE", "IT", "ECE", "EEE", "CIVIL", "MECH", "AIDS", "AIML", "CYBER", "FASHION"
]

function AnimatedText({ text, className, delay = 0 }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.03, duration: 0.4 }}
          style={{ display: 'inline-block', minWidth: char === ' ' ? '0.3em' : 'auto' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

function ColorChangingText({ text, className }) {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.span
      className={className}
      animate={{ color: colors[colorIndex] }}
      transition={{ duration: 0.8 }}
    >
      {text}
    </motion.span>
  )
}

function TypingEffect({ texts, speed = 100, deleteSpeed = 50, pause = 2000 }) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length + 1))
        if (displayText.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1))
        if (displayText.length === 0) {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pause])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-white"
      >
        |
      </motion.span>
    </span>
  )
}

function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen pt-20 pb-0 relative overflow-hidden"
    >
      {/* Hero Section with Gradient Background */}
      <div className="relative min-h-screen gradient-bg flex items-center justify-center">
        <ParticleField />

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full text-white mb-8 border border-white/20"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <span className="text-sm font-medium tracking-wide">AI-Powered Analytics Platform</span>
            </motion.div>

            {/* College Name - Main Title */}
            <motion.div variants={itemVariants} className="mb-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                <AnimatedText text="SRI KRISHNA" delay={0.2} className="block" />
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                <ColorChangingText text="ENGINEERING COLLEGE" className="block" />
              </h1>
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 my-6"
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ delay: 1, duration: 1 }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center"
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ delay: 1, duration: 1 }}
              />
            </motion.div>

            {/* Sub College Name */}
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold text-white/90 tracking-wide">
                <AnimatedText text="& SRI KRISHNA INSTITUTE OF TECHNOLOGY" delay={0.8} className="inline" />
              </h2>
            </motion.div>

            {/* Animated Quote */}
            <motion.div
              variants={itemVariants}
              className="h-16 flex items-center justify-center mb-10"
            >
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-base md:text-lg text-white/70 italic max-w-2xl"
              >
                &ldquo;{quotes[currentQuote]}&rdquo;
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/department')}
                className="group px-8 py-4 bg-white text-indigo-700 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                Get Started
                <motion.div
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/analytics')}
                className="px-8 py-4 bg-white/15 text-white rounded-2xl font-bold text-lg border-2 border-white/30 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                View Dashboard
              </motion.button>
            </motion.div>

            {/* Department Ticker */}
            <motion.div
              variants={itemVariants}
              className="mt-16 overflow-hidden"
            >
              <p className="text-white/50 text-sm mb-3 uppercase tracking-widest">Departments</p>
              <div className="flex gap-3 justify-center flex-wrap">
                {departments.map((dept, index) => (
                  <motion.span
                    key={dept}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs font-medium border border-white/10"
                  >
                    {dept}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3">
              Powerful Features for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> Academic Excellence</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="gradient-bg py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10+", label: "Departments", icon: Building2 },
                { value: "4", label: "Academic Years", icon: GraduationCap },
                { value: "1000+", label: "Students", icon: Users },
                { value: "95%", label: "Success Rate", icon: Award },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.15, type: 'spring', stiffness: 200 }}
                >
                  <motion.div
                    className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <stat.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonial / Quote Section */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl text-primary/30 mb-6">&ldquo;</div>
            <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-8">
              &ldquo;The beautiful thing about learning is that nobody can take it away from you.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-semibold">B.B. King</span>
              <div className="h-px w-12 bg-primary" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">SKEC Dashboard</span>
            </div>
            <p className="text-gray-400 mb-4">SRI KRISHNA ENGINEERING COLLEGE & SRI KRISHNA INSTITUTE OF TECHNOLOGY</p>
            <p className="text-gray-500 text-sm">Student Analytics Dashboard &copy; 2026. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </motion.div>
  )
}

function Building2(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
      <path d="M10 6h4"/>
      <path d="M10 10h4"/>
      <path d="M10 14h4"/>
      <path d="M10 18h4"/>
    </svg>
  )
}

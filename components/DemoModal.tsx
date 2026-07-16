'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  BarChart3, 
  Brain, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Eye
} from 'lucide-react'

interface DemoModalProps {
  onClose: () => void
}

const steps = [
  {
    id: 1,
    title: 'Upload Your Data',
    description: 'Drag and drop your Excel, PDF, or CSV files containing student performance data into the upload area.',
    icon: Upload,
    color: '#007AFF',
    details: [
      'Supports .xlsx, .xls, .csv, and .pdf formats',
      'Multiple files can be uploaded simultaneously',
      'Data is securely processed in real-time',
      'Auto-detection of column headers and data types'
    ]
  },
  {
    id: 2,
    title: 'AI Processes Data',
    description: 'Our AI agent automatically analyses the uploaded data, extracting key metrics and identifying patterns.',
    icon: Brain,
    color: '#5856D6',
    details: [
      'Automatic data validation and cleaning',
      'Pattern recognition across student records',
      'Performance trend identification',
      'Anomaly detection for at-risk students'
    ]
  },
  {
    id: 3,
    title: 'Visualize Results',
    description: 'Interactive charts and graphs display performance trends, department comparisons, and individual student insights.',
    icon: BarChart3,
    color: '#34C759',
    details: [
      'Interactive charts with drill-down capability',
      'Year-wise and department-wise breakdowns',
      'Real-time dashboard updates',
      'Export charts as images or PDF reports'
    ]
  },
  {
    id: 4,
    title: 'Get AI Insights',
    description: 'Ask the AI assistant questions about the data and receive instant, actionable recommendations.',
    icon: Eye,
    color: '#FF9500',
    details: [
      'Natural language queries about student data',
      'Predictive performance forecasting',
      'At-risk student identification',
      'Custom report generation on demand'
    ]
  }
]

export default function DemoModal({ onClose }: DemoModalProps) {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0"
          style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl glass-strong rounded-3xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1D1D1F]">How It Works</h2>
                <p className="text-sm text-[#6E6E73] mt-1">Step-by-step guide to analyse student data</p>
              </div>
              <motion.button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-white/80 transition-all cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Steps Indicator */}
          <div className="px-6 py-4 flex items-center justify-center gap-2">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  index === activeStep
                    ? 'text-white'
                    : index < activeStep
                    ? 'text-[#34C759] bg-[#34C759]/10'
                    : 'text-[#AEAEB2] bg-white/30'
                }`}
                style={index === activeStep ? { 
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)`,
                  boxShadow: `0 4px 16px ${step.color}30`
                } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {index < activeStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                    {step.id}
                  </span>
                )}
                <span className="hidden sm:inline">{step.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Step Content */}
          <div className="p-6 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-start gap-5">
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      background: `${steps[activeStep].color}15`,
                      boxShadow: `0 4px 20px ${steps[activeStep].color}20`
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  >
                    {(() => {
                      const Icon = steps[activeStep].icon
                      return <Icon className="w-8 h-8" style={{ color: steps[activeStep].color }} />
                    })()}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-[#6E6E73] leading-relaxed">
                      {steps[activeStep].description}
                    </p>
                  </div>
                </div>

                {/* Details List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-0 sm:ml-21">
                  {steps[activeStep].details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/40 border border-white/30"
                    >
                      <CheckCircle className="w-4 h-4 text-[#34C759] flex-shrink-0" />
                      <span className="text-sm text-[#1D1D1F]">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/30 flex items-center justify-between">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-white/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (activeStep < steps.length - 1) {
                  setActiveStep(activeStep + 1)
                } else {
                  onClose()
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
              style={{ 
                background: `linear-gradient(135deg, ${steps[activeStep].color}, ${steps[activeStep].color}CC)`,
                boxShadow: `0 4px 16px ${steps[activeStep].color}30`
              }}
            >
              {activeStep === steps.length - 1 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

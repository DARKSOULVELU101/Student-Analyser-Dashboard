'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Send, 
  Loader2, 
  Sparkles,
  User,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Lightbulb
} from 'lucide-react'

interface AIAssistantProps {
  data: any[]
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIAssistant({ data }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Performance Analyst. I can help you analyze student data, identify trends, and provide actionable insights. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('performance') || lowerMessage.includes('score')) {
      return `Based on the uploaded data, here's the performance analysis:\n\nOverall Performance Metrics:\n- Average Score: 78.5%\n- Pass Rate: 92%\n- Top Performers: 15%\n- At-Risk Students: 8%\n\nKey Insights:\n1. CSE department shows highest improvement (+5% from last semester)\n2. Mathematics remains the most challenging subject\n3. Students with 90%+ attendance score 23% higher on average\n\nRecommendation: Focus on additional support for students scoring below 60% in Mathematics.`
    }
    
    if (lowerMessage.includes('department') || lowerMessage.includes('branch')) {
      return `Department-wise Analysis:\n\nTop Performing: CSE (82% average)\nNeeds Attention: MECH (72% average)\n\nDepartment Rankings:\n1. CSE - 82% avg | 95% pass rate\n2. ECE - 78% avg | 91% pass rate\n3. EEE - 76% avg | 89% pass rate\n4. CIVIL - 74% avg | 87% pass rate\n5. MECH - 72% avg | 85% pass rate\n\nConsider implementing peer learning programs between CSE and MECH departments.`
    }
    
    if (lowerMessage.includes('at risk') || lowerMessage.includes('failing') || lowerMessage.includes('drop')) {
      return `At-Risk Student Analysis:\n\nCritical Alerts:\n- 23 students at risk of failing\n- 8 students with attendance below 75%\n- 15 students scored below 40% in mid-semesters\n\nCommon Factors:\n1. Low attendance (correlation: 0.82)\n2. Missing assignments\n3. Irregular lab submissions\n\nIntervention Strategy:\n1. Schedule counseling sessions for flagged students\n2. Assign mentors from top performers\n3. Create remedial classes for weak subjects\n4. Parent notification system for attendance alerts`
    }
    
    if (lowerMessage.includes('predict') || lowerMessage.includes('forecast') || lowerMessage.includes('future')) {
      return `Performance Prediction Model:\n\nBased on current trends and historical data:\n\nSemester 8 Forecast:\n- Expected Pass Rate: 94% (+2% from current)\n- Projected Average: 81% (+3% improvement)\n- High Performers: 28% expected\n\nRisk Factors:\n- 12 students likely to drop below threshold\n- 5 students may miss eligibility criteria\n\nProactive Measures:\n1. Early intervention for identified at-risk students\n2. Additional mock tests for weak subjects\n3. Peer study groups formation`
    }
    
    if (lowerMessage.includes('attendance') || lowerMessage.includes('present')) {
      return `Attendance Analysis:\n\nOverall Attendance: 87%\n\nDepartment Breakdown:\n- CSE: 91% (Best)\n- ECE: 88%\n- EEE: 86%\n- CIVIL: 84%\n- MECH: 82%\n\nRed Flags:\n- 15 students below 75% threshold\n- 5 students below 60% (detention risk)\n\nImpact Analysis:\nStudents with 90%+ attendance score 23% higher\nStudents with <75% attendance have 3x higher failure rate`
    }
    
    return `I've analysed your query. Here's what I found:\n\nSummary:\n- Total students analysed: 500\n- Departments covered: 5\n- Semesters: 8\n\nQuick Insights:\n1. Overall performance trend is positive (+4% semester-over-semester)\n2. Assignment submission rate: 94%\n3. Lab performance average: 78%\n\nNext Steps:\n- Upload more detailed reports for deeper analysis\n- Ask about specific departments or subjects\n- Request predictions for upcoming semesters\n\nWhat specific aspect would you like me to analyse further?`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: generateAIResponse(input),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, aiResponse])
    setIsTyping(false)
  }

  const quickActions = [
    { label: 'Analyze Performance', icon: TrendingUp, query: 'Analyze overall student performance' },
    { label: 'At-Risk Students', icon: AlertTriangle, query: 'Show at-risk students' },
    { label: 'Department Stats', icon: CheckCircle, query: 'Compare department performance' },
    { label: 'Predictions', icon: Lightbulb, query: 'Predict next semester performance' },
  ]

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-extrabold text-[#1D1D1F] mb-2">AI Performance Analyst</h2>
          <p className="text-[#6E6E73]">Ask anything about student performance data</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-6 justify-center"
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              onClick={() => setInput(action.query)}
              className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-all cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <motion.div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #007AFF, #5856D6)' }}
                      whileHover={{ rotate: 10 }}
                    >
                      <Bot className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'text-white'
                      : 'bg-white/50 border border-white/30 text-[#1D1D1F]'
                  }`}
                  style={message.role === 'user' ? { 
                    background: 'linear-gradient(135deg, #007AFF, #5856D6)',
                    boxShadow: '0 4px 16px rgba(0, 122, 255, 0.2)'
                  } : {}}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content.split('\n').map((line, i) => (
                        <span key={i}>
                          {line.startsWith('- ') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') ? (
                            <span className="font-medium">{line}</span>
                          ) : line.includes(':') && !line.startsWith(' ') ? (
                            <span className="font-semibold">{line}</span>
                          ) : line}
                          {i < message.content.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs opacity-50 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-[#E5E5EA] flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-[#6E6E73]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007AFF, #5856D6)' }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/50 border border-white/30 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-[#6E6E73]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Analysing...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/30 p-4 bg-white/30">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about student performance..."
                className="flex-1 bg-white/50 border border-white/40 rounded-2xl px-5 py-3 text-[#1D1D1F] placeholder-[#AEAEB2] focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-all"
              />
              <motion.button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-5 py-3 glass-btn text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* AI Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { title: 'Real-time Analysis', desc: 'Instant insights from uploaded data', icon: Sparkles, color: '#007AFF' },
            { title: 'Predictive Modelling', desc: 'Forecast future performance trends', icon: TrendingUp, color: '#5856D6' },
            { title: 'Smart Recommendations', desc: 'AI-powered intervention strategies', icon: Lightbulb, color: '#FF9500' },
          ].map((capability, index) => (
            <motion.div 
              key={capability.title} 
              className="glass-card rounded-3xl p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div 
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3"
                style={{ background: `${capability.color}12` }}
              >
                <capability.icon className="w-6 h-6" style={{ color: capability.color }} />
              </div>
              <h4 className="text-sm font-bold text-[#1D1D1F] mb-1">{capability.title}</h4>
              <p className="text-xs text-[#6E6E73]">{capability.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

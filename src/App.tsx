import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { BookOpen, GraduationCap, LayoutDashboard, LineChart as LineIcon, LogOut, Mail, Plus, ShieldCheck, Trash2, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import type { User, Subject, Student, Exam, Performance, Stats } from './types'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

type Page = 'dashboard' | 'analytics' | 'notifications'
type ModalType = 'student' | 'subject' | 'exam' | 'performance' | 'notification' | null

type Store = {
  subjects: Subject[]
  students: Student[]
  exams: Exam[]
  performances: Performance[]
  notifications: Array<{ id: number; student: number; student_name: string; title: string; message: string; notification_type: string; delivery_method: string; sent_at: string }>
}

const demoStore: Store = {
  subjects: [
    { id: 1, name: 'Mathematics', description: 'Problem solving and algebra', notes: 'Focus on weekly practice tests', color_code: '#3B82F6' },
    { id: 2, name: 'Science', description: 'Physics, chemistry, biology', notes: 'Improve diagram-based answers', color_code: '#10B981' },
    { id: 3, name: 'English', description: 'Grammar and communication', notes: 'Reading comprehension is strong', color_code: '#F59E0B' }
  ],
  students: [
    { id: 1, name: 'Arjun Kumar', roll_number: 'STU001', email: 'arjun@example.com', phone: '9876543210', whatsapp_number: '+919876543210' },
    { id: 2, name: 'Meera S', roll_number: 'STU002', email: 'meera@example.com', phone: '9876501234', whatsapp_number: '+919876501234' },
    { id: 3, name: 'Rahul V', roll_number: 'STU003', email: 'rahul@example.com', phone: '9876511111', whatsapp_number: '+919876511111' }
  ],
  exams: [
    { id: 1, subject: 1, subject_name: 'Mathematics', exam_type: 'Unit Test', exam_date: '2026-06-01', total_marks: 100 },
    { id: 2, subject: 2, subject_name: 'Science', exam_type: 'Mid Term', exam_date: '2026-06-08', total_marks: 100 },
    { id: 3, subject: 3, subject_name: 'English', exam_type: 'Final Exam', exam_date: '2026-06-15', total_marks: 100 }
  ],
  performances: [
    { id: 1, student: 1, exam: 1, marks_obtained: 88, percentage: 88, grade: 'A', attendance: 96, student_name: 'Arjun Kumar', subject_name: 'Mathematics', exam_type: 'Unit Test', exam_date: '2026-06-01' },
    { id: 2, student: 1, exam: 2, marks_obtained: 74, percentage: 74, grade: 'B', attendance: 93, student_name: 'Arjun Kumar', subject_name: 'Science', exam_type: 'Mid Term', exam_date: '2026-06-08' },
    { id: 3, student: 2, exam: 1, marks_obtained: 92, percentage: 92, grade: 'A', attendance: 98, student_name: 'Meera S', subject_name: 'Mathematics', exam_type: 'Unit Test', exam_date: '2026-06-01' },
    { id: 4, student: 2, exam: 3, marks_obtained: 81, percentage: 81, grade: 'A', attendance: 97, student_name: 'Meera S', subject_name: 'English', exam_type: 'Final Exam', exam_date: '2026-06-15' },
    { id: 5, student: 3, exam: 2, marks_obtained: 67, percentage: 67, grade: 'C', attendance: 89, student_name: 'Rahul V', subject_name: 'Science', exam_type: 'Mid Term', exam_date: '2026-06-08' },
    { id: 6, student: 3, exam: 3, marks_obtained: 76, percentage: 76, grade: 'B', attendance: 91, student_name: 'Rahul V', subject_name: 'English', exam_type: 'Final Exam', exam_date: '2026-06-15' }
  ],
  notifications: []
}

function loadStore(): Store {
  const saved = localStorage.getItem('student-analyzer-store')
  if (!saved) return demoStore
  try { return JSON.parse(saved) as Store } catch { return demoStore }
}

function gradeFromPercentage(value: number) {
  if (value >= 80) return 'A'
  if (value >= 70) return 'B'
  if (value >= 60) return 'C'
  if (value >= 50) return 'D'
  return 'F'
}

export default function App() {
  const [user, setUser] = useState<User | null>(() => JSON.parse(localStorage.getItem('user') || 'null'))
  if (!user) return <Login onLogin={setUser} />
  return <DashboardApp user={user} onLogout={() => { localStorage.removeItem('user'); setUser(null); toast.success('Logged out') }} />
}

function Login({ onLogin }: { onLogin: (u: User) => void }) {
  const [userType, setUserType] = useState<'parent' | 'staff'>('parent')
  const [email, setEmail] = useState('parent@demo.com')
  const [password, setPassword] = useState('parent123')
  const [loading, setLoading] = useState(false)

  function switchType(type: 'parent' | 'staff') {
    setUserType(type)
    setEmail(type === 'parent' ? 'parent@demo.com' : 'staff@demo.com')
    setPassword(type === 'parent' ? 'parent123' : 'staff123')
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      const validParent = userType === 'parent' && email === 'parent@demo.com' && password === 'parent123'
      const validStaff = userType === 'staff' && email === 'staff@demo.com' && password === 'staff123'
      if (!validParent && !validStaff) {
        toast.error('Use the demo credentials shown on the form')
        setLoading(false)
        return
      }
      const loggedUser: User = { id: userType === 'parent' ? 1 : 2, username: userType === 'parent' ? 'Demo Parent' : 'Demo Staff', email, user_type: userType }
      localStorage.setItem('user', JSON.stringify(loggedUser))
      toast.success('Login successful')
      onLogin(loggedUser)
      setLoading(false)
    }, 450)
  }

  return <main className="login-page">
    <motion.section className="hero-copy" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
      <h1>Student Analyzer Dashboard</h1>
      <p>Frontend-only live demo for GitHub Pages. Monitor students, subjects, exam marks, performance trends, and parent notifications without needing a backend server.</p>
      <div className="badges"><span className="badge">React TypeScript</span><span className="badge">Vite</span><span className="badge">Recharts</span><span className="badge">GitHub Pages Ready</span></div>
    </motion.section>
    <motion.form className="login-card" onSubmit={submit} initial={{opacity:0, scale:.96}} animate={{opacity:1, scale:1}}>
      <h2>Demo Login</h2><p className="muted">Parent: parent@demo.com / parent123<br/>Staff: staff@demo.com / staff123</p>
      <div className="actions" style={{justifyContent:'flex-start', marginTop: 18}}>
        <button type="button" className={`btn ${userType === 'parent' ? '' : 'secondary'}`} onClick={() => switchType('parent')}>Parent</button>
        <button type="button" className={`btn ${userType === 'staff' ? '' : 'secondary'}`} onClick={() => switchType('staff')}>Staff</button>
      </div>
      <div className="form-grid">
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className="btn" disabled={loading}>{loading ? 'Signing in...' : 'Login to Dashboard'}</button>
      </div>
    </motion.form>
  </main>
}

function DashboardApp({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [page, setPage] = useState<Page>('dashboard')
  const [modal, setModal] = useState<ModalType>(null)
  const [store, setStore] = useState<Store>(() => loadStore())

  useEffect(() => { localStorage.setItem('student-analyzer-store', JSON.stringify(store)) }, [store])

  const stats: Stats = useMemo(() => {
    const average = store.performances.length ? Math.round(store.performances.reduce((sum, item) => sum + Number(item.percentage), 0) / store.performances.length) : 0
    return { total_students: store.students.length, total_subjects: store.subjects.length, total_exams: store.exams.length, average_performance: average, performance_count: store.performances.length }
  }, [store])

  const analytics = useMemo(() => {
    const bySubject = store.subjects.map(subject => {
      const rows = store.performances.filter(item => item.subject_name === subject.name)
      const value = rows.length ? Math.round(rows.reduce((sum, row) => sum + Number(row.percentage), 0) / rows.length) : 0
      return { name: subject.name, value }
    }).filter(item => item.value > 0)

    const bar = store.performances.map(item => ({ name: `${item.student_name} - ${item.subject_name}`, percentage: item.percentage }))
    const line = [...store.performances].sort((a, b) => a.exam_date.localeCompare(b.exam_date)).map(item => ({ date: item.exam_date.slice(5), percentage: item.percentage, name: item.subject_name }))
    const summary = store.performances.map(item => ({ student: item.student_name, subject: item.subject_name, exam: item.exam_type, date: item.exam_date, marks: item.marks_obtained, percentage: item.percentage, grade: item.grade }))
    return { pie_chart_data: bySubject, bar_chart_data: bar, line_chart_data: line, summary }
  }, [store])

  function removeStudent(id: number) {
    setStore(prev => ({ ...prev, students: prev.students.filter(s => s.id !== id), performances: prev.performances.filter(p => p.student !== id) }))
    toast.success('Student deleted')
  }

  function removeSubject(id: number) {
    const subject = store.subjects.find(s => s.id === id)
    setStore(prev => ({ ...prev, subjects: prev.subjects.filter(s => s.id !== id), exams: prev.exams.filter(e => e.subject !== id), performances: prev.performances.filter(p => p.subject_name !== subject?.name) }))
    toast.success('Subject deleted')
  }

  return <div className="app-shell">
    <header className="topbar"><div className="logo">StudentAnalyzer Pro</div><div className="actions"><span className="badge"><ShieldCheck size={16}/> {user.user_type}</span><button className="btn secondary" onClick={onLogout}><LogOut size={16}/> Logout</button></div></header>
    <div className="layout">
      <aside className="sidebar">
        <NavButton active={page==='dashboard'} onClick={()=>setPage('dashboard')} icon={<LayoutDashboard/>} label="Dashboard" />
        <NavButton active={page==='analytics'} onClick={()=>setPage('analytics')} icon={<LineIcon/>} label="Analytics" />
        <NavButton active={page==='notifications'} onClick={()=>setPage('notifications')} icon={<Mail/>} label="Notifications" />
      </aside>
      <main className="content">
        <AnimatePresence mode="wait">
          {page === 'dashboard' && <DashboardPage key="dashboard" user={user} stats={stats} subjects={store.subjects} students={store.students} performances={store.performances} open={setModal} removeStudent={removeStudent} removeSubject={removeSubject} />}
          {page === 'analytics' && <AnalyticsPage key="analytics" analytics={analytics} />}
          {page === 'notifications' && <NotificationsPage key="notifications" students={store.students} notifications={store.notifications} open={setModal} />}
        </AnimatePresence>
      </main>
    </div>
    <FormModal modal={modal} setModal={setModal} store={store} setStore={setStore} />
  </div>
}

function NavButton(props: {active:boolean; onClick:()=>void; icon: React.ReactNode; label:string}) {
  return <button className={`nav-btn ${props.active ? 'active' : ''}`} onClick={props.onClick}>{props.icon}{props.label}</button>
}

function PageWrap({ children }: { children: React.ReactNode }) { return <motion.div initial={{opacity:0, y:16}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-16}}>{children}</motion.div> }

function DashboardPage({ user, stats, subjects, students, performances, open, removeStudent, removeSubject }: any) {
  return <PageWrap>
    <div className="header-row"><div><h1>Welcome, {user.username}!</h1><p className="muted">Track student progress and exam performance in a frontend live demo.</p></div><div className="actions"><button className="btn" onClick={()=>open('student')}><Plus size={16}/> Add Student</button><button className="btn green" onClick={()=>open('subject')}><Plus size={16}/> Add Subject</button></div></div>
    <section className="stats">
      <Stat label="Students" value={stats.total_students} icon={<Users/>}/><Stat label="Subjects" value={stats.total_subjects} icon={<BookOpen/>}/><Stat label="Exams" value={stats.total_exams} icon={<GraduationCap/>}/><Stat label="Avg Performance" value={`${stats.average_performance}%`} icon={<LineIcon/>}/>
    </section>
    <section className="grid-2">
      <div className="card"><div className="card-title"><h2>Subjects</h2><button className="btn secondary" onClick={()=>open('exam')}>Add Exam</button></div><div className="list">{subjects.map((s:Subject)=><div className="list-item" key={s.id}><div><b>{s.name}</b><p className="muted">{s.notes || s.description || 'No notes added'}</p></div><div className="actions"><span style={{width:18,height:18,borderRadius:99,background:s.color_code}}/><button className="icon-btn" onClick={() => removeSubject(s.id)}><Trash2 size={16}/></button></div></div>)}</div></div>
      <div className="card"><div className="card-title"><h2>Students</h2><button className="btn secondary" onClick={()=>open('performance')}>Add Marks</button></div><div className="list">{students.map((s:Student)=><div className="list-item" key={s.id}><div style={{display:'flex',gap:12,alignItems:'center'}}><div className="avatar">{s.name[0]}</div><div><b>{s.name}</b><p className="muted">Roll No: {s.roll_number}</p></div></div><button className="icon-btn" onClick={() => removeStudent(s.id)}><Trash2 size={16}/></button></div>)}</div></div>
    </section>
    <div className="card" style={{marginTop:22}}><h2>Recent Performance</h2><table className="table"><thead><tr><th>Student</th><th>Subject</th><th>Marks</th><th>Percentage</th><th>Grade</th></tr></thead><tbody>{performances.slice(0,8).map((p:Performance)=><tr key={p.id}><td>{p.student_name}</td><td>{p.subject_name}</td><td>{p.marks_obtained}</td><td>{p.percentage}%</td><td>{p.grade}</td></tr>)}</tbody></table></div>
  </PageWrap>
}
function Stat({label, value, icon}: any) { return <motion.div className="card stat-card" whileHover={{y:-4}}><span className="muted">{icon} {label}</span><b>{value}</b></motion.div> }

function AnalyticsPage({ analytics }: any) {
  return <PageWrap><div className="header-row"><div><h1>Analytics</h1><p className="muted">Pie, bar, and line charts generated from local performance data.</p></div></div>
    <div className="grid-3">
      <div className="card"><h2>Subject Performance</h2><div className="chart-box"><ResponsiveContainer><PieChart><Pie data={analytics.pie_chart_data} dataKey="value" nameKey="name" outerRadius={95} label>{analytics.pie_chart_data.map((_:any,i:number)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div></div>
      <div className="card"><h2>Marks Comparison</h2><div className="chart-box"><ResponsiveContainer><BarChart data={analytics.bar_chart_data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" hide/><YAxis/><Tooltip/><Bar dataKey="percentage" fill="#3B82F6" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></div></div>
      <div className="card"><h2>Trend</h2><div className="chart-box"><ResponsiveContainer><LineChart data={analytics.line_chart_data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="date"/><YAxis/><Tooltip/><Line type="monotone" dataKey="percentage" stroke="#10B981" strokeWidth={3}/></LineChart></ResponsiveContainer></div></div>
    </div>
    <div className="card" style={{marginTop:22}}><h2>Performance Summary</h2><table className="table"><thead><tr><th>Student</th><th>Subject</th><th>Exam</th><th>Date</th><th>Marks</th><th>Grade</th></tr></thead><tbody>{analytics.summary.map((r:any,i:number)=><tr key={i}><td>{r.student}</td><td>{r.subject}</td><td>{r.exam}</td><td>{r.date}</td><td>{r.marks} / {r.percentage}%</td><td>{r.grade}</td></tr>)}</tbody></table></div>
  </PageWrap>
}

function NotificationsPage({ students, notifications, open }: any) {
  return <PageWrap><div className="header-row"><div><h1>Notifications</h1><p className="muted">Create performance alerts, improvement notes, and parent-teacher messages.</p></div><button className="btn" onClick={()=>open('notification')}><Mail size={16}/> Send Notification</button></div><div className="grid-2"><div className="card"><h2>Notification History</h2><div className="list">{notifications.length === 0 && <p className="muted">No notifications yet.</p>}{notifications.map((n:any)=><div className="list-item" key={n.id}><div><b>{n.title}</b><p className="muted">{n.student_name} · {n.delivery_method} · {n.sent_at}</p><p>{n.message}</p></div></div>)}</div></div><div className="card"><h2>Contact Students</h2><div className="list">{students.map((s:Student)=><div className="list-item" key={s.id}><b>{s.name}</b><span className="muted">{s.email || s.phone || 'No contact'}</span></div>)}</div></div></div></PageWrap>
}

function FormModal({ modal, setModal, store, setStore }: { modal: ModalType; setModal: (m: ModalType) => void; store: Store; setStore: React.Dispatch<React.SetStateAction<Store>> }) {
  const [form, setForm] = useState<any>({})
  useEffect(()=>setForm({}), [modal])
  if (!modal) return null
  const title = { student:'Add Student', subject:'Add Subject', exam:'Add Exam', performance:'Add Performance Marks', notification:'Send Notification' }[modal]
  function submit(e: React.FormEvent) {
    e.preventDefault()
    const nextId = (items: Array<{id:number}>) => Math.max(0, ...items.map(item => item.id)) + 1
    setStore(prev => {
      if (modal === 'student') {
        const item: Student = { id: nextId(prev.students), name: form.name || 'New Student', roll_number: form.roll_number || `STU${Date.now().toString().slice(-3)}`, email: form.email || '', phone: form.phone || '', whatsapp_number: form.whatsapp_number || '' }
        return { ...prev, students: [...prev.students, item] }
      }
      if (modal === 'subject') {
        const item: Subject = { id: nextId(prev.subjects), name: form.name || 'New Subject', description: form.description || '', notes: form.notes || '', color_code: form.color_code || '#3B82F6' }
        return { ...prev, subjects: [...prev.subjects, item] }
      }
      if (modal === 'exam') {
        const subject = prev.subjects.find(s => s.id === Number(form.subject)) || prev.subjects[0]
        const item: Exam = { id: nextId(prev.exams), subject: subject.id, subject_name: subject.name, exam_type: form.exam_type || 'Unit Test', exam_date: form.exam_date || new Date().toISOString().slice(0, 10), total_marks: Number(form.total_marks || 100) }
        return { ...prev, exams: [...prev.exams, item] }
      }
      if (modal === 'performance') {
        const student = prev.students.find(s => s.id === Number(form.student)) || prev.students[0]
        const exam = prev.exams.find(ex => ex.id === Number(form.exam)) || prev.exams[0]
        const marks = Number(form.marks_obtained || 0)
        const percentage = exam?.total_marks ? Math.round((marks / exam.total_marks) * 100) : marks
        const item: Performance = { id: nextId(prev.performances), student: student.id, exam: exam.id, marks_obtained: marks, percentage, grade: gradeFromPercentage(percentage), attendance: Number(form.attendance || 100), student_name: student.name, subject_name: exam.subject_name, exam_type: exam.exam_type, exam_date: exam.exam_date }
        return { ...prev, performances: [...prev.performances, item] }
      }
      if (modal === 'notification') {
        const student = prev.students.find(s => s.id === Number(form.student)) || prev.students[0]
        const item = { id: nextId(prev.notifications), student: student.id, student_name: student.name, title: form.title || 'Student Update', message: form.message || 'Performance update shared with parent.', notification_type: form.notification_type || 'message', delivery_method: form.delivery_method || 'email', sent_at: new Date().toLocaleString() }
        return { ...prev, notifications: [item, ...prev.notifications] }
      }
      return prev
    })
    toast.success('Saved successfully')
    setModal(null)
  }
  const input = (name:string, placeholder:string, type='text') => <input className="input" type={type} placeholder={placeholder} value={form[name] || ''} onChange={e=>setForm({...form, [name]: e.target.value})}/>
  return <div className="modal-backdrop"><motion.form className="modal login-card" onSubmit={submit} initial={{scale:.94, opacity:0}} animate={{scale:1, opacity:1}}><h2>{title}</h2><div className="form-grid">
    {modal==='student' && <>{input('name','Student name')}{input('roll_number','Roll number')}{input('email','Email')}{input('phone','Phone')}{input('whatsapp_number','WhatsApp number')}</>}
    {modal==='subject' && <>{input('name','Subject name')}{input('description','Description')}{input('notes','Notes')}{input('color_code','Color code e.g. #3B82F6')}</>}
    {modal==='exam' && <><select className="input" onChange={e=>setForm({...form, subject:e.target.value})}><option value="">Select subject</option>{store.subjects.map((s:Subject)=><option key={s.id} value={s.id}>{s.name}</option>)}</select><select className="input" onChange={e=>setForm({...form, exam_type:e.target.value})}><option value="Unit Test">Unit Test</option><option value="Mid Term">Mid Term</option><option value="Final Exam">Final Exam</option></select>{input('exam_date','Exam date','date')}{input('total_marks','Total marks','number')}</>}
    {modal==='performance' && <><select className="input" onChange={e=>setForm({...form, student:e.target.value})}><option value="">Select student</option>{store.students.map((s:Student)=><option key={s.id} value={s.id}>{s.name}</option>)}</select><select className="input" onChange={e=>setForm({...form, exam:e.target.value})}><option value="">Select exam</option>{store.exams.map((ex:Exam)=><option key={ex.id} value={ex.id}>{ex.subject_name} - {ex.exam_type}</option>)}</select>{input('marks_obtained','Marks obtained','number')}{input('attendance','Attendance %','number')}</>}
    {modal==='notification' && <><select className="input" onChange={e=>setForm({...form, student:e.target.value})}><option value="">Select student</option>{store.students.map((s:Student)=><option key={s.id} value={s.id}>{s.name}</option>)}</select>{input('title','Title')}{input('message','Message')}<select className="input" onChange={e=>setForm({...form, notification_type:e.target.value})}><option value="message">Parent-Teacher Message</option><option value="performance_alert">Performance Alert</option><option value="improvement">Improvement Notice</option><option value="assignment">Missing Assignment</option></select><select className="input" onChange={e=>setForm({...form, delivery_method:e.target.value})}><option value="email">Email</option><option value="whatsapp">WhatsApp</option><option value="both">Both</option></select></>}
  </div><div className="actions" style={{marginTop:20}}><button className="btn secondary" type="button" onClick={()=>setModal(null)}>Cancel</button><button className="btn">Save</button></div></motion.form></div>
}

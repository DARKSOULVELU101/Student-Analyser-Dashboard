import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Department from './pages/Department'
import Upload from './pages/Upload'
import Analytics from './pages/Analytics'
import Sidebar from './components/Sidebar'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/department" element={<Department />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <div className="flex min-h-screen p-6 gap-6 max-w-[1400px] mx-auto">
        <Sidebar />
        <main className="flex-1 flex flex-col gap-5 min-w-0">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  )
}

export default App

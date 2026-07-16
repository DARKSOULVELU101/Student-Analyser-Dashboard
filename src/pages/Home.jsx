import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap, Users, BookOpen, Award, Upload, BarChart3, Brain,
  Building2, Microscope, Cpu, Landmark, Heart, ArrowRight, Star,
  Phone, Mail, MapPin, Globe, ChevronRight, TrendingUp, Target,
  Sparkles, Rocket, Shield, Zap, Library, Bus, Home as HomeIcon,
  Trophy, Medal, Flame, ShieldCheck, BookMarked, Presentation,
  MonitorPlay, Wifi, Dumbbell, TreePine, Coffee
} from 'lucide-react';

const departments = [
  { name: 'Computer Science & Engineering', short: 'CSE', icon: Cpu, color: 'from-blue-500 to-indigo-600' },
  { name: 'Information Technology', short: 'IT', icon: MonitorPlay, color: 'from-purple-500 to-pink-600' },
  { name: 'Electronics & Communication', short: 'ECE', icon: Zap, color: 'from-cyan-500 to-blue-600' },
  { name: 'Electrical & Electronics', short: 'EEE', icon: Landmark, color: 'from-yellow-500 to-orange-600' },
  { name: 'Civil Engineering', short: 'CIVIL', icon: Building2, color: 'from-green-500 to-emerald-600' },
  { name: 'Mechanical Engineering', short: 'MECH', icon: Microscope, color: 'from-red-500 to-rose-600' },
  { name: 'AI & Data Science', short: 'AIDS', icon: Brain, color: 'from-violet-500 to-purple-600' },
  { name: 'AI & Machine Learning', short: 'AIML', icon: Sparkles, color: 'from-pink-500 to-rose-600' },
  { name: 'Cyber Security', short: 'CYBER', icon: Shield, color: 'from-teal-500 to-cyan-600' },
  { name: 'Fashion Technology', short: 'FASHION', icon: Star, color: 'from-amber-500 to-orange-600' },
];

const facilities = [
  { icon: Library, name: 'Central Library', desc: 'Over 50,000 volumes, digital archives, and e-journal access' },
  { icon: Bus, name: 'Transport', desc: 'Fleet of 30+ buses covering all routes across Chennai' },
  { icon: HomeIcon, name: 'Hostel', desc: 'Separate hostels for men and women with modern amenities' },
  { icon: Dumbbell, name: 'Sports Complex', desc: 'Indoor and outdoor sports with Olympic-size swimming pool' },
  { icon: Wifi, name: 'Campus Wi-Fi', desc: 'High-speed internet across entire campus with 1Gbps backbone' },
  { icon: Coffee, name: 'Cafeteria', desc: 'Multi-cuisine food court serving 1000+ students daily' },
  { icon: TreePine, name: 'Green Campus', desc: 'Eco-friendly campus with solar panels and rainwater harvesting' },
  { icon: ShieldCheck, name: '24/7 Security', desc: 'CCTV surveillance and security personnel around the clock' },
];

const recruiters = [
  'TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL Technologies',
  'Tech Mahindra', 'IBM', 'Accenture', 'Capgemini', 'L&T Technology',
  'Mindtree', 'Mphasis', 'Hexaware', 'Zoho', 'Freshworks'
];

const stats = [
  { label: 'Departments', value: '10', icon: BookOpen },
  { label: 'Academic Years', value: '4', icon: GraduationCap },
  { label: 'Students', value: '620+', icon: Users },
  { label: 'Success Rate', value: '94%', icon: Award },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const quotes = [
  'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.',
  'The beautiful thing about learning is that nobody can take it away from you.',
  'Success is not final, failure is not fatal: it is the courage to continue that counts.',
  'The only way to do great work is to love what you do.',
];

export default function Home() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = quotes[quoteIdx];
    let timeout;
    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 40);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 3000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 20);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, quoteIdx]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl mx-auto text-center py-16 px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <GraduationCap size={18} />
          <span>SRI KRISHNA ENGINEERING COLLEGE</span>
          <GraduationCap size={18} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
        >
          Student Analyser
          <br />
          <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
            Dashboard
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-4 font-light"
        >
          Powered by AI — Analyse academic performance, track student progress,
          and make data-driven decisions for academic excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 text-white/70 text-sm mb-6 flex-wrap"
        >
          <span className="flex items-center gap-1.5"><Phone size={14} /> +91 81108 61000</span>
          <span className="flex items-center gap-1.5"><Mail size={14} /> principal.skec@gmail.com</span>
          <span className="flex items-center gap-1.5"><MapPin size={14} /> Panapakkam, Chennai</span>
        </motion.div>

        {/* Typewriter Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-2xl p-6 max-w-2xl mx-auto mb-10"
        >
          <p className="text-white/90 text-base sm:text-lg italic min-h-[28px]">
            "{displayText}<span className="animate-pulse">|</span>"
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={item}
                className="glass-card p-5 text-center hover:scale-105 transition-transform duration-300"
              >
                <Icon className="mx-auto mb-2 text-indigo-600" size={28} />
                <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          {[
            { icon: Users, title: 'Student Management', desc: 'Track enrollment, attendance, and academic records for all 620+ students across 10 departments and 4 academic years.', color: 'from-blue-500 to-indigo-600', link: '/department' },
            { icon: BarChart3, title: 'Performance Analytics', desc: 'AI-powered analytics with interactive charts, trend analysis, and predictive insights to identify at-risk students early.', color: 'from-purple-500 to-pink-600', link: '/analytics' },
            { icon: Brain, title: 'AI Grade Analysis', desc: 'Upload student marks via Excel or text files and let our AI engine generate comprehensive grade distributions and reports.', color: 'from-cyan-500 to-blue-600', link: '/upload' },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={i} variants={item}>
                <Link to={card.link} className="block glass-card p-8 text-center hover:scale-[1.03] transition-all duration-300 group h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={30} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 text-indigo-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Departments */}
      <section className="w-full max-w-6xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Our Departments</h2>
          <p className="text-white/70 text-base max-w-xl mx-auto">10 specialized departments offering cutting-edge engineering and technology programs</p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.short}
                variants={item}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-5 text-center cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <Icon className="text-white" size={22} />
                </div>
                <p className="font-bold text-gray-900 text-sm">{dept.short}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{dept.name}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Facilities */}
      <section className="w-full max-w-6xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Campus Facilities</h2>
          <p className="text-white/70 text-base max-w-xl mx-auto">World-class infrastructure to support holistic development of students</p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {facilities.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ scale: 1.03 }}
                className="glass-card p-6 text-center"
              >
                <Icon className="mx-auto mb-3 text-indigo-600" size={32} />
                <h4 className="font-bold text-gray-900 mb-2">{f.name}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Recruiters */}
      <section className="w-full max-w-5xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Our Recruiters</h2>
          <p className="text-white/70 text-base max-w-xl mx-auto">Top companies that recruit from SRI KRISHNA ENGINEERING COLLEGE</p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {recruiters.map((r, i) => (
            <motion.div
              key={i}
              variants={item}
              className="glass-card px-5 py-3 text-sm font-semibold text-gray-700 hover:scale-105 transition-transform"
            >
              {r}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-4xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-10 text-center"
        >
          <Rocket className="mx-auto mb-4 text-indigo-600" size={40} />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Ready to Analyse Student Performance?</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto leading-relaxed">
            Upload your class marks and let our AI-powered system generate detailed analytics,
            performance insights, and predictive reports to help every student succeed.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Upload size={18} />
            Get Started Now
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full glass py-8 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">SA</div>
            <span className="text-white font-bold">Student Analyser Dashboard</span>
          </div>
          <p className="text-white/60 text-sm mb-2">SRI KRISHNA ENGINEERING COLLEGE</p>
          <p className="text-white/50 text-xs">
            Counselling Code: 1427 | Panapakkam, Chennai - 601 301 | +91 81108 61000 | principal.skec@gmail.com
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-white/50 text-xs">
            <span className="flex items-center gap-1"><Globe size={12} /> skec.edu.in</span>
            <span>|</span>
            <span>© 2025 SKEC. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

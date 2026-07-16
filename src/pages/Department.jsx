import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu, MonitorPlay, Zap, Landmark, Building2, Microscope,
  Brain, Sparkles, Shield, Star, ChevronRight, GraduationCap,
  Users, TrendingUp, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const departments = [
  { name: 'Computer Science & Engineering', short: 'CSE', icon: Cpu, color: 'from-blue-500 to-indigo-600', strength: 120, years: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  { name: 'Information Technology', short: 'IT', icon: MonitorPlay, color: 'from-purple-500 to-pink-600', strength: 100, years: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  { name: 'Electronics & Communication', short: 'ECE', icon: Zap, color: 'from-cyan-500 to-blue-600', strength: 80, years: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  { name: 'Electrical & Electronics', short: 'EEE', icon: Landmark, color: 'from-yellow-500 to-orange-600', strength: 60, years: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  { name: 'Civil Engineering', short: 'CIVIL', icon: Building2, color: 'from-green-500 to-emerald-600', strength: 50, years: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  { name: 'Mechanical Engineering', short: 'MECH', icon: Microscope, color: 'from-red-500 to-rose-600', strength: 60, years: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  { name: 'AI & Data Science', short: 'AIDS', icon: Brain, color: 'from-violet-500 to-purple-600', strength: 60, years: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  { name: 'AI & Machine Learning', short: 'AIML', icon: Sparkles, color: 'from-pink-500 to-rose-600', strength: 60, years: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  { name: 'Cyber Security', short: 'CYBER', icon: Shield, color: 'from-teal-500 to-cyan-600', strength: 60, years: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  { name: 'Fashion Technology', short: 'FASHION', icon: Star, color: 'from-amber-500 to-orange-600', strength: 30, years: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function Department() {
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (selectedDept && selectedYear) {
      navigate('/upload', { state: { department: selectedDept.short, year: selectedYear } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mx-auto text-center py-12 px-4"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Select <span className="text-yellow-200">Department</span>
        </h1>
        <p className="text-white/70 text-base max-w-xl mx-auto mb-4">
          Choose the department and academic year to view or upload student performance data
        </p>
        <div className="flex items-center justify-center gap-4 text-white/60 text-sm mb-10 flex-wrap">
          <span className="flex items-center gap-1"><GraduationCap size={14} /> 10 Departments</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Users size={14} /> 620+ Students</span>
          <span>•</span>
          <span className="flex items-center gap-1"><TrendingUp size={14} /> 4 Academic Years</span>
        </div>

        {/* Department Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10"
        >
          {departments.map((dept) => {
            const Icon = dept.icon;
            const isSelected = selectedDept?.short === dept.short;
            return (
              <motion.div
                key={dept.short}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSelectedDept(dept); setSelectedYear(null); }}
                className={`glass-card p-5 text-center cursor-pointer transition-all duration-300 ${
                  isSelected ? 'ring-4 ring-yellow-400 shadow-xl shadow-yellow-400/20' : ''
                }`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <Icon className="text-white" size={26} />
                </div>
                <p className="font-bold text-gray-900 text-sm">{dept.short}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug min-h-[32px]">{dept.name}</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-400">
                  <Users size={12} />
                  <span>{dept.strength} students</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Year Selection */}
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto mb-10"
          >
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedDept.name}
              </h3>
              <p className="text-sm text-gray-500 mb-6">Select the academic year to proceed</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {selectedDept.years.map((year) => (
                  <motion.button
                    key={year}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedYear(year)}
                    className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      selectedYear === year
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year}
                  </motion.button>
                ))}
              </div>
              {selectedYear && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProceed}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Proceed to Upload
                  <ChevronRight size={18} />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Department Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="glass-card p-8 text-center">
            <Award className="mx-auto mb-4 text-indigo-600" size={36} />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Department Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-extrabold text-indigo-600">10</p>
                <p className="text-sm text-gray-500">Departments</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-purple-600">620+</p>
                <p className="text-sm text-gray-500">Total Students</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-cyan-600">4</p>
                <p className="text-sm text-gray-500">Academic Years</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-green-600">94%</p>
                <p className="text-sm text-gray-500">Pass Rate</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, LineChart, Line, AreaChart, Area
} from 'recharts';
import {
  Brain, TrendingUp, AlertTriangle, Award, Users, BookOpen,
  ArrowUpRight, ArrowDownRight, Minus, Trophy, Medal, Flame,
  Download, ChevronLeft, BarChart3
} from 'lucide-react';

const COLORS = ['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f97316', '#14b8a6', '#e11d48'];

const defaultData = [
  { 'Roll No': 'CSE001', 'Name': 'Arun Kumar', 'Maths': 85, 'Physics': 78, 'Chemistry': 90, 'English': 88, 'CS Fundamentals': 92 },
  { 'Roll No': 'CSE002', 'Name': 'Priya Devi', 'Maths': 92, 'Physics': 85, 'Chemistry': 88, 'English': 95, 'CS Fundamentals': 96 },
  { 'Roll No': 'CSE003', 'Name': 'Ravi Shankar', 'Maths': 65, 'Physics': 58, 'Chemistry': 72, 'English': 70, 'CS Fundamentals': 68 },
  { 'Roll No': 'CSE004', 'Name': 'Lakshmi Priya', 'Maths': 78, 'Physics': 82, 'Chemistry': 75, 'English': 80, 'CS Fundamentals': 85 },
  { 'Roll No': 'CSE005', 'Name': 'Karthik Raj', 'Maths': 55, 'Physics': 48, 'Chemistry': 62, 'English': 65, 'CS Fundamentals': 58 },
  { 'Roll No': 'CSE006', 'Name': 'Deepa Nair', 'Maths': 95, 'Physics': 92, 'Chemistry': 94, 'English': 90, 'CS Fundamentals': 98 },
  { 'Roll No': 'CSE007', 'Name': 'Suresh Babu', 'Maths': 42, 'Physics': 38, 'Chemistry': 55, 'English': 45, 'CS Fundamentals': 40 },
  { 'Roll No': 'CSE008', 'Name': 'Anitha S', 'Maths': 88, 'Physics': 75, 'Chemistry': 82, 'English': 85, 'CS Fundamentals': 90 },
  { 'Roll No': 'CSE009', 'Name': 'Mohan Prasad', 'Maths': 70, 'Physics': 65, 'Chemistry': 68, 'English': 72, 'CS Fundamentals': 74 },
  { 'Roll No': 'CSE010', 'Name': 'Vidya Lakshmi', 'Maths': 82, 'Physics': 88, 'Chemistry': 80, 'English': 86, 'CS Fundamentals': 88 },
];

export default function Analytics() {
  const location = useLocation();
  const dept = location.state?.department || 'CSE';
  const year = location.state?.year || '3rd Year';
  const rawData = location.state?.studentData || defaultData;

  const subjectCols = useMemo(() => {
    if (!rawData || rawData.length === 0) return [];
    return Object.keys(rawData[0]).filter(k => k !== 'Roll No' && k !== 'Name' && k !== 'Roll' && !k.toLowerCase().includes('name') && !k.toLowerCase().includes('roll'));
  }, [rawData]);

  const processedData = useMemo(() => {
    return rawData.map(row => {
      const marks = subjectCols.map(s => Number(row[s]) || 0);
      const avg = marks.reduce((a, b) => a + b, 0) / marks.length;
      let grade = 'F';
      if (avg >= 90) grade = 'A+';
      else if (avg >= 80) grade = 'A';
      else if (avg >= 70) grade = 'B+';
      else if (avg >= 60) grade = 'B';
      else if (avg >= 50) grade = 'C';
      else if (avg >= 40) grade = 'D';
      return { ...row, _avg: Math.round(avg * 10) / 10, _grade: grade, _total: marks.reduce((a, b) => a + b, 0) };
    }).sort((a, b) => b._avg - a._avg);
  }, [rawData, subjectCols]);

  const gradeDistribution = useMemo(() => {
    const counts = {};
    processedData.forEach(d => { counts[d._grade] = (counts[d._grade] || 0) + 1; });
    const order = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'];
    return order.filter(g => counts[g]).map(g => ({ name: g, value: counts[g] }));
  }, [processedData]);

  const subjectAverages = useMemo(() => {
    return subjectCols.map(s => ({
      subject: s.length > 12 ? s.slice(0, 12) + '...' : s,
      fullName: s,
      avg: Math.round(processedData.reduce((sum, d) => sum + (Number(d[s]) || 0), 0) / processedData.length)
    }));
  }, [subjectCols, processedData]);

  const radarData = useMemo(() => {
    return subjectCols.map(s => ({
      subject: s.length > 10 ? s.slice(0, 10) + '..' : s,
      average: Math.round(processedData.reduce((sum, d) => sum + (Number(d[s]) || 0), 0) / processedData.length),
      fullMark: 100
    }));
  }, [subjectCols, processedData]);

  const classStats = useMemo(() => {
    const avgs = processedData.map(d => d._avg);
    const overall = avgs.reduce((a, b) => a + b, 0) / avgs.length;
    const highest = Math.max(...avgs);
    const lowest = Math.min(...avgs);
    const pass = processedData.filter(d => d._avg >= 40).length;
    const toppers = processedData.filter(d => d._avg >= 90).length;
    const atRisk = processedData.filter(d => d._avg < 50).length;
    return {
      overall: Math.round(overall * 10) / 10,
      highest, lowest,
      passRate: Math.round((pass / processedData.length) * 100),
      toppers, atRisk, total: processedData.length
    };
  }, [processedData]);

  const aiInsights = useMemo(() => {
    const insights = [];
    const hardest = [...subjectAverages].sort((a, b) => a.avg - b.avg)[0];
    const easiest = [...subjectAverages].sort((a, b) => b.avg - a.avg)[0];
    insights.push({ type: 'info', icon: Brain, title: 'AI Analysis', text: `Class average is ${classStats.overall}%. ${classStats.overall >= 75 ? 'Overall performance is strong.' : classStats.overall >= 50 ? 'Performance is moderate with room for improvement.' : 'Performance needs significant attention.'}` });
    insights.push({ type: 'success', icon: TrendingUp, title: 'Strongest Subject', text: `${easiest.fullName} has the highest average at ${easiest.avg}%. Students perform best in this subject.` });
    if (hardest.avg < 60) {
      insights.push({ type: 'warning', icon: AlertTriangle, title: 'Needs Attention', text: `${hardest.fullName} has the lowest average at ${hardest.avg}%. Consider additional coaching sessions.` });
    }
    if (classStats.atRisk > 0) {
      insights.push({ type: 'danger', icon: AlertTriangle, title: 'At-Risk Students', text: `${classStats.atRisk} student(s) have averages below 50%. Early intervention recommended.` });
    }
    if (classStats.toppers > 0) {
      insights.push({ type: 'success', icon: Award, title: 'High Performers', text: `${classStats.toppers} student(s) scored above 90% average. Consider for honours programme.` });
    }
    const topStudent = processedData[0];
    const bottomStudent = processedData[processedData.length - 1];
    insights.push({ type: 'info', icon: Trophy, title: 'Class Topper', text: `${topStudent.Name || topStudent['Roll No']} leads with ${topStudent._avg}% average.` });
    if (classStats.passRate < 100) {
      insights.push({ type: 'warning', icon: AlertTriangle, title: 'Pass Rate', text: `Pass rate is ${classStats.passRate}%. ${classStats.total - Math.round(classStats.total * classStats.passRate / 100)} student(s) need support.` });
    }
    return insights;
  }, [processedData, subjectAverages, classStats]);

  const leaderboard = processedData.slice(0, 10);

  const medalIcons = [<Trophy className="text-yellow-500" size={20} />, <Medal className="text-gray-400" size={20} />, <Medal className="text-amber-600" size={20} />];

  if (!location.state?.studentData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 text-center max-w-lg"
        >
          <BarChart3 className="mx-auto mb-4 text-indigo-600" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Data Available</h2>
          <p className="text-gray-600 mb-6">Upload student marks data first to view analytics and AI insights.</p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronLeft size={18} />
            Go to Upload
          </Link>
        </motion.div>
      </div>
    );
  }

  const insightsColors = { info: 'bg-blue-50 border-blue-200 text-blue-800', success: 'bg-green-50 border-green-200 text-green-800', warning: 'bg-yellow-50 border-yellow-200 text-yellow-800', danger: 'bg-red-50 border-red-200 text-red-800' };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl mx-auto py-12 px-4"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            <span className="text-yellow-200">Analytics</span> Dashboard
          </h1>
          <p className="text-white/70 text-base max-w-xl mx-auto mb-2">
            AI-powered insights for {dept} — {year}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm">
            <Users size={14} />
            <span>{classStats.total} Students</span>
            <span>•</span>
            <span>{subjectCols.length} Subjects</span>
          </div>
        </div>

        {/* Class Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Class Average', value: `${classStats.overall}%`, icon: BarChart3, color: 'text-indigo-600' },
            { label: 'Highest Average', value: `${classStats.highest}%`, icon: ArrowUpRight, color: 'text-green-600' },
            { label: 'Pass Rate', value: `${classStats.passRate}%`, icon: BookOpen, color: 'text-blue-600' },
            { label: 'At-Risk Students', value: classStats.atRisk, icon: AlertTriangle, color: 'text-red-600' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass-card p-5 text-center"
              >
                <Icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
                <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="text-indigo-600" size={22} />
              <h2 className="text-lg font-bold text-gray-900">AI Insights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiInsights.map((insight, i) => {
                const Icon = insight.icon;
                return (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${insightsColors[insight.type]}`}>
                    <Icon size={18} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{insight.title}</p>
                      <p className="text-xs mt-0.5 opacity-80">{insight.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Grade Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Grade Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {gradeDistribution.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Subject Averages Bar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Subject Averages</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={subjectAverages} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
                  {subjectAverages.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Performance Radar</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Average" dataKey="average" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Student Performance Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={processedData.map((d, i) => ({ name: d.Name || d['Roll No']?.slice(-3) || `S${i + 1}`, avg: d._avg }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="avg" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-500" size={22} />
            <h2 className="text-lg font-bold text-gray-900">Top Performers Leaderboard</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase">Rank</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase">Student</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 text-xs uppercase">Average</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 text-xs uppercase">Grade</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 text-xs uppercase">Total</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((student, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.03 }}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${i < 3 ? 'bg-yellow-50/50' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {i < 3 ? medalIcons[i] : <span className="w-5 text-center font-bold text-gray-500 text-xs">#{i + 1}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{student.Name || student['Roll No']}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${student._avg >= 90 ? 'text-green-600' : student._avg >= 70 ? 'text-blue-600' : student._avg >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {student._avg}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        student._grade === 'A+' ? 'bg-green-100 text-green-700' :
                        student._grade === 'A' ? 'bg-blue-100 text-blue-700' :
                        student._grade === 'B+' ? 'bg-purple-100 text-purple-700' :
                        student._grade === 'B' ? 'bg-cyan-100 text-cyan-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {student._grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 font-mono">{student._total}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Full Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 mb-8"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">Complete Student Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {['#', 'Roll No', 'Name', ...subjectCols, 'Average', 'Grade'].map((h, i) => (
                    <th key={i} className="px-3 py-2 text-left font-semibold text-gray-600 text-xs uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {processedData.map((student, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-3 py-2 text-gray-700 font-mono text-xs">{student['Roll No']}</td>
                    <td className="px-3 py-2 font-medium text-gray-900 text-xs">{student.Name}</td>
                    {subjectCols.map((s, j) => (
                      <td key={j} className="px-3 py-2 text-center text-gray-700 font-mono text-xs">
                        {student[s]}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-center font-bold text-xs">{student._avg}%</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        student._grade === 'A+' ? 'bg-green-100 text-green-700' :
                        student._grade === 'A' ? 'bg-blue-100 text-blue-700' :
                        student._grade === 'B+' ? 'bg-purple-100 text-purple-700' :
                        student._grade === 'B' ? 'bg-cyan-100 text-cyan-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {student._grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all mr-3"
          >
            <ChevronLeft size={18} />
            Upload New Data
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Download size={18} />
            Export Report
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

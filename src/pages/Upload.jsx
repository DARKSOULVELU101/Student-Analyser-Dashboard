import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Upload as UploadIcon, FileSpreadsheet, FileText, X, Eye,
  CheckCircle, AlertCircle, ArrowRight, BarChart3, Download
} from 'lucide-react';
import * as XLSX from 'xlsx';

export default function Upload() {
  const navigate = useNavigate();
  const location = useLocation();
  const dept = location.state?.department || 'CSE';
  const year = location.state?.year || '3rd Year';

  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const parseFile = useCallback((f) => {
    setError('');
    const ext = f.name.split('.').pop().toLowerCase();
    if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const wb = XLSX.read(e.target.result, { type: 'binary' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(ws, { defval: '' });
          if (json.length > 0) {
            setHeaders(Object.keys(json[0]));
            setData(json);
          } else {
            setError('The Excel file appears to be empty.');
          }
        } catch (err) {
          setError('Failed to parse Excel file. Please check the format.');
        }
      };
      reader.readAsBinaryString(f);
    } else if (ext === 'txt' || ext === 'csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const lines = text.trim().split('\n').map(l => l.split(/[,\t]/).map(c => c.trim()));
          if (lines.length > 1) {
            const h = lines[0];
            const rows = lines.slice(1).map(r => {
              const obj = {};
              h.forEach((key, i) => obj[key] = r[i] || '');
              return obj;
            });
            setHeaders(h);
            setData(rows);
          } else {
            setError('The file appears to be empty or has no data rows.');
          }
        } catch (err) {
          setError('Failed to parse text file.');
        }
      };
      reader.readAsText(f);
    } else {
      setError('Unsupported file type. Please upload .xlsx, .xls, .txt, or .csv files.');
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      parseFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      parseFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setData(null);
    setHeaders([]);
    setError('');
  };

  const proceedToAnalytics = () => {
    navigate('/analytics', { state: { department: dept, year, studentData: data, headers } });
  };

  const loadSampleData = () => {
    const sample = [
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
    setHeaders(Object.keys(sample[0]));
    setData(sample);
    setFile({ name: 'sample_cse_3rd_year.xlsx', type: 'application/xlsx' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mx-auto text-center py-12 px-4"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Upload <span className="text-yellow-200">Marks Data</span>
        </h1>
        <p className="text-white/70 text-base max-w-xl mx-auto mb-2">
          Upload student marks via Excel or text file for AI-powered analysis
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm mb-10">
          <span className="font-semibold">{dept}</span>
          <span>•</span>
          <span>{year}</span>
        </div>

        {/* Upload Area */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          {!file ? (
            <motion.div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`glass-card p-12 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
                dragActive ? 'border-indigo-400 bg-indigo-50/20 scale-[1.02]' : 'border-gray-300 hover:border-indigo-300'
              }`}
              whileHover={{ scale: 1.01 }}
            >
              <UploadIcon className="mx-auto mb-4 text-indigo-500" size={48} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Drag & Drop Your File Here</h3>
              <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
              <div className="flex items-center justify-center gap-3 text-xs text-gray-400 mb-6">
                <span className="flex items-center gap-1"><FileSpreadsheet size={14} /> .xlsx</span>
                <span className="flex items-center gap-1"><FileSpreadsheet size={14} /> .xls</span>
                <span className="flex items-center gap-1"><FileText size={14} /> .txt</span>
                <span className="flex items-center gap-1"><FileText size={14} /> .csv</span>
              </div>
              <input
                type="file"
                accept=".xlsx,.xls,.txt,.csv"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); document.querySelector('input[type=file]').click(); }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <FileSpreadsheet size={16} />
                Browse Files
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{data?.length || 0} rows • {headers.length} columns</p>
                  </div>
                </div>
                <button onClick={clearFile} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Data Preview */}
              {data && (
                <div className="overflow-x-auto mb-4 rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        {headers.map((h, i) => (
                          <th key={i} className="px-4 py-2 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.slice(0, 5).map((row, i) => (
                        <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                          {headers.map((h, j) => (
                            <td key={j} className="px-4 py-2 text-gray-700">
                              {row[h]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {data.length > 5 && (
                    <p className="text-xs text-gray-400 text-center py-2 bg-gray-50">
                      Showing 5 of {data.length} rows
                    </p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={proceedToAnalytics}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <BarChart3 size={18} />
                  Analyse Data
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mt-4"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}
        </div>

        {/* Sample Data Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl mx-auto mb-10"
        >
          <div className="glass-card p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">No file ready?</h3>
            <p className="text-sm text-gray-500 mb-4">
              Load sample CSE 3rd Year marks data to explore the analytics dashboard
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadSampleData}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Download size={16} />
              Load Sample Data
            </motion.button>
          </div>
        </motion.div>

        {/* Supported Formats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Supported File Formats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-blue-50">
                <FileSpreadsheet className="mx-auto mb-2 text-blue-600" size={28} />
                <p className="font-bold text-gray-900 text-sm">Excel Files</p>
                <p className="text-xs text-gray-500 mt-1">.xlsx and .xls formats with column headers in the first row</p>
              </div>
              <div className="p-4 rounded-xl bg-green-50">
                <FileText className="mx-auto mb-2 text-green-600" size={28} />
                <p className="font-bold text-gray-900 text-sm">Text Files</p>
                <p className="text-xs text-gray-500 mt-1">Tab or comma-separated .txt files with headers</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50">
                <FileText className="mx-auto mb-2 text-purple-600" size={28} />
                <p className="font-bold text-gray-900 text-sm">CSV Files</p>
                <p className="text-xs text-gray-500 mt-1">Standard comma-separated values with headers</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Expected Format:</strong> First row should contain column headers (e.g., Roll No, Name, Subject1, Subject2...). 
                Each subsequent row should represent a student with their marks.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar2 from './components/Navbar2';
import Home from './pages/Home';
import Department from './pages/Department';
import Upload from './pages/Upload';
import Analytics from './pages/Analytics';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen gradient-bg">
        <Navbar2 />
        <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/department" element={<Department />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

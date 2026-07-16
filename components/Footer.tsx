'use client'

import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/30 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007AFF, #5856D6)' }}>
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1D1D1F]">Student Analyser</h3>
                <p className="text-xs text-[#6E6E73]">SKEC & SKIT</p>
              </div>
            </div>
            <p className="text-sm text-[#6E6E73] mb-4 max-w-md">
              AI-powered student performance analysis platform for Sri Krishna Engineering College 
              and Sri Krishna Institute of Technology. Empowering educators with data-driven insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#1D1D1F] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Upload Data', 'Analytics', 'AI Assistant'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors cursor-pointer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[#1D1D1F] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#6E6E73]">
                <Phone className="w-4 h-4" style={{ color: '#007AFF' }} />
                +91-81108 61000
              </li>
              <li className="flex items-center gap-2 text-sm text-[#6E6E73]">
                <Mail className="w-4 h-4" style={{ color: '#007AFF' }} />
                principal.skec@gmail.com
              </li>
              <li className="flex items-start gap-2 text-sm text-[#6E6E73]">
                <MapPin className="w-4 h-4 mt-0.5" style={{ color: '#007AFF' }} />
                <span>Panapakkam, Near Padappai, Chennai - 601 301</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#AEAEB2]">
            © 2026 Sri Krishna Engineering College. All rights reserved.
          </p>
          <a
            href="https://skec.edu.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors cursor-pointer"
          >
            Visit SKEC Website
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}

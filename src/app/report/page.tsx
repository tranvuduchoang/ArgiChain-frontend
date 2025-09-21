'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Database, 
  Code, 
  Users, 
  FileText, 
  Building2,
  ChevronRight,
  Search,
  Menu,
  X,
  ExternalLink,
  Download,
  Eye,
  Info
} from 'lucide-react';

// Import các components
import TechnicalReport from '@/components/report/TechnicalReport';
import SystemArchitecture from '@/components/report/SystemArchitecture';
import DatabaseSchema from '@/components/report/DatabaseSchema';
import FunctionAnalysis from '@/components/report/FunctionAnalysis';
import UserGuide from '@/components/report/UserGuide';
import Overview from '@/components/report/Overview';

const ReportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    {
      id: 'overview',
      label: 'Tổng Quan',
      icon: <BookOpen className="w-5 h-5" color='black'/>,
      component: <Overview />
    },
    {
      id: 'technical-report',
      label: 'Báo Cáo Kỹ Thuật',
      icon: <FileText className="w-5 h-5" color='black'/>,
      component: <TechnicalReport />
    },
    {
      id: 'architecture',
      label: 'Kiến Trúc Hệ Thống',
      icon: <Building2 className="w-5 h-5" color='black'/>,
      component: <SystemArchitecture />
    },
    {
      id: 'database',
      label: 'Sơ Đồ Database',
      icon: <Database className="w-5 h-5" color='black'/>,
      component: <DatabaseSchema />
    },
    {
      id: 'functions',
      label: 'Phân Tích Functions',
      icon: <Code className="w-5 h-5" color='black'/>,
      component: <FunctionAnalysis />
    },
    {
      id: 'user-guide',
      label: 'Hướng Dẫn Sử Dụng',
      icon: <Users className="w-5 h-5" color='black'/>,
      component: <UserGuide />
    }
  ];

  const filteredTabs = tabs.filter(tab => 
    tab.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  AgriChain Technical Report
                </h1>
                <p className="text-sm text-gray-600">Báo cáo kỹ thuật chi tiết về hệ thống blockchain nông nghiệp</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-black"
                />
              </div>
              <button className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 bg-white/90 backdrop-blur-md border-r border-gray-200 min-h-screen overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Mục Lục</h2>
                <nav className="space-y-2">
                  {filteredTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                        activeTab === tab.id ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} />
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Thống Kê Nhanh</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Smart Contracts:</span>
                      <span className="font-medium text-green-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">API Endpoints:</span>
                      <span className="font-medium text-blue-600">25+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Database Tables:</span>
                      <span className="font-medium text-purple-600">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Functions:</span>
                      <span className="font-medium text-orange-600">50+</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto"
              >
                {tabs.find(tab => tab.id === activeTab)?.component}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportPage;

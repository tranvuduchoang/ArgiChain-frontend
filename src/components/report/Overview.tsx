'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight, 
  Star,
  Shield,
  Zap,
  Globe,
  Database,
  Code,
  Users,
  FileText,
  Building2
} from 'lucide-react';

const Overview: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Bảo Mật Blockchain",
      description: "Sử dụng công nghệ blockchain để đảm bảo tính minh bạch và bảo mật trong giao dịch nông sản"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Giao Dịch Nhanh Chóng",
      description: "Hệ thống thanh toán tự động và xử lý giao dịch nhanh chóng với smart contracts"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Toàn Cầu Hóa",
      description: "Kết nối nông dân và người mua trên toàn thế giới thông qua nền tảng trực tuyến"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-600" />,
      title: "Quản Lý Dữ Liệu",
      description: "Hệ thống quản lý sản phẩm, đơn hàng và lịch sử giao dịch toàn diện"
    }
  ];

  const stats = [
    { label: "Smart Contracts", value: "3", color: "text-green-600" },
    { label: "API Endpoints", value: "25+", color: "text-blue-600" },
    { label: "Database Tables", value: "15", color: "text-purple-600" },
    { label: "Functions", value: "50+", color: "text-orange-600" }
  ];

  const sections = [
    {
      title: "Báo Cáo Kỹ Thuật",
      description: "Phân tích chi tiết về kiến trúc, công nghệ và đánh giá hệ thống",
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Kiến Trúc Hệ Thống",
      description: "Sơ đồ và mô tả kiến trúc 3 tầng của hệ thống AgriChain",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Sơ Đồ Database",
      description: "Mô hình cơ sở dữ liệu với các bảng và mối quan hệ",
      icon: <Database className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Phân Tích Functions",
      description: "Tài liệu chi tiết về các function và vị trí gọi trong codebase",
      icon: <Code className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Hướng Dẫn Sử Dụng",
      description: "Hướng dẫn chi tiết cho người dùng, nhà cung cấp và quản trị viên",
      icon: <Users className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white"
      >
        <h1 className="text-4xl font-bold mb-4">AgriChain Technical Documentation</h1>
        <p className="text-xl opacity-90 max-w-3xl mx-auto">
          Tài liệu kỹ thuật toàn diện về hệ thống blockchain nông nghiệp AgriChain - 
          Nền tảng kết nối nông dân và người mua một cách minh bạch và hiệu quả
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span>Blockchain Technology</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span>Smart Contracts</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span>Decentralized</span>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Thống Kê Hệ Thống</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Sections Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Nội Dung Tài Liệu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {section.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{section.description}</p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                <span className="text-sm">Xem chi tiết</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Công Nghệ Sử Dụng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Frontend</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Next.js 15.4.5</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>React 19</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>TypeScript</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Tailwind CSS</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Backend</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Node.js & Express</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Prisma ORM</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>PostgreSQL</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Ethers.js v6</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Blockchain</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Solidity ^0.8.24</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Hardhat</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>OpenZeppelin</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Polygon Cardona</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Server, 
  Database, 
  Link,
  ArrowRight,
  ArrowDown,
  Globe,
  Shield,
  Zap,
  Users,
  ChevronDown,
  ChevronRight,
  Info
} from 'lucide-react';

const SystemArchitecture: React.FC = () => {
  const [activeDiagram, setActiveDiagram] = useState('overview');
  const [expandedLayers, setExpandedLayers] = useState<string[]>(['frontend']);

  const toggleLayer = (layerId: string) => {
    setExpandedLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const diagrams = [
    {
      id: 'overview',
      title: 'Tổng Quan Kiến Trúc',
      description: 'Mô hình 3 tầng của hệ thống AgriChain'
    },
    {
      id: 'data-flow',
      title: 'Luồng Dữ Liệu',
      description: 'Cách dữ liệu di chuyển qua các tầng'
    },
    {
      id: 'deployment',
      title: 'Triển Khai Hệ Thống',
      description: 'Mô hình triển khai và infrastructure'
    }
  ];

  const layers = [
    {
      id: 'frontend',
      name: 'Frontend Layer',
      icon: <Monitor className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      technologies: [
        { name: 'Next.js 15.4.5', description: 'React framework với SSR/SSG' },
        { name: 'React 19', description: 'UI library với hooks và context' },
        { name: 'TypeScript', description: 'Type-safe JavaScript' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
        { name: 'Ethers.js v6', description: 'Blockchain interaction library' },
        { name: 'Framer Motion', description: 'Animation library' }
      ],
      responsibilities: [
        'Giao diện người dùng',
        'Tương tác với MetaMask',
        'Hiển thị dữ liệu sản phẩm',
        'Quản lý trạng thái ứng dụng',
        'Xử lý routing và navigation'
      ]
    },
    {
      id: 'backend',
      name: 'Backend Layer',
      icon: <Server className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      technologies: [
        { name: 'Node.js', description: 'JavaScript runtime' },
        { name: 'Express.js', description: 'Web framework' },
        { name: 'Prisma ORM', description: 'Database ORM' },
        { name: 'PostgreSQL', description: 'Relational database' },
        { name: 'Multer', description: 'File upload middleware' },
        { name: 'CORS', description: 'Cross-origin resource sharing' }
      ],
      responsibilities: [
        'API endpoints và business logic',
        'Xử lý file upload',
        'Quản lý database operations',
        'Authentication và authorization',
        'Integration với blockchain'
      ]
    },
    {
      id: 'blockchain',
      name: 'Blockchain Layer',
      icon: <Database className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      technologies: [
        { name: 'Solidity ^0.8.24', description: 'Smart contract language' },
        { name: 'Hardhat', description: 'Development framework' },
        { name: 'OpenZeppelin', description: 'Secure contract library' },
        { name: 'Polygon Cardona', description: 'Ethereum L2 testnet' },
        { name: 'ERC-20', description: 'Token standard' },
        { name: 'ERC-1155', description: 'Multi-token standard' }
      ],
      responsibilities: [
        'Smart contracts execution',
        'Token management (AGRI)',
        'NFT minting và burning',
        'Escrow payments',
        'Dispute resolution'
      ]
    }
  ];

  const dataFlowSteps = [
    {
      step: 1,
      title: 'User Request',
      description: 'Người dùng thực hiện hành động trên frontend',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      step: 2,
      title: 'API Call',
      description: 'Frontend gọi API endpoint tương ứng',
      icon: <Link className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      step: 3,
      title: 'Business Logic',
      description: 'Backend xử lý logic nghiệp vụ và database',
      icon: <Server className="w-5 h-5" />,
      color: 'bg-yellow-500'
    },
    {
      step: 4,
      title: 'Blockchain Interaction',
      description: 'Gọi smart contract nếu cần thiết',
      icon: <Database className="w-5 h-5" />,
      color: 'bg-purple-500'
    },
    {
      step: 5,
      title: 'Response',
      description: 'Trả về kết quả cho frontend',
      icon: <ArrowRight className="w-5 h-5" />,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Kiến Trúc Hệ Thống AgriChain</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Mô hình kiến trúc 3 tầng hiện đại với blockchain integration
        </p>
      </div>

      {/* Diagram Selector */}
      <div className="flex justify-center space-x-4 mb-8">
        {diagrams.map((diagram) => (
          <button
            key={diagram.id}
            onClick={() => setActiveDiagram(diagram.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeDiagram === diagram.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {diagram.title}
          </button>
        ))}
      </div>

      {/* Overview Diagram */}
      {activeDiagram === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Architecture Layers */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mô Hình 3 Tầng</h2>
            
            <div className="space-y-6">
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connection Arrow */}
                  {index > 0 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <ArrowDown className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  
                  <div className={`bg-gradient-to-r ${layer.color} rounded-xl p-6 text-white shadow-lg`}>
                    <button
                      onClick={() => toggleLayer(layer.id)}
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        {layer.icon}
                        <h3 className="text-xl font-bold">{layer.name}</h3>
                      </div>
                      {expandedLayers.includes(layer.id) ? (
                        <ChevronDown className="w-6 h-6" />
                      ) : (
                        <ChevronRight className="w-6 h-6" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {expandedLayers.includes(layer.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Công Nghệ Sử Dụng</h4>
                              <div className="space-y-2">
                                {layer.technologies.map((tech, techIndex) => (
                                  <div key={techIndex} className="bg-white/20 rounded-lg p-3">
                                    <div className="font-medium">{tech.name}</div>
                                    <div className="text-sm opacity-90">{tech.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-3">Trách Nhiệm</h4>
                              <ul className="space-y-2">
                                {layer.responsibilities.map((resp, respIndex) => (
                                  <li key={respIndex} className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-sm">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* System Components */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Thành Phần Hệ Thống</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-800">Client Side</h3>
                </div>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Web Browser</li>
                  <li>• MetaMask Wallet</li>
                  <li>• React Components</li>
                  <li>• State Management</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Server className="w-8 h-8 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-800">Server Side</h3>
                </div>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>• Express.js Server</li>
                  <li>• Prisma ORM</li>
                  <li>• PostgreSQL Database</li>
                  <li>• File Storage</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-800">Blockchain</h3>
                </div>
                <ul className="text-purple-700 space-y-2 text-sm">
                  <li>• Smart Contracts</li>
                  <li>• Token System</li>
                  <li>• NFT Management</li>
                  <li>• Escrow System</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Data Flow Diagram */}
      {activeDiagram === 'data-flow' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Luồng Dữ Liệu Hệ Thống</h2>
          
          <div className="space-y-6">
            {dataFlowSteps.map((step, index) => (
              <div key={step.step} className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-white font-bold`}>
                  {step.step}
                </div>
                
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    {step.icon}
                    <h3 className="font-semibold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                
                {index < dataFlowSteps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Deployment Diagram */}
      {activeDiagram === 'deployment' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mô Hình Triển Khai</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Development Environment</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800">Frontend</h4>
                    <p className="text-sm text-blue-600">localhost:3000 (Next.js dev server)</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800">Backend</h4>
                    <p className="text-sm text-green-600">localhost:5000 (Express server)</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-800">Database</h4>
                    <p className="text-sm text-purple-600">localhost:5432 (PostgreSQL)</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-orange-800">Blockchain</h4>
                    <p className="text-sm text-orange-600">Hardhat local network</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Production Environment</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800">Frontend</h4>
                    <p className="text-sm text-blue-600">Vercel/Netlify deployment</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800">Backend</h4>
                    <p className="text-sm text-green-600">AWS EC2/DigitalOcean</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-800">Database</h4>
                    <p className="text-sm text-purple-600">AWS RDS/Managed PostgreSQL</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-orange-800">Blockchain</h4>
                    <p className="text-sm text-orange-600">Polygon Cardona Testnet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Architecture Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Lợi Ích Kiến Trúc</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="font-semibold mb-2">Hiệu Suất Cao</h3>
            <p className="text-sm opacity-90">Tối ưu hóa tốc độ xử lý và phản hồi</p>
          </div>
          
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-300" />
            <h3 className="font-semibold mb-2">Bảo Mật Tốt</h3>
            <p className="text-sm opacity-90">Bảo vệ dữ liệu và giao dịch an toàn</p>
          </div>
          
          <div className="text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-blue-300" />
            <h3 className="font-semibold mb-2">Mở Rộng Dễ Dàng</h3>
            <p className="text-sm opacity-90">Hỗ trợ phát triển và mở rộng trong tương lai</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SystemArchitecture;

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  Code, 
  Database, 
  Shield,
  Zap,
  Globe,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';

const TechnicalReport: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections = [
    {
      id: 'overview',
      title: 'Tổng Quan Dự Án',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Mục Tiêu Dự Án</h4>
            <p className="text-blue-700">
              AgriChain là một nền tảng thương mại điện tử dựa trên blockchain, kết nối nông dân và người mua 
              trong một hệ sinh thái minh bạch, bảo mật và hiệu quả.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Tính Năng Chính</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Quản lý sản phẩm nông nghiệp</li>
                <li>• Giao dịch trực tiếp và đấu giá</li>
                <li>• Hệ thống thanh toán blockchain</li>
                <li>• Theo dõi chuỗi cung ứng</li>
                <li>• Chương trình khách hàng thân thiết</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Lợi Ích</h4>
              <ul className="text-purple-700 space-y-1 text-sm">
                <li>• Minh bạch trong giao dịch</li>
                <li>• Giảm chi phí trung gian</li>
                <li>• Tăng cường bảo mật</li>
                <li>• Truy xuất nguồn gốc sản phẩm</li>
                <li>• Tự động hóa quy trình</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Kiến Trúc Hệ Thống',
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-4">Mô Hình 3 Tầng</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold text-green-600 mb-2">Frontend Layer</h5>
                <p className="text-sm text-gray-600">Next.js, React, TypeScript, Tailwind CSS</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold text-blue-600 mb-2">Backend Layer</h5>
                <p className="text-sm text-gray-600">Node.js, Express, Prisma, PostgreSQL</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold text-purple-600 mb-2">Blockchain Layer</h5>
                <p className="text-sm text-gray-600">Solidity, Hardhat, Polygon Cardona</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Đặc Điểm Kiến Trúc</h4>
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>• Microservices architecture với API Gateway</li>
              <li>• Stateless backend services</li>
              <li>• Event-driven communication</li>
              <li>• Horizontal scaling capability</li>
              <li>• Containerized deployment</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'technology',
      title: 'Phân Tích Công Nghệ',
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">Frontend Technologies</h4>
              <div className="space-y-2 text-sm text-green-600">
                <div className="flex justify-between">
                  <span>Next.js 15.4.5</span>
                  <span className="text-green-600 font-medium">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>React 19</span>
                  <span className="text-green-600 font-medium">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>TypeScript</span>
                  <span className="text-green-600 font-medium">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Ethers.js v6</span>
                  <span className="text-green-600 font-medium">✓</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Backend Technologies</h4>
              <div className="space-y-2 text-sm text-blue-600">
                <div className="flex justify-between">
                  <span>Node.js & Express</span>
                  <span className="text-blue-600 font-medium">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Prisma ORM</span>
                  <span className="text-blue-600 font-medium">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>PostgreSQL</span>
                  <span className="text-blue-600 font-medium">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Multer (File Upload)</span>
                  <span className="text-blue-600 font-medium">✓</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-3">Blockchain Technologies</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-purple-700 mb-2">Smart Contracts</h5>
                <ul className="text-sm text-purple-600 space-y-1">
                  <li>• AgriChainMarketplace.sol</li>
                  <li>• AgriChainToken.sol (ERC-20)</li>
                  <li>• AgriChainNFT.sol (ERC-1155)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-purple-700 mb-2">Development Tools</h5>
                <ul className="text-sm text-purple-600 space-y-1">
                  <li>• Hardhat Framework</li>
                  <li>• OpenZeppelin Contracts</li>
                  <li>• Polygon Cardona Testnet</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Bảo Mật Hệ Thống',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Các Biện Pháp Bảo Mật</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-red-700 mb-2">Smart Contract Security</h5>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• ReentrancyGuard protection</li>
                  <li>• Pausable functionality</li>
                  <li>• Access control (Ownable)</li>
                  <li>• Input validation</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-red-700 mb-2">API Security</h5>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• CORS configuration</li>
                  <li>• Input sanitization</li>
                  <li>• Rate limiting</li>
                  <li>• Wallet signature authentication</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Đánh Giá Bảo Mật</h4>
            <div className="flex items-center space-x-4 text-orange-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Smart Contract Audit Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Secure API Design</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium">Penetration Testing Recommended</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'evaluation',
      title: 'Đánh Giá và Khuyến Nghị',
      icon: <CheckCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">Điểm Mạnh</h4>
              <ul className="text-green-700 space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>Kiến trúc hiện đại và có thể mở rộng</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>Sử dụng công nghệ blockchain tiên tiến</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>Giao diện người dùng thân thiện</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>Hệ thống bảo mật toàn diện</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-3">Cần Cải Thiện</h4>
              <ul className="text-yellow-700 space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-yellow-600" />
                  <span>Thêm unit tests và integration tests</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-yellow-600" />
                  <span>Implement monitoring và logging</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-yellow-600" />
                  <span>Thêm caching layer</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-yellow-600" />
                  <span>Optimize database queries</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">Khuyến Nghị Phát Triển</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-blue-700 mb-2">Ngắn Hạn</h5>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Thêm comprehensive testing</li>
                  <li>• Implement error monitoring</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-700 mb-2">Trung Hạn</h5>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Mobile application</li>
                  <li>• Advanced analytics</li>
                  <li>• Multi-language support</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-700 mb-2">Dài Hạn</h5>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• AI/ML integration</li>
                  <li>• IoT device integration</li>
                  <li>• Cross-chain compatibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Báo Cáo Kỹ Thuật AgriChain</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Phân tích chi tiết về kiến trúc, công nghệ và đánh giá toàn diện hệ thống blockchain nông nghiệp
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-blue-600">{section.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              </div>
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white"
      >
        <h3 className="text-xl font-bold mb-4">Tóm Tắt Đánh Giá</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">8.5/10</div>
            <div className="text-sm opacity-90">Điểm Tổng Thể</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">95%</div>
            <div className="text-sm opacity-90">Hoàn Thành</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">A+</div>
            <div className="text-sm opacity-90">Xếp Hạng</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicalReport;

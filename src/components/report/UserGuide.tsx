'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Settings, 
  Download, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Code,
  Database,
  Globe,
  Shield,
  Package,
  ShoppingCart,
  Star,
  FileText,
  Terminal,
  Monitor,
  Smartphone
} from 'lucide-react';

const UserGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState('installation');
  const [expandedSteps, setExpandedSteps] = useState<string[]>(['step1']);

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const sections = [
    {
      id: 'installation',
      title: 'Cài Đặt & Triển Khai',
      icon: <Download className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'user-guide',
      title: 'Hướng Dẫn Người Dùng',
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'supplier-guide',
      title: 'Hướng Dẫn Nhà Cung Cấp',
      icon: <Package className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'admin-guide',
      title: 'Hướng Dẫn Quản Trị',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'api-docs',
      title: 'Tài Liệu API',
      icon: <Code className="w-6 h-6" />,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'troubleshooting',
      title: 'Khắc Phục Sự Cố',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const installationSteps = [
    {
      id: 'step1',
      title: 'Cài Đặt Dependencies',
      description: 'Cài đặt các thư viện cần thiết cho dự án',
      icon: <Terminal className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="text-blue-400"># Clone repository</div>
            <div>git clone https://github.com/your-repo/agrichain.git</div>
            <div>cd agrichain</div>
            <br />
            <div className="text-blue-400"># Install frontend dependencies</div>
            <div>cd frontend</div>
            <div>npm install</div>
            <br />
            <div className="text-blue-400"># Install backend dependencies</div>
            <div>cd ../backend</div>
            <div>npm install</div>
            <br />
            <div className="text-blue-400"># Install blockchain dependencies</div>
            <div>cd ../blockchain</div>
            <div>npm install</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mb-2" />
            <p className="text-yellow-800 text-sm">
              <strong>Lưu ý:</strong> Đảm bảo bạn đã cài đặt Node.js (v18+) và npm trước khi thực hiện các bước trên.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'step2',
      title: 'Cấu Hình Database',
      description: 'Thiết lập cơ sở dữ liệu PostgreSQL',
      icon: <Database className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">1. Cài đặt PostgreSQL</h4>
            <p className="text-blue-700 text-sm mb-2">Tải và cài đặt PostgreSQL từ trang chủ:</p>
            <a href="https://www.postgresql.org/download/" className="text-blue-600 hover:underline">
              https://www.postgresql.org/download/
            </a>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">2. Tạo Database</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
              <div>psql -U postgres</div>
              <div>CREATE DATABASE agrichain;</div>
              <div>CREATE USER agrichain_user WITH PASSWORD &apos;your_password&apos;;</div>
              <div>GRANT ALL PRIVILEGES ON DATABASE agrichain TO agrichain_user;</div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">3. Cấu hình Environment</h4>
            <p className="text-purple-700 text-sm mb-2">Tạo file .env trong thư mục backend:</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
              <div>DATABASE_URL=&quot;postgresql://agrichain_user:your_password@localhost:5432/agrichain&quot;</div>
              <div>JWT_SECRET=&quot;your_jwt_secret&quot;</div>
              <div>BLOCKCHAIN_RPC_URL=&quot;https://rpc-cardona-evm.polygon.technology&quot;</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'step3',
      title: 'Triển Khai Smart Contracts',
      description: 'Deploy các smart contracts lên blockchain',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">1. Cấu hình Hardhat</h4>
            <p className="text-orange-700 text-sm mb-2">Tạo file hardhat.config.ts:</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
              <div>import {`{`} HardhatUserConfig {`}`} from "hardhat/config";</div>
              <div>import "@nomicfoundation/hardhat-toolbox";</div>
              <br />
              <div>const config: HardhatUserConfig = {`{`}</div>
              <div>  solidity: "0.8.24",</div>
              <div>  networks: {`{`}</div>
              <div>    cardona: {`{`}</div>
              <div>      url: process.env.BLOCKCHAIN_RPC_URL,</div>
              <div>      accounts: [process.env.PRIVATE_KEY!]</div>
              <div>    {`}`}</div>
              <div>  {`}`}</div>
              <div>{`}`};</div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">2. Deploy Contracts</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
              <div>cd blockchain</div>
              <div>npx hardhat compile</div>
              <div>npx hardhat run scripts/deploy.ts --network cardona</div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">3. Cập nhật Contract Addresses</h4>
            <p className="text-blue-700 text-sm">Cập nhật các địa chỉ contract trong file .env của backend và frontend.</p>
          </div>
        </div>
      )
    },
    {
      id: 'step4',
      title: 'Chạy Ứng Dụng',
      description: 'Khởi động frontend và backend servers',
      icon: <Play className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Backend Server</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                <div>cd backend</div>
                <div>npm run dev</div>
              </div>
              <p className="text-green-700 text-sm mt-2">Chạy trên http://localhost:5000</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Frontend Server</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                <div>cd frontend</div>
                <div>npm run dev</div>
              </div>
              <p className="text-blue-700 text-sm mt-2">Chạy trên http://localhost:3000</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Kiểm Tra Kết Nối</h4>
            <p className="text-purple-700 text-sm mb-2">Truy cập các URL sau để kiểm tra:</p>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• Frontend: http://localhost:3000</li>
              <li>• Backend API: http://localhost:5000/health</li>
              <li>• API Documentation: http://localhost:5000/api-docs</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const userFeatures = [
    {
      title: 'Đăng Ký & Đăng Nhập',
      icon: <Users className="w-8 h-8 text-blue-600" />,
      steps: [
        'Truy cập trang chủ AgriChain',
        'Nhấn nút "Đăng Ký" hoặc "Đăng Nhập"',
        'Kết nối MetaMask wallet',
        'Hoàn thành thông tin cá nhân',
        'Xác thực email (nếu cần)'
      ]
    },
    {
      title: 'Mua Sản Phẩm',
      icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
      steps: [
        'Duyệt danh sách sản phẩm',
        'Sử dụng bộ lọc để tìm sản phẩm mong muốn',
        'Xem chi tiết sản phẩm',
        'Chọn số lượng và thêm vào giỏ hàng',
        'Thanh toán bằng AGRI token',
        'Xác nhận giao dịch trên MetaMask'
      ]
    },
    {
      title: 'Đánh Giá Sản Phẩm',
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      steps: [
        'Truy cập trang "Đơn Hàng Của Tôi"',
        'Chọn đơn hàng đã hoàn thành',
        'Nhấn "Đánh Giá"',
        'Chọn điểm số (1-5 sao)',
        'Viết bình luận (tùy chọn)',
        'Gửi đánh giá'
      ]
    },
    {
      title: 'Quản Lý Ví',
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      steps: [
        'Truy cập trang "Ví Của Tôi"',
        'Xem số dư AGRI token',
        'Xem lịch sử giao dịch',
        'Tham gia chương trình khách hàng thân thiết',
        'Đổi điểm thưởng thành token'
      ]
    }
  ];

  const supplierFeatures = [
    {
      title: 'Đăng Ký Nhà Cung Cấp',
      icon: <Package className="w-8 h-8 text-green-600" />,
      steps: [
        'Tạo tài khoản người dùng thông thường',
        'Chuyển đổi thành tài khoản nhà cung cấp',
        'Cung cấp thông tin doanh nghiệp',
        'Tải lên giấy phép kinh doanh',
        'Chờ xác minh từ admin',
        'Deploy smart contract riêng'
      ]
    },
    {
      title: 'Thêm Sản Phẩm',
      icon: <Package className="w-8 h-8 text-blue-600" />,
      steps: [
        'Truy cập trang "Quản Lý Sản Phẩm"',
        'Nhấn "Thêm Sản Phẩm Mới"',
        'Điền thông tin chi tiết sản phẩm',
        'Tải lên hình ảnh sản phẩm',
        'Chọn danh mục và tags',
        'Mint NFT cho sản phẩm',
        'Đăng bán trên marketplace'
      ]
    },
    {
      title: 'Quản Lý Đơn Hàng',
      icon: <ShoppingCart className="w-8 h-8 text-purple-600" />,
      steps: [
        'Xem danh sách đơn hàng mới',
        'Xác nhận đơn hàng',
        'Chuẩn bị và đóng gói sản phẩm',
        'Cập nhật trạng thái giao hàng',
        'Xác nhận giao hàng thành công',
        'Nhận thanh toán tự động'
      ]
    }
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/products',
      description: 'Lấy danh sách sản phẩm',
      parameters: [
        { name: 'page', type: 'number', required: false, description: 'Số trang' },
        { name: 'limit', type: 'number', required: false, description: 'Số lượng mỗi trang' },
        { name: 'category', type: 'string', required: false, description: 'Lọc theo danh mục' }
      ]
    },
    {
      method: 'POST',
      path: '/api/products',
      description: 'Tạo sản phẩm mới',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Tên sản phẩm' },
        { name: 'description', type: 'string', required: true, description: 'Mô tả sản phẩm' },
        { name: 'price', type: 'number', required: true, description: 'Giá sản phẩm' },
        { name: 'category', type: 'string', required: true, description: 'Danh mục sản phẩm' }
      ]
    },
    {
      method: 'GET',
      path: '/api/orders',
      description: 'Lấy danh sách đơn hàng',
      parameters: [
        { name: 'userId', type: 'string', required: true, description: 'ID người dùng' },
        { name: 'status', type: 'string', required: false, description: 'Trạng thái đơn hàng' }
      ]
    },
    {
      method: 'POST',
      path: '/api/orders',
      description: 'Tạo đơn hàng mới',
      parameters: [
        { name: 'items', type: 'array', required: true, description: 'Danh sách sản phẩm' },
        { name: 'shippingAddress', type: 'string', required: true, description: 'Địa chỉ giao hàng' }
      ]
    }
  ];

  const troubleshootingIssues = [
    {
      issue: 'Không thể kết nối MetaMask',
      solutions: [
        'Kiểm tra MetaMask đã được cài đặt và mở khóa',
        'Đảm bảo đang sử dụng đúng network (Polygon Cardona)',
        'Refresh trang và thử lại',
        'Kiểm tra popup blocker'
      ]
    },
    {
      issue: 'Giao dịch bị pending',
      solutions: [
        'Kiểm tra gas fee và tăng nếu cần',
        'Đợi network xử lý giao dịch',
        'Kiểm tra trạng thái trên Polygon Explorer',
        'Thử lại với gas price cao hơn'
      ]
    },
    {
      issue: 'Không thể tải hình ảnh sản phẩm',
      solutions: [
        'Kiểm tra kích thước file (tối đa 5MB)',
        'Đảm bảo file là định dạng JPG/PNG',
        'Kiểm tra kết nối internet',
        'Thử tải lại trang'
      ]
    },
    {
      issue: 'Lỗi 500 Internal Server Error',
      solutions: [
        'Kiểm tra database connection',
        'Xem logs của backend server',
        'Kiểm tra environment variables',
        'Restart backend server'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Hướng Dẫn Sử Dụng Chi Tiết</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Tài liệu hướng dẫn toàn diện cho người dùng, nhà cung cấp và quản trị viên
        </p>
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-4 rounded-lg transition-all ${
                activeSection === section.id
                  ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                {section.icon}
                <span className="text-sm font-medium text-center">{section.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Installation Section */}
      {activeSection === 'installation' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Cài Đặt & Triển Khai Hệ Thống</h2>
            <p className="opacity-90">
              Hướng dẫn chi tiết để cài đặt và triển khai AgriChain trên môi trường development và production
            </p>
          </div>

          <div className="space-y-4">
            {installationSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  {expandedSteps.includes(step.id) ? (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {expandedSteps.includes(step.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      {step.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* User Guide Section */}
      {activeSection === 'user-guide' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Hướng Dẫn Người Dùng</h2>
            <p className="opacity-90">
              Hướng dẫn chi tiết cho người dùng cuối sử dụng nền tảng AgriChain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <ol className="space-y-2">
                  {feature.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {stepIndex + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Supplier Guide Section */}
      {activeSection === 'supplier-guide' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Hướng Dẫn Nhà Cung Cấp</h2>
            <p className="opacity-90">
              Hướng dẫn chi tiết cho nhà cung cấp sử dụng nền tảng AgriChain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supplierFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <ol className="space-y-2">
                  {feature.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {stepIndex + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* API Documentation Section */}
      {activeSection === 'api-docs' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Tài Liệu API</h2>
            <p className="opacity-90">
              Tài liệu chi tiết về các API endpoints và cách sử dụng
            </p>
          </div>

          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                    endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-lg font-mono text-gray-800">{endpoint.path}</code>
                </div>
                
                <p className="text-gray-600 mb-4">{endpoint.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Parameters:</h4>
                  <div className="space-y-2">
                    {endpoint.parameters.map((param, paramIndex) => (
                      <div key={paramIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-800">{param.name}</span>
                          <span className="text-sm text-gray-600 ml-2">({param.type})</span>
                          {param.required && <span className="text-red-600 text-sm ml-2">*</span>}
                        </div>
                        <span className="text-sm text-gray-600">{param.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Troubleshooting Section */}
      {activeSection === 'troubleshooting' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Khắc Phục Sự Cố</h2>
            <p className="opacity-90">
              Hướng dẫn khắc phục các vấn đề thường gặp trong quá trình sử dụng
            </p>
          </div>

          <div className="space-y-4">
            {troubleshootingIssues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <span>{issue.issue}</span>
                </h3>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Giải pháp:</h4>
                  <ul className="space-y-2">
                    {issue.solutions.map((solution, solIndex) => (
                      <li key={solIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Contact & Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Hỗ Trợ & Liên Hệ</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-blue-300" />
            <h3 className="font-semibold mb-2">Tài Liệu</h3>
            <p className="text-sm opacity-90">Xem thêm tài liệu chi tiết</p>
          </div>
          
          <div className="text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-green-300" />
            <h3 className="font-semibold mb-2">Website</h3>
            <p className="text-sm opacity-90">Truy cập trang chủ dự án</p>
          </div>
          
          <div className="text-center">
            <Info className="w-12 h-12 mx-auto mb-4 text-purple-300" />
            <h3 className="font-semibold mb-2">Hỗ Trợ</h3>
            <p className="text-sm opacity-90">Liên hệ để được hỗ trợ</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserGuide;

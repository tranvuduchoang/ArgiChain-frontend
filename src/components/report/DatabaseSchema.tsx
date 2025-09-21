'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Table, 
  Key, 
  Link, 
  Eye, 
  EyeOff,
  Search,
  Filter,
  Info,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Users,
  Package,
  ShoppingCart,
  Star,
  Shield,
  Clock,
  FileText
} from 'lucide-react';

const DatabaseSchema: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showRelationships, setShowRelationships] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTables, setExpandedTables] = useState<string[]>(['User', 'Product']);

  const toggleTable = (tableName: string) => {
    setExpandedTables(prev => 
      prev.includes(tableName) 
        ? prev.filter(name => name !== tableName)
        : [...prev, tableName]
    );
  };

  const tables = [
    {
      name: 'User',
      icon: <Users className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Thông tin người dùng và xác thực',
      columns: [
        { name: 'id', type: 'String', key: 'PK', description: 'Primary key' },
        { name: 'email', type: 'String', key: 'UNIQUE', description: 'Email đăng nhập' },
        { name: 'username', type: 'String', key: 'UNIQUE', description: 'Tên người dùng' },
        { name: 'walletAddress', type: 'String', key: 'UNIQUE', description: 'Địa chỉ ví blockchain' },
        { name: 'role', type: 'UserRole', key: '', description: 'Vai trò người dùng' },
        { name: 'kycStatus', type: 'KycStatus', key: '', description: 'Trạng thái KYC' },
        { name: 'createdAt', type: 'DateTime', key: '', description: 'Thời gian tạo' },
        { name: 'updatedAt', type: 'DateTime', key: '', description: 'Thời gian cập nhật' }
      ],
      relationships: [
        { type: 'One-to-One', target: 'Supplier', description: 'Hồ sơ nhà cung cấp' },
        { type: 'One-to-Many', target: 'Order', description: 'Đơn hàng của người dùng' },
        { type: 'One-to-Many', target: 'Review', description: 'Đánh giá của người dùng' },
        { type: 'One-to-Many', target: 'NFT', description: 'NFT sở hữu' }
      ]
    },
    {
      name: 'Product',
      icon: <Package className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Thông tin sản phẩm nông nghiệp',
      columns: [
        { name: 'id', type: 'String', key: 'PK', description: 'Primary key' },
        { name: 'supplierId', type: 'String', key: 'FK', description: 'ID nhà cung cấp' },
        { name: 'name', type: 'String', key: '', description: 'Tên sản phẩm' },
        { name: 'description', type: 'String', key: '', description: 'Mô tả sản phẩm' },
        { name: 'category', type: 'String', key: '', description: 'Danh mục sản phẩm' },
        { name: 'pricePerUnit', type: 'Decimal', key: '', description: 'Giá mỗi đơn vị' },
        { name: 'totalSupply', type: 'Int', key: '', description: 'Tổng số lượng' },
        { name: 'availableSupply', type: 'Int', key: '', description: 'Số lượng có sẵn' },
        { name: 'unit', type: 'String', key: '', description: 'Đơn vị tính' },
        { name: 'isActive', type: 'Boolean', key: '', description: 'Trạng thái hoạt động' }
      ],
      relationships: [
        { type: 'Many-to-One', target: 'Supplier', description: 'Thuộc về nhà cung cấp' },
        { type: 'One-to-Many', target: 'OrderItem', description: 'Các mục đơn hàng' },
        { type: 'One-to-Many', target: 'Review', description: 'Đánh giá sản phẩm' },
        { type: 'One-to-Many', target: 'InventoryLot', description: 'Lô hàng tồn kho' }
      ]
    },
    {
      name: 'Order',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Thông tin đơn hàng và giao dịch',
      columns: [
        { name: 'id', type: 'String', key: 'PK', description: 'Primary key' },
        { name: 'buyerId', type: 'String', key: 'FK', description: 'ID người mua' },
        { name: 'supplierId', type: 'String', key: 'FK', description: 'ID nhà cung cấp' },
        { name: 'status', type: 'OrderStatus', key: '', description: 'Trạng thái đơn hàng' },
        { name: 'totalAmount', type: 'Decimal', key: '', description: 'Tổng số tiền' },
        { name: 'paymentMethod', type: 'String', key: '', description: 'Phương thức thanh toán' },
        { name: 'shippingAddress', type: 'String', key: '', description: 'Địa chỉ giao hàng' },
        { name: 'createdAt', type: 'DateTime', key: '', description: 'Thời gian tạo' },
        { name: 'updatedAt', type: 'DateTime', key: '', description: 'Thời gian cập nhật' }
      ],
      relationships: [
        { type: 'Many-to-One', target: 'User', description: 'Người mua' },
        { type: 'Many-to-One', target: 'Supplier', description: 'Nhà cung cấp' },
        { type: 'One-to-Many', target: 'OrderItem', description: 'Các mục đơn hàng' },
        { type: 'One-to-Many', target: 'DeliveryConfirmation', description: 'Xác nhận giao hàng' }
      ]
    },
    {
      name: 'NFT',
      icon: <Shield className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
      description: 'Non-fungible tokens cho sản phẩm',
      columns: [
        { name: 'id', type: 'String', key: 'PK', description: 'Primary key' },
        { name: 'tokenId', type: 'String', key: 'UNIQUE', description: 'ID token trên blockchain' },
        { name: 'ownerId', type: 'String', key: 'FK', description: 'ID chủ sở hữu' },
        { name: 'productId', type: 'String', key: 'FK', description: 'ID sản phẩm' },
        { name: 'metadata', type: 'String', key: '', description: 'Metadata JSON' },
        { name: 'contractAddress', type: 'String', key: '', description: 'Địa chỉ smart contract' },
        { name: 'createdAt', type: 'DateTime', key: '', description: 'Thời gian tạo' }
      ],
      relationships: [
        { type: 'Many-to-One', target: 'User', description: 'Chủ sở hữu NFT' },
        { type: 'Many-to-One', target: 'Product', description: 'Sản phẩm được token hóa' }
      ]
    },
    {
      name: 'Supplier',
      icon: <Users className="w-5 h-5" />,
      color: 'from-indigo-500 to-blue-500',
      description: 'Thông tin nhà cung cấp',
      columns: [
        { name: 'id', type: 'String', key: 'PK', description: 'Primary key' },
        { name: 'userId', type: 'String', key: 'FK', description: 'ID người dùng' },
        { name: 'businessName', type: 'String', key: '', description: 'Tên doanh nghiệp' },
        { name: 'businessType', type: 'String', key: '', description: 'Loại hình doanh nghiệp' },
        { name: 'verificationStatus', type: 'String', key: '', description: 'Trạng thái xác minh' },
        { name: 'rating', type: 'Decimal', key: '', description: 'Đánh giá trung bình' },
        { name: 'totalSales', type: 'Int', key: '', description: 'Tổng doanh số' },
        { name: 'isActive', type: 'Boolean', key: '', description: 'Trạng thái hoạt động' }
      ],
      relationships: [
        { type: 'One-to-One', target: 'User', description: 'Thông tin người dùng' },
        { type: 'One-to-Many', target: 'Product', description: 'Sản phẩm cung cấp' },
        { type: 'One-to-Many', target: 'Order', description: 'Đơn hàng nhận được' }
      ]
    },
    {
      name: 'Review',
      icon: <Star className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500',
      description: 'Đánh giá và phản hồi',
      columns: [
        { name: 'id', type: 'String', key: 'PK', description: 'Primary key' },
        { name: 'userId', type: 'String', key: 'FK', description: 'ID người đánh giá' },
        { name: 'productId', type: 'String', key: 'FK', description: 'ID sản phẩm' },
        { name: 'rating', type: 'Int', key: '', description: 'Điểm đánh giá (1-5)' },
        { name: 'comment', type: 'String', key: '', description: 'Bình luận' },
        { name: 'createdAt', type: 'DateTime', key: '', description: 'Thời gian tạo' }
      ],
      relationships: [
        { type: 'Many-to-One', target: 'User', description: 'Người đánh giá' },
        { type: 'Many-to-One', target: 'Product', description: 'Sản phẩm được đánh giá' }
      ]
    }
  ];

  const filteredTables = tables.filter(table => 
    table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getKeyIcon = (key: string) => {
    switch (key) {
      case 'PK': return <Key className="w-4 h-4 text-red-500" />;
      case 'FK': return <Link className="w-4 h-4 text-blue-500" />;
      case 'UNIQUE': return <Shield className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const getKeyColor = (key: string) => {
    switch (key) {
      case 'PK': return 'bg-red-100 text-red-800';
      case 'FK': return 'bg-blue-100 text-blue-800';
      case 'UNIQUE': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Sơ Đồ Database Chi Tiết</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Mô hình cơ sở dữ liệu PostgreSQL với các bảng, cột và mối quan hệ
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm bảng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-black"
              />
            </div>
            
            <button
              onClick={() => setShowRelationships(!showRelationships)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                showRelationships 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showRelationships ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>Mối quan hệ</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            {filteredTables.length} bảng được tìm thấy
          </div>
        </div>
      </div>

      {/* Database Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Tổng Quan Database</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <Database className="w-12 h-12 mx-auto mb-4 text-blue-300" />
            <div className="text-3xl font-bold">PostgreSQL</div>
            <div className="text-sm opacity-90">Database Engine</div>
          </div>
          
          <div className="text-center">
            <Table className="w-12 h-12 mx-auto mb-4 text-green-300" />
            <div className="text-3xl font-bold">15</div>
            <div className="text-sm opacity-90">Tables</div>
          </div>
          
          <div className="text-center">
            <Link className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <div className="text-3xl font-bold">25+</div>
            <div className="text-sm opacity-90">Relationships</div>
          </div>
          
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-red-300" />
            <div className="text-3xl font-bold">ACID</div>
            <div className="text-sm opacity-90">Compliance</div>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTables.map((table, index) => (
          <motion.div
            key={table.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl shadow-lg overflow-hidden ${
              selectedTable === table.name ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {/* Table Header */}
            <div className={`bg-gradient-to-r ${table.color} p-6 text-white`}>
              <button
                onClick={() => toggleTable(table.name)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  {table.icon}
                  <div>
                    <h3 className="text-xl font-bold">{table.name}</h3>
                    <p className="text-sm opacity-90">{table.description}</p>
                  </div>
                </div>
                {expandedTables.includes(table.name) ? (
                  <ChevronDown className="w-6 h-6" />
                ) : (
                  <ChevronRight className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Table Content */}
            <AnimatePresence>
              {expandedTables.includes(table.name) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  {/* Columns */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <Table className="w-5 h-5" />
                      <span>Columns ({table.columns.length})</span>
                    </h4>
                    <div className="space-y-2">
                      {table.columns.map((column, colIndex) => (
                        <div key={colIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getKeyIcon(column.key)}
                            <div>
                              <div className="font-medium text-gray-800">{column.name}</div>
                              <div className="text-sm text-gray-600">{column.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getKeyColor(column.key)}`}>
                              {column.type}
                            </span>
                            {column.key && (
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getKeyColor(column.key)}`}>
                                {column.key}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relationships */}
                  {showRelationships && table.relationships.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                        <Link className="w-5 h-5" />
                        <span>Relationships ({table.relationships.length})</span>
                      </h4>
                      <div className="space-y-2">
                        {table.relationships.map((rel, relIndex) => (
                          <div key={relIndex} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <ArrowRight className="w-4 h-4 text-blue-600" />
                              <div>
                                <div className="font-medium text-blue-800">{rel.target}</div>
                                <div className="text-sm text-blue-600">{rel.description}</div>
                              </div>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                              {rel.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Database Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tính Năng Database</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold text-gray-800 mb-2">ACID Compliance</h3>
            <p className="text-sm text-gray-600">Đảm bảo tính toàn vẹn dữ liệu</p>
          </div>
          
          <div className="text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold text-gray-800 mb-2">Real-time Updates</h3>
            <p className="text-sm text-gray-600">Cập nhật dữ liệu theo thời gian thực</p>
          </div>
          
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold text-gray-800 mb-2">Prisma ORM</h3>
            <p className="text-sm text-gray-600">Type-safe database operations</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DatabaseSchema;

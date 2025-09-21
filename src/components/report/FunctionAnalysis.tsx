'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Search, 
  Filter, 
  ExternalLink, 
  FileText, 
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Info,
  Zap,
  Database,
  Globe,
  Shield,
  Users,
  Package,
  ShoppingCart,
  Star,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import { functionsData, functionStats, FunctionData } from '@/data/functionsData';

const FunctionAnalysis: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [selectedImportance, setSelectedImportance] = useState('all');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [expandedFunctions, setExpandedFunctions] = useState<string[]>(['createProduct']);
  const [showCallLocations, setShowCallLocations] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const categories = [
    { id: 'all', name: 'Tất Cả', icon: <Code className="w-4 h-4" /> },
    { id: 'product', name: 'Sản Phẩm', icon: <Package className="w-4 h-4" /> },
    { id: 'order', name: 'Đơn Hàng', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'user', name: 'Người Dùng', icon: <Users className="w-4 h-4" /> },
    { id: 'blockchain', name: 'Blockchain', icon: <Shield className="w-4 h-4" /> },
    { id: 'database', name: 'Database', icon: <Database className="w-4 h-4" /> },
    { id: 'frontend', name: 'Frontend', icon: <Globe className="w-4 h-4" /> }
  ];

  const complexityOptions = [
    { id: 'all', name: 'Tất Cả', color: 'bg-gray-100 text-gray-800' },
    { id: 'Low', name: 'Thấp', color: 'bg-green-100 text-green-800' },
    { id: 'Medium', name: 'Trung Bình', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'High', name: 'Cao', color: 'bg-red-100 text-red-800' }
  ];

  const importanceOptions = [
    { id: 'all', name: 'Tất Cả', color: 'bg-gray-100 text-gray-800' },
    { id: 'High', name: 'Cao', color: 'bg-red-100 text-red-800' },
    { id: 'Medium', name: 'Trung Bình', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'Low', name: 'Thấp', color: 'bg-green-100 text-green-800' }
  ];

  const fileTypeOptions = [
    { id: 'all', name: 'Tất Cả' },
    { id: 'backend', name: 'Backend' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'blockchain', name: 'Blockchain' }
  ];

  const sortOptions = [
    { id: 'name', name: 'Tên Function' },
    { id: 'category', name: 'Danh Mục' },
    { id: 'complexity', name: 'Độ Phức Tạp' },
    { id: 'importance', name: 'Mức Độ Quan Trọng' },
    { id: 'filePath', name: 'Đường Dẫn File' }
  ];

  const functions = functionsData;

  const filteredFunctions = functions.filter(func => {
    const matchesSearch = func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         func.filePath.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || func.category === selectedCategory;
    const matchesComplexity = selectedComplexity === 'all' || func.complexity === selectedComplexity;
    const matchesImportance = selectedImportance === 'all' || func.importance === selectedImportance;
    
    let matchesFileType = true;
    if (selectedFileType !== 'all') {
      if (selectedFileType === 'backend') {
        matchesFileType = func.filePath.includes('backend/');
      } else if (selectedFileType === 'frontend') {
        matchesFileType = func.filePath.includes('frontend/');
      } else if (selectedFileType === 'blockchain') {
        matchesFileType = func.filePath.includes('blockchain/');
      }
    }
    
    return matchesSearch && matchesCategory && matchesComplexity && matchesImportance && matchesFileType;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'complexity':
        const complexityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
        comparison = complexityOrder[a.complexity] - complexityOrder[b.complexity];
        break;
      case 'importance':
        const importanceOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
        comparison = importanceOrder[a.importance] - importanceOrder[b.importance];
        break;
      case 'filePath':
        comparison = a.filePath.localeCompare(b.filePath);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleFunction = (functionId: string) => {
    setExpandedFunctions(prev => 
      prev.includes(functionId) 
        ? prev.filter(id => id !== functionId)
        : [...prev, functionId]
    );
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'product': return <Package className="w-4 h-4" color='red'/>;
      case 'order': return <ShoppingCart className="w-4 h-4" color='red'/>;
      case 'user': return <Users className="w-4 h-4" color='red'/>;
      case 'blockchain': return <Shield className="w-4 h-4" color='red'/>;
      case 'database': return <Database className="w-4 h-4" color='red'/>;
      default: return <Code className="w-4 h-4" color='red'/>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Phân Tích Functions Chi Tiết</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Tài liệu chi tiết về các function trong codebase, bao gồm định nghĩa và vị trí gọi
        </p>
      </div>

      {/* Enhanced Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-6">
          {/* Search and Basic Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm function, mô tả, hoặc đường dẫn file..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-black w-full"
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title={sortOrder === 'asc' ? 'Sắp xếp tăng dần' : 'Sắp xếp giảm dần'}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>

            {/* Toggle Call Locations */}
            <button
              onClick={() => setShowCallLocations(!showCallLocations)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                showCallLocations 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {showCallLocations ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {showCallLocations ? 'Ẩn' : 'Hiện'} Call Locations
              </span>
            </button>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Danh Mục
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Complexity Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Độ Phức Tạp
              </label>
              <select
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              >
                {complexityOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Importance Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Mức Quan Trọng
              </label>
              <select
                value={selectedImportance}
                onChange={(e) => setSelectedImportance(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              >
                {importanceOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* File Type Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Loại File
              </label>
              <select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-sm"
              >
                {fileTypeOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Hiển thị <span className="font-semibold text-blue-600">{filteredFunctions.length}</span> trong tổng số <span className="font-semibold">{functions.length}</span> functions
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedComplexity('all');
                setSelectedImportance('all');
                setSelectedFileType('all');
                setSortBy('name');
                setSortOrder('asc');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Function Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => {
            setSelectedCategory('all');
            setSelectedComplexity('all');
            setSelectedImportance('all');
            setSelectedFileType('all');
            setSearchQuery('');
          }}
        >
          <Code className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <div className="text-3xl font-bold text-gray-800">{functionStats.total}</div>
          <div className="text-sm text-gray-600">Total Functions</div>
          <div className="text-xs text-gray-500 mt-1">
            {functionStats.byCategory.product} Product + {functionStats.byCategory.blockchain} Blockchain + {functionStats.byCategory.frontend} Frontend
          </div>
          <div className="text-xs text-blue-600 mt-2 font-medium">Click để xem tất cả</div>
        </div>
        
        <div 
          className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => {
            setSelectedCategory('all');
            setSelectedComplexity('High');
            setSelectedImportance('all');
            setSelectedFileType('all');
            setSearchQuery('');
          }}
        >
          <Zap className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <div className="text-3xl font-bold text-gray-800">{functionStats.byComplexity.High}</div>
          <div className="text-sm text-gray-600">High Complexity</div>
          <div className="text-xs text-green-600 mt-2 font-medium">Click để lọc độ phức tạp cao</div>
        </div>
        
        <div 
          className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => {
            setSelectedCategory('blockchain');
            setSelectedComplexity('all');
            setSelectedImportance('all');
            setSelectedFileType('blockchain');
            setSearchQuery('');
          }}
        >
          <Shield className="w-12 h-12 mx-auto mb-4 text-purple-600" />
          <div className="text-3xl font-bold text-gray-800">{functionStats.byCategory.blockchain}</div>
          <div className="text-sm text-gray-600">Blockchain Functions</div>
          <div className="text-xs text-purple-600 mt-2 font-medium">Click để lọc blockchain</div>
        </div>
        
        <div 
          className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => {
            setSelectedCategory('product');
            setSelectedComplexity('all');
            setSelectedImportance('all');
            setSelectedFileType('backend');
            setSearchQuery('');
          }}
        >
          <Database className="w-12 h-12 mx-auto mb-4 text-orange-600" />
          <div className="text-3xl font-bold text-gray-800">{functionStats.byCategory.product}</div>
          <div className="text-sm text-gray-600">Product Functions</div>
          <div className="text-xs text-orange-600 mt-2 font-medium">Click để lọc sản phẩm</div>
        </div>
      </div>

      {/* Functions List */}
      <div className="space-y-4">
        {filteredFunctions.map((func, index) => (
          <motion.div
            key={func.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Function Header */}
            <div className="p-6 border-b border-gray-200">
              <button
                onClick={() => toggleFunction(func.id)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(func.category)}
                    <span className="text-sm font-medium text-gray-600">{func.category}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{func.name}</h3>
                    <p className="text-gray-600">{func.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm text-gray-500">
                        {func.filePath}:{func.lineNumber}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(func.complexity)}`}>
                      {func.complexity}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImportanceColor(func.importance)}`}>
                      {func.importance}
                    </span>
                  </div>
                  
                  {expandedFunctions.includes(func.id) ? (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-gray-500" />
                  )}
                </div>
              </button>
            </div>

            {/* Function Details */}
            <AnimatePresence>
              {expandedFunctions.includes(func.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 space-y-6"
                >
                  {/* Parameters */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Parameters ({func.parameters.length})</span>
                    </h4>
                    <div className="space-y-2">
                      {func.parameters.map((param, paramIndex) => (
                        <div key={paramIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-800">{param.name}</div>
                            <div className="text-sm text-gray-600">{param.description}</div>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {param.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Return Type */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <ArrowRight className="w-5 h-5" />
                      <span>Return Type</span>
                    </h4>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">{func.returnType}</span>
                    </div>
                  </div>

                  {/* Call Locations */}
                  {showCallLocations && func.callLocations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                        <ExternalLink className="w-5 h-5" />
                        <span>Call Locations ({func.callLocations.length})</span>
                      </h4>
                      <div className="space-y-2">
                        {func.callLocations.map((location, locIndex) => (
                          <div key={locIndex} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <div>
                                <div className="font-medium text-blue-800">
                                  {location.file}:{location.line}
                                </div>
                                <div className="text-sm text-blue-600">{location.description}</div>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-blue-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Function Code Preview */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <Code className="w-5 h-5" />
                      <span>Function Signature</span>
                    </h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <div className="text-blue-400">function</div> {func.name}(
                      {func.parameters.map((param, index) => (
                        <span key={index}>
                          <span className="text-yellow-400">{param.type}</span> {param.name}
                          {index < func.parameters.length - 1 && ', '}
                        </span>
                      ))}
                      ) <span className="text-blue-400">external</span> <span className="text-purple-400">returns</span> (
                      <span className="text-yellow-400">{func.returnType}</span>)
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Tóm Tắt Phân Tích</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Code className="w-12 h-12 mx-auto mb-4 text-blue-300" />
            <div className="text-2xl font-bold">{functionStats.total}</div>
            <div className="text-sm opacity-90">Functions Analyzed</div>
            <div className="text-xs opacity-75 mt-1">Toàn bộ hệ thống</div>
          </div>
          
          <div className="text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm opacity-90">Well Documented</div>
            <div className="text-xs opacity-75 mt-1">TypeScript + JSDoc</div>
          </div>
          
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-300" />
            <div className="text-2xl font-bold">A+</div>
            <div className="text-sm opacity-90">Code Quality</div>
            <div className="text-xs opacity-75 mt-1">Professional Grade</div>
          </div>
        </div>
        
        <div className="mt-6 bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-center">Phân Bố Functions Theo Layer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg">{functionStats.byCategory.product}</div>
              <div className="opacity-90">Product Functions</div>
              <div className="opacity-75 text-xs">Backend Services</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">{functionStats.byCategory.blockchain}</div>
              <div className="opacity-90">Blockchain Functions</div>
              <div className="opacity-75 text-xs">Smart Contracts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">{functionStats.byCategory.frontend}</div>
              <div className="opacity-90">Frontend Functions</div>
              <div className="opacity-75 text-xs">React Components</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FunctionAnalysis;
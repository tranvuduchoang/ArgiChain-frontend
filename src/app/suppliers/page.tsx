'use client';

import React, { useEffect, useState } from 'react';
import { fetchSupplierDetail } from '@/utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Star, 
  Package,
  Eye,
  ExternalLink
} from 'lucide-react';

interface SupplierCardProps {
  supplier: {
    id: string;
    businessName: string;
    description?: string;
    location?: string;
    contactEmail?: string;
    contactPhone?: string;
    rating?: number;
    totalProducts?: number;
    user?: {
      walletAddress?: string;
    };
  };
  onViewDetail: (supplierId: string) => void;
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier, onViewDetail }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 ring-1 ring-gray-100 hover:ring-green-300 transform transition-transform ui-hover-lift"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{supplier.businessName}</h3>
            <p className="text-sm text-gray-500">ID: {supplier.id}</p>
          </div>
        </div>
        {supplier.rating && (
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-700">{supplier.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {supplier.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{supplier.description}</p>
      )}

      <div className="space-y-2 mb-4">
        {supplier.location && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{supplier.location}</span>
          </div>
        )}
        {supplier.contactEmail && (
          <div className="text-sm text-gray-500">
            📧 {supplier.contactEmail}
          </div>
        )}
        {supplier.contactPhone && (
          <div className="text-sm text-gray-500">
            📞 {supplier.contactPhone}
          </div>
        )}
        {supplier.user?.walletAddress && (
          <div className="text-xs text-gray-400 font-mono">
            🔗 {supplier.user.walletAddress.slice(0, 10)}...{supplier.user.walletAddress.slice(-6)}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Package className="w-4 h-4" />
            <span>{supplier.totalProducts || 0} sản phẩm</span>
          </div>
        </div>
        
        <button
          onClick={() => onViewDetail(supplier.id)}
          className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ui-focus-ring cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>Xem chi tiết</span>
        </button>
      </div>
    </motion.div>
  );
};

const SuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch real suppliers from API
      const response = await fetch('http://localhost:5000/api/suppliers');
      if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
      }
      const suppliers = await response.json();
      setSuppliers(suppliers);
    } catch (err: any) {
      setError(err.message || 'Không thể tải danh sách nhà cung cấp');
    } finally {
      setLoading(false);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.businessName.toLowerCase().includes(search.toLowerCase()) ||
    supplier.location?.toLowerCase().includes(search.toLowerCase()) ||
    supplier.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewDetail = (supplierId: string) => {
    window.location.href = `/supplier/${supplierId}`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-80">
          <motion.div
            className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6 text-center font-semibold shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold ui-gradient-text mb-2">Nhà cung cấp</h1>
        <p className="text-gray-600">Khám phá các nhà cung cấp nông sản uy tín và chất lượng</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-md">
          <input
            type="search"
            placeholder="Tìm kiếm nhà cung cấp..."
            className="ui-focus-ring w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500 cursor-pointer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng nhà cung cấp</p>
              <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-900">
                {suppliers.reduce((sum, s) => sum + (s.totalProducts || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Đánh giá trung bình</p>
              <p className="text-2xl font-bold text-gray-900">
                {(suppliers.reduce((sum, s) => sum + (s.rating || 0), 0) / suppliers.length || 0).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Suppliers Grid */}
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {filteredSuppliers.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10 border border-dashed rounded-lg">
              Không tìm thấy nhà cung cấp phù hợp.
            </div>
          ) : (
            filteredSuppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id}
                supplier={supplier}
                onViewDetail={handleViewDetail}
              />
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SuppliersPage;

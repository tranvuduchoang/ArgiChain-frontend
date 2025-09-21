'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { fetchSupplierDetail, fetchProducts, fetchMarketplaceListings } from '@/utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star,
  Eye,
  ShoppingCart,
  Award,
  Plus
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  activeListings: number;
  totalSales: number;
  totalRevenue: string;
  averageRating: number;
  totalReviews: number;
  mintedProducts: number;
  availableInventory: number;
}

const SupplierDashboard: React.FC = () => {
  const router = useRouter();
  const { account, isConnected } = useWallet();
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeListings: 0,
    totalSales: 0,
    totalRevenue: '0',
    averageRating: 0,
    totalReviews: 0,
    mintedProducts: 0,
    availableInventory: 0,
  });
  const [products, setProducts] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isConnected || !account) {
      setError('Vui lòng kết nối ví để xem dashboard');
      setLoading(false);
      return;
    }

    loadDashboardData();
  }, [isConnected, account]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      if (!account) {
        setError('Vui lòng kết nối ví để xem dashboard');
        setLoading(false);
        return;
      }

      // Lấy supplier theo wallet address
      const suppliersResponse = await fetch(`http://localhost:5000/api/suppliers?walletAddress=${account}`);
      if (!suppliersResponse.ok) {
        throw new Error('Không thể lấy thông tin supplier');
      }
      
      const suppliers = await suppliersResponse.json();
      if (!suppliers || suppliers.length === 0) {
        setError('Bạn chưa đăng ký làm nhà cung cấp');
        setLoading(false);
        return;
      }

      const supplier = suppliers[0];
      const supplierId = supplier.id;

      const [supplierData, productsData, listingsData] = await Promise.all([
        fetchSupplierDetail(supplierId),
        fetchProducts(),
        fetchMarketplaceListings()
      ]);

      const supplierProducts = productsData.filter((p: any) => p.supplier?.id === supplierId);
      const activeListings = listingsData.filter((l: any) => l.supplierId === supplierId);
      const mintedProducts = supplierProducts.filter((p: any) => p.mintTxHash).length;
      
      const totalRevenue = supplierProducts.reduce((sum: number, p: any) => {
        return sum + (parseFloat(p.pricePerUnit || '0') * (p.totalSupply - p.availableSupply));
      }, 0);

      const availableInventory = supplierProducts.reduce((sum: number, p: any) => {
        return sum + (p.availableSupply || 0);
      }, 0);

      setStats({
        totalProducts: supplierProducts.length,
        activeListings: activeListings.length,
        totalSales: supplierProducts.reduce((sum: number, p: any) => sum + (p.totalSupply - p.availableSupply), 0),
        totalRevenue: totalRevenue.toFixed(2),
        averageRating: (supplierData as any)?.rating || 0,
        totalReviews: 0, // TODO: Implement reviews count
        mintedProducts,
        availableInventory,
      });

      setProducts(supplierProducts.slice(0, 5)); // Show latest 5 products
      setRecentOrders([]); // TODO: Implement recent orders

    } catch (err: any) {
      setError(err.message || 'Không thể tải dữ liệu dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Supplier Dashboard</h1>
          <p className="text-gray-600">Vui lòng kết nối ví để xem dashboard của bạn</p>
        </div>
      </div>
    );
  }

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

  const statCards = [
    {
      title: t("suppliers.totalProducts"),
      value: stats.totalProducts,
      icon: <Package className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: t("marketplace.mintedNFT"),
      value: stats.mintedProducts,
      icon: <Award className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
    {
      title: t("dashboard.totalSales"),
      value: stats.totalSales,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      title: t("dashboard.revenue"),
      value: stats.totalRevenue,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-yellow-500',
    },
    {
      title: t("dashboard.inventory"),
      value: stats.availableInventory,
      icon: <Package className="w-6 h-6" />,
      color: 'bg-orange-500',
    },
    {
      title: t("dashboard.averageRating"),
      value: stats.averageRating.toFixed(1),
      icon: <Star className="w-6 h-6" />,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("dashboard.title")}</h1>
            <p className="text-gray-600">{t("dashboard.subtitle")}</p>
            <div className="text-sm text-gray-500 mt-2">
              {t("dashboard.walletAddress")}: {account}
            </div>
          </div>
          <button
            onClick={() => router.push('/supplier/create-product')}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={20} />
            <span>{t("dashboard.createProduct")}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{t("dashboard.recentProducts")}</h2>
            <button className="text-green-600 hover:text-green-700 font-medium">
              {t("dashboard.viewAll")}
            </button>
          </div>
          
          <div className="space-y-4">
            {products.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>{t("dashboard.noProducts")}</p>
              </div>
            ) : (
              products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      {product.availableSupply}/{product.totalSupply} {t("dashboard.remaining")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      {product.pricePerUnit} {product.currency}
                    </p>
                    {product.mintTxHash && (
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                        NFT
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t("dashboard.quickActions")}</h2>
          
          <div className="space-y-4">
            <motion.button
              onClick={() => router.push('/supplier/create-product')}
              className="w-full flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Package className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">{t("dashboard.addNewProduct")}</span>
            </motion.button>
            
            <motion.button
              onClick={() => router.push('/supplier/products')}
              className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Award className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">{t("dashboard.mintNFT")}</span>
            </motion.button>
            
            <motion.button
              className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">{t("dashboard.viewOrders")}</span>
            </motion.button>
            
            <motion.button
              className="w-full flex items-center space-x-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TrendingUp className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-900">{t("dashboard.viewRevenue")}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;

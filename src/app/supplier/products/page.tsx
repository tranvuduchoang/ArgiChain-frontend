'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Plus, Award, Eye } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useTranslation } from '@/hooks/useTranslation';

const SupplierProductsPage: React.FC = () => {
  const router = useRouter();
  const { account, isConnected } = useWallet();
  const { t } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isConnected || !account) {
      router.push('/');
      return;
    }

    loadProducts();
  }, [isConnected, account, router]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');

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
      
      // Lấy sản phẩm của supplier
      const productsResponse = await fetch(`http://localhost:5000/api/products?supplierId=${supplier.id}`);
      if (!productsResponse.ok) {
        throw new Error(`Không thể lấy danh sách ${t("suppliers.products")}`);
      }
      
      const productsData = await productsResponse.json();
      setProducts(productsData);

    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  const handleMintNFT = (productId: string) => {
    router.push(`/supplier/mint-nft?productId=${productId}`);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Vui lòng kết nối ví
          </h1>
          <p className="text-gray-600 mb-6">
            {t("products.needWallet")}
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("products.loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t("common.error")}
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/supplier/dashboard')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Về dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Quay lại
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("products.manage")}</h1>
              <p className="text-gray-600">{t("products.manageAndMint")}</p>
            </div>
            <button
              onClick={() => router.push('/supplier/create-product')}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={20} />
              <span>{t("products.createNew")}</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("products.noProducts")}</h3>
            <p className="text-gray-600 mb-6">{t("products.createFirst")}</p>
            <button
              onClick={() => router.push('/supplier/create-product')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {t("products.createNew")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package size={48} className="text-gray-400" />
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Giá:</span>
                      <span className="font-medium">{product.pricePerUnit} {product.currency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tổng số lượng:</span>
                      <span className="font-medium">{product.totalSupply} {product.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Còn lại:</span>
                      <span className="font-medium">{product.availableSupply} {product.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Trạng thái:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isActive ? 'Hoạt động' : 'Tạm dừng'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMintNFT(product.id)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
                    >
                      <Award size={16} />
                      <span>Mint NFT</span>
                    </button>
                    <button
                      onClick={() => router.push(`/marketplace/${product.id}`)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
                    >
                      <Eye size={16} />
                      <span>Xem</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierProductsPage;

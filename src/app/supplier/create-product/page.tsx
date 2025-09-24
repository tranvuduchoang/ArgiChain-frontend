'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Upload, DollarSign, Hash, Image as ImageIcon } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useNetworkCurrency } from '@/hooks/useNetworkCurrency';

const CreateProductPage: React.FC = () => {
  const router = useRouter();
  const { account, isConnected } = useWallet();
  const { t } = useTranslation();
  const { currency } = useNetworkCurrency();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [supplierData, setSupplierData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    pricePerUnit: '',
    currency: 'tBNB', // Default fallback
    totalSupply: '',
    unit: 'kg',
    images: '',
    isOrganic: false,
  });

  // Update currency when it changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      currency: currency
    }));
  }, [currency]);

  useEffect(() => {
    if (!isConnected || !account) {
      router.push('/');
      return;
    }

    // Check if user is supplier
    checkSupplierStatus();
  }, [isConnected, account, router]);

  const checkSupplierStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/suppliers?walletAddress=${account}`);
      if (response.ok) {
        const suppliers = await response.json();
        if (suppliers && suppliers.length > 0) {
          setSupplierData(suppliers[0]);
        } else {
          router.push('/createsupplier');
        }
      }
    } catch (error) {
      console.error('Error checking supplier status:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !account || !supplierData) {
      setError('Vui lòng kết nối ví và đảm bảo bạn là nhà cung cấp');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create product
      const productResponse = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          supplierId: supplierData.id,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          pricingModel: 'FIXED',
          pricePerUnit: parseFloat(formData.pricePerUnit),
          currency: formData.currency,
          totalSupply: parseInt(formData.totalSupply),
          availableSupply: parseInt(formData.totalSupply),
          unit: formData.unit,
          images: formData.images ? [formData.images] : [],
          isOrganic: formData.isOrganic,
          isActive: true,
        }),
      });

      if (!productResponse.ok) {
        const errorData = await productResponse.json();
        throw new Error(errorData.error || `${t("common.error")} khi tạo ${t("suppliers.products")}`);
      }

      const product = await productResponse.json();
      setSuccess(`Tạo ${t("suppliers.products")} thành công! Bạn có thể mint NFT cho ${t("suppliers.products")} này.`);

      // Redirect to mint page after 2 seconds
      setTimeout(() => {
        router.push(`/supplier/mint-nft?productId=${product.id}`);
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Vui lòng kết nối ví
          </h1>
          <p className="text-gray-600 mb-6">
            {t("createProduct.needWallet")}
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

  if (!supplierData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Đang kiểm tra quyền...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Quay lại
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("createProduct.title")}
          </h1>
          <p className="text-gray-600">
            {t("createProduct.subtitle")}
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package size={16} className="inline mr-2" />
                {t("createProduct.productName")} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                placeholder={t("createProduct.productName")}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("createProduct.productDescription")} *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                placeholder={t("createProduct.productDescription")}
              />
            </div>

            {/* Category and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("createProduct.category")} *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                >
                  <option value="">{t("createProduct.selectCategory")}</option>
                  <option value="Rau củ">{t("createProduct.vegetables")}</option>
                  <option value="Trái cây">{t("createProduct.fruits")}</option>
                  <option value="Ngũ cốc">{t("createProduct.grains")}</option>
                  <option value="Thịt cá">{t("createProduct.meat")}</option>
                  <option value="Đồ uống">{t("createProduct.beverages")}</option>
                  <option value="Khác">{t("createProduct.other")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Hash size={16} className="inline mr-2" />
                  {t("createProduct.tags")}
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                  placeholder={t("createProduct.tagsPlaceholder")}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign size={16} className="inline mr-2" />
                  {t("createProduct.pricePerUnit")} *
                </label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  required
                  step="0.001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                  placeholder="0.001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("createProduct.currency")}
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                >
                  <option value={currency}>{currency}</option>
                  <option value="ETH">ETH</option>
                  <option value="MATIC">MATIC</option>
                  <option value="tBNB">tBNB</option>
                  <option value="BNB">BNB</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("createProduct.totalQuantity")} *
                </label>
                <input
                  type="number"
                  name="totalSupply"
                  value={formData.totalSupply}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                  placeholder="100"
                />
              </div>
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("createProduct.unit")}
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
                <option value="cái">{t("createProduct.piece")}</option>
                <option value="hộp">{t("createProduct.box")}</option>
              </select>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ImageIcon size={16} className="inline mr-2" />
                {t("createProduct.imageUrl")}
              </label>
              <input
                type="url"
                name="images"
                value={formData.images}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Organic checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isOrganic"
                checked={formData.isOrganic}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                {t("createProduct.organic")}
              </label>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md"
              >
                {success}
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? t("createProduct.creating") : t("createProduct.create")}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateProductPage;

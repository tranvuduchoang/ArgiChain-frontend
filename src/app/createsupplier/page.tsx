'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, MapPin, Mail, Phone, Globe, Upload } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

const CreateSupplierPage: React.FC = () => {
  const router = useRouter();
  const { account, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    logo: '',
    coverImage: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !account) {
      setError('Vui lòng kết nối ví trước khi tạo nhà cung cấp');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: account, // Sử dụng wallet address làm userId
          businessName: formData.businessName,
          slug: formData.businessName.toLowerCase().replace(/\s+/g, '-'),
          description: formData.description,
          location: formData.location,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          website: formData.website,
          logo: formData.logo,
          coverImage: formData.coverImage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '{t("common.error")} khi tạo nhà cung cấp');
      }

      const result = await response.json();
      setSuccess('Tạo nhà cung cấp thành công!');
      
      // Redirect to supplier dashboard after 2 seconds
      setTimeout(() => {
        router.push('/supplier/dashboard');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : '{t("common.error")}');
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
            Bạn cần kết nối ví để tạo nhà cung cấp
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
            Trở thành nhà cung cấp
          </h1>
          <p className="text-gray-600">
            Điền thông tin để tạo tài khoản nhà cung cấp của bạn
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 size={16} className="inline mr-2" />
                Tên doanh nghiệp *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập tên doanh nghiệp"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả doanh nghiệp *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Mô tả về doanh nghiệp và {t("suppliers.products")} của bạn"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Địa chỉ *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ví dụ: Đà Lạt, Lâm Đồng"
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email liên hệ *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0123-456-789"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe size={16} className="inline mr-2" />
                Website (tùy chọn)
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://example.com"
              />
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload size={16} className="inline mr-2" />
                  Logo URL (tùy chọn)
                </label>
                <input
                  type="url"
                  name="logo"
                  value={formData.logo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload size={16} className="inline mr-2" />
                  Ảnh bìa URL (tùy chọn)
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
            </div>

            {/* Wallet Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Thông tin ví</h3>
              <p className="text-sm text-gray-600">
                Địa chỉ ví: <span className="font-mono">{account}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Tài khoản nhà cung cấp sẽ được liên kết với địa chỉ ví này
              </p>
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
                {loading ? 'Đang tạo...' : 'Tạo nhà cung cấp'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateSupplierPage;

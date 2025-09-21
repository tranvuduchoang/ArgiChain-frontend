'use client';

import React, { useEffect, useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DeliveryConfirmationModal, { DeliveryConfirmationData } from '@/components/DeliveryConfirmationModal';
import { useTranslation } from '@/hooks/useTranslation';

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  product: {
    id: string;
    name: string;
    description: string;
    pricePerUnit: number;
    currency: string;
    imageUrl?: string;
    supplier: {
      id: string;
      name: string;
      user: {
        walletAddress: string;
      };
    };
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  deliveryStatus: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
  deliveryAddress: string;
  items: OrderItem[];
  supplier: {
    id: string;
    name: string;
    user: {
      walletAddress: string;
    };
  };
}

const PurchasedProductsPage: React.FC = () => {  const { t } = useTranslation();

  const { account, isConnected } = useWallet();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!isConnected || !account) {
      setLoading(false);
      return;
    }

    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`http://localhost:5000/api/orders/user/${account}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const ordersData = await response.json();
        setOrders(ordersData);
      } catch (err: any) {
        setError(err.message || 'Không thể tải danh sách đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [isConnected, account]);

  const handleConfirmDelivery = async (data: DeliveryConfirmationData) => {
    if (!account || !selectedOrder) return;

    try {
      setIsConfirming(true);

      // Debug logging
      console.log('Confirming delivery for:', {
        orderId: selectedOrder.id,
        userId: account,
        data
      });

      // Step 1: Confirm delivery
      const confirmResponse = await fetch('http://localhost:5000/api/delivery-confirmation/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          userId: account,
          rating: data.rating,
          comment: data.comment,
          hasComplaint: data.hasComplaint,
          qualityRating: data.qualityRating,
          images: data.images
        })
      });

      if (!confirmResponse.ok) {
        throw new Error('Failed to confirm delivery');
      }

      // Step 2: Burn NFT
      const burnResponse = await fetch('http://localhost:5000/api/delivery-confirmation/burn-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          userId: account
        })
      });

      if (!burnResponse.ok) {
        throw new Error('Failed to burn NFT');
      }

      // Step 3: Complete delivery confirmation
      const completeResponse = await fetch('http://localhost:5000/api/delivery-confirmation/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          userId: account
        })
      });

      if (!completeResponse.ok) {
        throw new Error('Failed to complete delivery confirmation');
      }

      // Refresh orders
      const refreshResponse = await fetch(`http://localhost:5000/api/orders/user/${account}`);
      if (refreshResponse.ok) {
        const ordersData = await refreshResponse.json();
        setOrders(ordersData);
      }

      alert('Xác nhận giao hàng thành công! NFT đã được burn.');
    } catch (error) {
      console.error('Error confirming delivery:', error);
      alert('{t("common.error")} khi xác nhận giao hàng. Vui lòng thử lại.');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleOpenDeliveryModal = (order: Order) => {
    setSelectedOrder(order);
    setShowDeliveryModal(true);
  };

  const handleCloseDeliveryModal = () => {
    setShowDeliveryModal(false);
    setSelectedOrder(null);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("purchased.title")}</h1>
            <p className="text-gray-600 mb-8">{t("purchased.connectWallet")}</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Kết nối ví
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center h-80">
            <motion.div
              className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("purchased.title")}</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <p className="text-red-600">{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("common.retry")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("purchased.title")}</h1>
              <p className="text-gray-600 mb-8 text-lg">{t("purchased.noProducts")}</p>
              <Link 
                href="/marketplace"
                className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {t("purchased.findProducts")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Những {t("suppliers.products")} đã mua</h1>
          
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Đơn hàng #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {order.totalAmount.toLocaleString()} {order.currency}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className={`text-sm px-2 py-1 rounded-full ${
                          order.status === 'PAID' ? 'bg-green-100 text-green-800' :
                          order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status === 'PAID' ? 'Đã thanh toán' :
                           order.status === 'PENDING' ? 'Đang xử lý' :
                           'Đã hủy'}
                        </div>
                        {order.deliveryStatus && (
                          <div className={`text-sm px-2 py-1 rounded-full ${
                            order.deliveryStatus === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                            order.deliveryStatus === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                            order.deliveryStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.deliveryStatus === 'COMPLETED' ? 'Đã hoàn thành' :
                             order.deliveryStatus === 'CONFIRMED' ? 'Đã xác nhận' :
                             order.deliveryStatus === 'PENDING' ? 'Chờ xác nhận' :
                             'Có vấn đề'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          {item.product.imageUrl ? (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-500 truncate">
                            {item.product.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">
                              Số lượng: {item.quantity}
                            </span>
                            <span className="text-sm text-gray-600">
                              Giá: {item.unitPrice.toLocaleString()} {item.product.currency}
                            </span>
                          </div>
                        </div>

                        {/* Supplier Info */}
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{t("suppliers.title")}:</p>
                          <p className="font-medium text-gray-900">{item.product.supplier.name}</p>
                          <p className="text-xs text-gray-400">
                            {item.product.supplier.user.walletAddress.slice(0, 6)}...{item.product.supplier.user.walletAddress.slice(-4)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Thông tin giao hàng:</h4>
                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                  </div>

                  {/* Delivery Confirmation Button */}
                  {order.status === 'PAID' && order.deliveryStatus === 'PENDING' && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleOpenDeliveryModal(order)}
                        disabled={isConfirming}
                        className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        {isConfirming ? 'Đang xử lý...' : 'Xác nhận đã nhận hàng'}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Delivery Confirmation Modal */}
      {selectedOrder && (
        <DeliveryConfirmationModal
          isOpen={showDeliveryModal}
          onClose={handleCloseDeliveryModal}
          onConfirm={handleConfirmDelivery}
          orderId={selectedOrder.id}
          productName={selectedOrder.items[0]?.product.name || 'Sản phẩm'}
        />
      )}
    </div>
  );
};

export default PurchasedProductsPage;

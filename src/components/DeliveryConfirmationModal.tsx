'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

interface DeliveryConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: DeliveryConfirmationData) => void;
  orderId: string;
  productName: string;
}

export interface DeliveryConfirmationData {
  orderId: string;
  rating: number;
  comment: string;
  hasComplaint: boolean;
  qualityRating: 'Good' | 'Bad';
  images: string[];
}

const DeliveryConfirmationModal: React.FC<DeliveryConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  orderId,
  productName
}) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hasComplaint, setHasComplaint] = useState(false);
  const [qualityRating, setQualityRating] = useState<'Good' | 'Bad'>('Good');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data: DeliveryConfirmationData = {
        orderId,
        rating,
        comment,
        hasComplaint,
        qualityRating,
        images: [] // Skip photo upload for now as requested
      };

      await onConfirm(data);
      onClose();
    } catch (error) {
      console.error('Error confirming delivery:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Xác nhận đã nhận hàng
                </h2>
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-1">Sản phẩm đã nhận</h3>
                <p className="text-gray-600">{productName}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đánh giá {t("suppliers.products")} (1-5 sao)
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                        disabled={isSubmitting}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {rating === 1 && 'Rất tệ'}
                    {rating === 2 && 'Tệ'}
                    {rating === 3 && 'Bình thường'}
                    {rating === 4 && 'Tốt'}
                    {rating === 5 && 'Rất tốt'}
                  </p>
                </div>

                {/* Quality Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chất lượng {t("suppliers.products")}
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="qualityRating"
                        value="Good"
                        checked={qualityRating === 'Good'}
                        onChange={(e) => setQualityRating(e.target.value as 'Good' | 'Bad')}
                        className="mr-2"
                        disabled={isSubmitting}
                      />
                      <span className="text-green-600">Tốt</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="qualityRating"
                        value="Bad"
                        checked={qualityRating === 'Bad'}
                        onChange={(e) => setQualityRating(e.target.value as 'Good' | 'Bad')}
                        className="mr-2"
                        disabled={isSubmitting}
                      />
                      <span className="text-red-600">Kém</span>
                    </label>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhận xét (tùy chọn)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={`Chia sẻ trải nghiệm của bạn về ${t("suppliers.products")}...`}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Complaint Checkbox */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hasComplaint}
                      onChange={(e) => setHasComplaint(e.target.checked)}
                      className="mr-2"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm text-gray-700">
                      Tôi gặp vấn đề với {t("suppliers.products")} này (khiếu nại)
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đã nhận hàng'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeliveryConfirmationModal;

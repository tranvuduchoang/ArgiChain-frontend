'use client';
import React, { useState } from 'react';
import { submitReview } from '@/utils/api';
import { motion } from 'framer-motion';

const ReviewPage: React.FC = () => {
  const [type, setType] = useState<'product' | 'supplier'>('product');
  const [id, setId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // TODO: Lấy buyerId từ context/wallet
      const buyerId = 1;
      const review = {
        userId: buyerId.toString(),
        rating,
        comment,
        productId: type === 'product' ? id : undefined,
        supplierId: type === 'supplier' ? id : undefined,
      };
      await submitReview(review);
      setSuccess('Gửi đánh giá thành công!');
      setComment('');
      setId('');
    } catch (err: any) {
      setError(err.message || 'Gửi đánh giá thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Gửi đánh giá</h2>
      <form className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" checked={type === 'product'} onChange={() => setType('product')} />
            Sản phẩm
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={type === 'supplier'} onChange={() => setType('supplier')} />
            Supplier
          </label>
        </div>
        <div>
          <label className="block mb-1 font-medium">ID {type === 'product' ? 'sản phẩm' : 'supplier'}</label>
          <input
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Đánh giá</label>
          <select
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {[5,4,3,2,1].map((r) => (
              <option key={r} value={r}>{'★'.repeat(r)}{'☆'.repeat(5-r)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Nhận xét</label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold transition-colors disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
        </button>
        {success && (
          <motion.div
            className="bg-green-100 text-green-700 px-4 py-2 rounded text-center font-semibold shadow animate-fade-in"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {success}
          </motion.div>
        )}
        {error && (
          <motion.div
            className="bg-red-100 text-red-700 px-4 py-2 rounded text-center font-semibold shadow animate-fade-in"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default ReviewPage;
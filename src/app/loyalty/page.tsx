'use client';
import React, { useState } from 'react';
import { fetchLoyalty, redeemLoyalty } from '../../utils/api';
import { motion } from 'framer-motion';

const LoyaltyPage: React.FC = () => {
  // TODO: Lấy buyerId từ context/wallet
  const buyerId = 1;
  const [loyalty, setLoyalty] = useState<any[]>([]);
  const [supplierId, setSupplierId] = useState('');
  const [points, setPoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFetch = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchLoyalty(buyerId);
      setLoyalty(data);
    } catch (err: any) {
      setError(err.message || 'Không thể lấy điểm loyalty');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeeming(true);
    setError('');
    setSuccess('');
    try {
      const result = await redeemLoyalty(buyerId, Number(supplierId), Number(points));
      setSuccess(`Đổi điểm thành công! Nhận được ${result.tokensRedeemed} TOKEN.`);
      setPoints('');
      handleFetch();
    } catch (err: any) {
      setError(err.message || 'Đổi điểm thất bại');
    } finally {
      setRedeeming(false);
    }
  };

  React.useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="max-w-lg mx-auto px-4 py-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Loyalty Points</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="font-semibold mb-2">Điểm tích lũy theo supplier</h3>
        {loading ? (
          <div className="text-blue-500">Đang tải...</div>
        ) : loyalty.length === 0 ? (
          <div className="text-gray-500">Chưa có điểm loyalty nào.</div>
        ) : (
          <ul className="space-y-2">
            {loyalty.map((l) => (
              <li key={l.supplierId} className="flex justify-between items-center bg-gray-50 rounded px-3 py-2">
                <span>Supplier #{l.supplierId}</span>
                <span className="font-bold text-blue-700">{l.points} điểm</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4" onSubmit={handleRedeem}>
        <h3 className="font-semibold mb-2">Đổi điểm lấy TOKEN</h3>
        <div>
          <label className="block mb-1 font-medium">Supplier ID</label>
          <input
            type="number"
            value={supplierId}
            onChange={e => setSupplierId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Số điểm muốn đổi</label>
          <input
            type="number"
            value={points}
            onChange={e => setPoints(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold transition-colors disabled:opacity-60"
          disabled={redeeming}
        >
          {redeeming ? 'Đang đổi điểm...' : 'Đổi điểm'}
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

export default LoyaltyPage;
'use client';
import React, { useEffect, useState } from 'react';
import { fetchProfile, fetchLoyalty } from '@/utils/api';
import { motion } from 'framer-motion';

const ProfilePage: React.FC = () => {
  // TODO: Lấy userId từ context/wallet
  const userId = 1;
  const [profile, setProfile] = useState<any>(null);
  const [loyalty, setLoyalty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchProfile(userId.toString()),
      fetchLoyalty(userId.toString()),
    ])
      .then(([prof, loy]: [any, any]) => {
        setProfile(prof);
        setLoyalty(Array.isArray(loy) ? loy : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Lỗi không xác định');
        setLoading(false);
      });
  }, [userId]);

  if (loading) return (
    <div className="flex justify-center items-center h-80">
      <motion.div
        className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
    </div>
  );
  if (error) return (
    <motion.div
      className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-center font-semibold shadow animate-fade-in"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {error}
    </motion.div>
  );
  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Thông tin cá nhân</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="font-semibold text-lg">{profile.name || 'User #' + profile.id}</div>
        <div className="text-gray-500">Email: {profile.email}</div>
        <div className="text-gray-500">Địa chỉ ví: {profile.walletAddress}</div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="font-semibold mb-2">Điểm loyalty</h3>
        {loyalty.length === 0 ? (
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
      {/* TODO: Hiển thị đơn hàng đã đặt, review, v.v. */}
    </div>
  );
};

export default ProfilePage;
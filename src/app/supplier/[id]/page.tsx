'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchSupplierDetail, fetchProducts, fetchReviews } from '@/utils/api';
import { motion, AnimatePresence } from 'framer-motion';

const SupplierPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [supplier, setSupplier] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      fetchSupplierDetail(id),
      fetchProducts(),
      fetchReviews({ supplierId: id }),
    ])
      .then(([sup, prods, revs]) => {
        setSupplier(sup);
        setProducts(prods.filter((p: any) => p.supplierId === id));
        setReviews(revs);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Lỗi không xác định');
        setLoading(false);
      });
  }, [id]);

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
  if (!supplier) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="font-semibold text-lg">{supplier.name || 'Supplier #' + supplier.id}</div>
        <div className="text-gray-500">Địa chỉ ví: {supplier.user.walletAddress}</div>
        <div className="text-gray-500">Email: {supplier.contactEmail}</div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Sản phẩm của supplier</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.length === 0 ? (
            <div className="col-span-full text-gray-500">Chưa có sản phẩm nào.</div>
          ) : (
            products.map((product: any) => (
              <motion.div
                key={product.id}
                className="bg-gray-50 rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.03 }}
                layout
              >
                <div className="font-semibold">{product.name}</div>
                <div className="text-green-600 font-bold">TOKEN: {product.pricePerUnit} {product.currency}</div>
                <div className="text-xs text-gray-400">Còn lại: {product.availableSupply}/{product.totalSupply}</div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Đánh giá về supplier</h3>
        <AnimatePresence>
          {reviews.length === 0 ? (
            <div className="text-gray-500">Chưa có đánh giá nào.</div>
          ) : (
            <motion.ul
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
              }}
            >
              {reviews.map((r) => (
                <motion.li key={r.id} className="bg-gray-50 rounded-lg p-4 shadow flex flex-col gap-1" layout>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-700">Buyer #{r.buyerId}</span>
                    <span className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                  </div>
                  <div className="text-gray-700">{r.comment}</div>
                  <div className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleString()}</div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SupplierPage;
'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchProductDetail, fetchReviews, fetchSupplierDetail } from '@/utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const ProductDetailPage: React.FC = () => {  const { t } = useTranslation();

  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [supplier, setSupplier] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      fetchProductDetail(id),
      fetchReviews({ productId: id }),
    ])
      .then(([prod, revs]) => {
        setProduct(prod);
        setReviews(revs);
        return fetchSupplierDetail(prod.supplier.id);
      })
      .then((sup) => {
        setSupplier(sup);
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
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div className="flex-1 relative" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <img src={product.imageUrl} alt={product.name} className="w-full rounded-xl shadow-lg object-cover aspect-square bg-gray-50" />
          {product.nftTxHash && (
            <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded shadow-md animate-pulse">NFT</span>
          )}
        </motion.div>
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <div className="text-gray-500">Supplier: <span className="font-semibold">#{product.supplierId} {supplier?.name && `- ${supplier.name}`}</span></div>
          <div className="text-green-600 font-bold text-2xl">TOKEN: {product.pricePerUnit} {product.currency}</div>
          <div className="text-gray-400 text-sm">Còn lại: {product.availableSupply}/{product.totalSupply}</div>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-6 font-semibold transition-colors shadow"
              onClick={() => router.push(`/order?productId=${product.id}`)}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Đánh giá {t("suppliers.products")}</h3>
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

export default ProductDetailPage;
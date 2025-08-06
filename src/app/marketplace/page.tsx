'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { fetchProducts } from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';

const MarketplacePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Lỗi không xác định');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  const handleViewDetail = (id: number) => {
    // TODO: chuyển sang trang chi tiết sản phẩm
    alert('Xem chi tiết sản phẩm #' + id);
  };
  const handleBuy = (id: number) => {
    // TODO: mở modal mua hàng hoặc chuyển sang trang đặt hàng
    alert('Mua sản phẩm #' + id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center animate-fade-in">Marketplace</h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && (
        <div className="flex justify-center items-center h-40">
          <motion.div
            className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
      )}
      {error && (
        <motion.div
          className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-center font-semibold shadow animate-fade-in"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      <AnimatePresence>
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
            }}
          >
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">Không có sản phẩm nào phù hợp.</div>
            ) : (
              filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetail={handleViewDetail}
                  onBuy={handleBuy}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketplacePage;
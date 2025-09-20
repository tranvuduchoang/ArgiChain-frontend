'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { fetchMarketplaceListings, MarketplaceListingItem } from '@/utils/api';

const MarketplacePage: React.FC = () => {
  const router = useRouter();
  const [listings, setListings] = useState<MarketplaceListingItem[]>([]);
  const [search, setSearch] = useState('');
  const [onlyMinted, setOnlyMinted] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMarketplaceListings()
      .then((data) => {
        setListings(data);
        setError(null);
      })
      .catch((err: Error) => {
        setError(err.message || 'Không thể tải danh sách sản phẩm');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      if (onlyMinted && !listing.mintTxHash) return false;
      if (onlyInStock && listing.availableSupply <= 0) return false;
      if (!search) return true;

      const keyword = search.toLowerCase();
      return (
        listing.productName?.toLowerCase().includes(keyword) ||
        listing.supplierName?.toLowerCase().includes(keyword) ||
        listing.tags?.some((tag) => tag.toLowerCase().includes(keyword)) ||
        listing.category?.toLowerCase().includes(keyword)
      );
    });
  }, [listings, search, onlyInStock, onlyMinted]);

  const handleViewDetail = (productId: string) => {
    router.push(`/marketplace/${productId}`);
  };

  const handleBuy = (productId: string) => {
    router.push(`/order?productId=${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white/70 backdrop-blur border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 ui-soft-shadow">
        <div>
          <h1 className="text-3xl font-bold ui-gradient-text">Marketplace</h1>
          <p className="text-gray-500">Khám phá các lô nông sản đã được token hóa và giao dịch bằng crypto minh bạch.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Tìm kiếm theo tên sản phẩm, supplier, tag..."
            className="ui-focus-ring w-full sm:w-80 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500 cursor-pointer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded"
                checked={onlyInStock}
                onChange={() => setOnlyInStock((prev) => !prev)}
              />
              Còn hàng
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded"
                checked={onlyMinted}
                onChange={() => setOnlyMinted((prev) => !prev)}
              />
              Đã mint NFT
            </label>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-52">
          <motion.div
            className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
      )}

      {error && !loading && (
        <motion.div
          className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6 text-center font-semibold shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      {!loading && !error && (
        <div className="text-sm text-gray-500 mb-4">
          Hiển thị {filteredListings.length} / {listings.length} sản phẩm.
        </div>
      )}

      <AnimatePresence>
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
            }}
          >
            {filteredListings.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-10 border border-dashed rounded-lg">
                Không tìm thấy sản phẩm phù hợp.
              </div>
            ) : (
              filteredListings.map((listing) => (
                <ProductCard
                  key={listing.listingId}
                  listing={listing}
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

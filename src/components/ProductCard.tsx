import React from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    supplierId: number;
    nftTxHash?: string;
  };
  onViewDetail: (id: number) => void;
  onBuy: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetail, onBuy }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 hover:shadow-2xl transition-shadow relative cursor-pointer border border-gray-100"
      whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      layout
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.nftTxHash && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded shadow-md animate-pulse">NFT</span>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
        <div className="text-sm text-gray-500">Supplier #{product.supplierId}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-green-600 font-bold text-xl">{product.price} <span className="text-xs">TOKEN</span></span>
          <span className="ml-auto text-xs text-gray-400">Còn lại: {product.quantity}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold transition-colors"
          onClick={() => onBuy(product.id)}
        >
          Mua ngay
        </button>
        <button
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 font-semibold border border-gray-200"
          onClick={() => onViewDetail(product.id)}
        >
          Xem chi tiết
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
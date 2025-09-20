import React from 'react';
import { motion } from 'framer-motion';
import { MarketplaceListingItem } from '@/utils/api';

interface ProductCardProps {
  listing: MarketplaceListingItem;
  onViewDetail: (productId: string) => void;
  onBuy: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ listing, onViewDetail, onBuy }) => {
  const primaryImage = listing.productImages?.[0] ?? '/placeholder-product.png';
  const formattedPrice = `${listing.pricePerUnit} ${listing.currency}`;
  const remainingLabel = `${listing.availableSupply}/${listing.totalSupply}`;
  const isMinted = Boolean(listing.mintTxHash);

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
          src={primaryImage}
          alt={listing.productName}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {isMinted && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded shadow-md">NFT Minted</span>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-semibold text-lg text-gray-800 truncate" title={listing.productName}>{listing.productName}</h3>
        <div className="text-sm text-gray-500 truncate" title={listing.supplierName || listing.supplierId}>
          Supplier: {listing.supplierName || `#${listing.supplierId}`}
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <span className="uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{listing.category}</span>
          {listing.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="uppercase bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-green-600 font-bold text-xl">{formattedPrice}</span>
          <span className="ml-auto text-xs text-gray-400" title="Available / Total">
            Stock: {remainingLabel}
          </span>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold transition-colors"
          onClick={() => onBuy(listing.productId)}
        >
          Place Order
        </button>
        <button
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 font-semibold border border-gray-200"
          onClick={() => onViewDetail(listing.productId)}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

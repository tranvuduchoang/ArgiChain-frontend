'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchProductDetail, createOrder } from '@/utils/api';
import { useWallet } from '@/contexts/WalletContext';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { buyProduct, findListingIdByTokenId } from '@/utils/marketplace';

const OrderPageContent: React.FC = () => {  const { t } = useTranslation();

  const params = useSearchParams();
  const router = useRouter();
  const { account, isConnected } = useWallet();
  const productId = params.get('productId');
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetchProductDetail(productId)
      .then((prod) => {
        setProduct(prod);
        
        // Check if user is trying to buy their own product
        if (isConnected && account && prod.supplier?.user?.walletAddress === account) {
          setError('Bạn không thể mua {t("suppliers.products")} của chính mình!');
          setLoading(false);
          return;
        }
        
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Lỗi không xác định');
        setLoading(false);
      });
  }, [productId, isConnected, account]);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setError('Vui lòng nhập địa chỉ nhận hàng');
      return;
    }
    // Validate quantity
    if (quantity > product.availableSupply) {
      setError(`Số lượng không được vượt quá ${product.availableSupply} sản phẩm có sẵn`);
      return;
    }
    
    if (quantity <= 0) {
      setError('Số lượng phải lớn hơn 0');
      return;
    }
    
    setPlacing(true);
    setError('');
    setSuccess('');
    try {
      if (!isConnected || !account) {
        throw new Error('Vui lòng kết nối ví trước khi đặt hàng');
      }

      // Step 1: Buy product from smart contract
      console.log('🛒 Starting blockchain purchase...');
      setSuccess('Đang mua sản phẩm trên blockchain...');
      
      // Find the active listing ID for this product's token ID
      if (!product.nftTokenId) {
        throw new Error('Sản phẩm chưa được mint NFT. Vui lòng liên hệ supplier.');
      }
      
      console.log('🔍 Finding listing ID for token ID:', product.nftTokenId);
      const listingId = await findListingIdByTokenId(Number(product.nftTokenId));
      
      if (!listingId) {
        throw new Error('Không tìm thấy listing active cho sản phẩm này. Vui lòng liên hệ supplier.');
      }
      
      console.log('✅ Found listing ID:', listingId);
      const transactionHash = await buyProduct(listingId, quantity, account);
      
      console.log('✅ Blockchain purchase successful:', transactionHash);
      setSuccess(`Mua sản phẩm thành công! Transaction: ${transactionHash}`);
      
      // Step 2: Create order in backend (for delivery tracking)
      const order = await createOrder({
        userId: account,
        supplierId: product.supplier.id,
        transactionHash: transactionHash,
        chainId: 97, // BSC Testnet
        buyerWalletAddress: account,
        items: [{ productId: product.id, quantity }],
        deliveryAddress: address,
        deliveryMethod: 'STANDARD',
        paymentMethod: 'CRYPTO',
        currency: 'tBNB',
      });
      
      setSuccess('Đặt hàng hoàn tất! NFT đã được chuyển vào ví của bạn.');
      setTimeout(() => router.push('/profile/orders'), 2000);
      
    } catch (err: any) {
      console.error('❌ Order failed:', err);
      setError(err.message || 'Đặt hàng thất bại');
    } finally {
      setPlacing(false);
    }
  };

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
    <div className="max-w-lg mx-auto px-4 py-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Đặt hàng: {product.name}</h2>
      <form className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4" onSubmit={handleOrder}>
        <div className="flex gap-4 items-center">
          <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-lg bg-gray-50" />
          <div className="flex-1">
            <div className="font-semibold text-lg text-gray-900">{product.name}</div>
            <div className="text-green-600 font-bold">TOKEN: {product.pricePerUnit} {product.currency}</div>
            <div className="text-xs text-gray-400">Còn lại: {product.availableSupply}/{product.totalSupply}</div>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-900">Số lượng</label>
          <input
            type="number"
            min={1}
            max={product.availableSupply}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-900">Địa chỉ nhận hàng</label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold transition-colors disabled:opacity-60"
          disabled={placing}
        >
          {placing ? 'Đang đặt hàng...' : 'Xác nhận đặt hàng'}
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
      </form>
    </div>
  );
};

const OrderPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPageContent />
    </Suspense>
  );
};

export default OrderPage;
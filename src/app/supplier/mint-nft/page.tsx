'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Coins, Hash, Image as ImageIcon, Upload } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

const MintNFTPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { account, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [product, setProduct] = useState<any>(null);
  const [supplierData, setSupplierData] = useState<any>(null);

  const [mintData, setMintData] = useState({
    quantity: 1,
    metadataUri: '',
    name: '',
    description: '',
    image: '',
    tokenId: 1,
    contractAddress: '',
    chainId: 2442,
  });

  useEffect(() => {
    if (!isConnected || !account) {
      router.push('/');
      return;
    }

    const productId = searchParams.get('productId');
    if (!productId) {
      router.push('/supplier/dashboard');
      return;
    }

    loadProductData(productId);
    checkSupplierStatus();
  }, [isConnected, account, searchParams, router]);

  const loadProductData = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      if (response.ok) {
        const productData = await response.json();
        setProduct(productData);
        setMintData(prev => ({
          ...prev,
          name: productData.name,
          description: productData.description,
          image: productData.images?.[0] || '',
        }));
      }
    } catch (error) {
      console.error('Error loading product:', error);
    }
  };

  const checkSupplierStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/suppliers?walletAddress=${account}`);
      if (response.ok) {
        const suppliers = await response.json();
        if (suppliers && suppliers.length > 0) {
          setSupplierData(suppliers[0]);
        } else {
          router.push('/createsupplier');
        }
      }
    } catch (error) {
      console.error('Error checking supplier status:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMintData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMintNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !account || !product || !supplierData) {
      setError('Vui lòng kết nối ví và đảm bảo bạn là nhà cung cấp');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Prepare mint parameters
      const prepareResponse = await fetch(`http://localhost:5000/api/products/${product.id}/mint/prepare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: parseInt(mintData.quantity.toString()),
          metadataUri: mintData.metadataUri || `https://agrichain.com/metadata/${product.id}`,
        }),
      });

      if (!prepareResponse.ok) {
        const errorData = await prepareResponse.json();
        throw new Error(errorData.error || 'Có lỗi xảy ra khi chuẩn bị mint');
      }

      const mintParams = await prepareResponse.json();
      
      // Update mintData with data from prepare response
      setMintData(prev => ({
        ...prev,
        tokenId: mintParams.tokenId || 1,
        contractAddress: mintParams.contractAddress || '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        chainId: mintParams.chainId || 2442,
      }));
      
      // Step 2: Simulate blockchain transaction (in real app, this would be actual blockchain call)
      setSuccess('Đang mint NFT... Vui lòng chờ xác nhận giao dịch blockchain.');
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Step 3: Confirm mint
      const confirmResponse = await fetch(`http://localhost:5000/api/products/${product.id}/mint/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenId: mintParams.tokenId || 1, // Use tokenId from prepare response
          contractAddress: mintParams.contractAddress || '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', // Use contractAddress from prepare response
          transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`, // Mock transaction hash
          mintedQuantity: parseInt(mintData.quantity.toString()),
          chainId: mintParams.chainId || 2442, // Cardona testnet
          buyerAddress: account,
        }),
      });

      if (!confirmResponse.ok) {
        const errorData = await confirmResponse.json();
        throw new Error(errorData.error || 'Có lỗi xảy ra khi xác nhận mint');
      }

      const result = await confirmResponse.json();
      setSuccess(`Mint NFT thành công! Transaction hash: ${result.transactionHash}`);
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/supplier/dashboard');
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Vui lòng kết nối ví
          </h1>
          <p className="text-gray-600 mb-6">
            Bạn cần kết nối ví để mint NFT
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Đang tải thông tin sản phẩm...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Quay lại
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mint NFT cho sản phẩm
          </h1>
          <p className="text-gray-600">
            Tạo NFT để bán sản phẩm trên marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin sản phẩm</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                <p className="text-gray-900">{product.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                  <p className="text-gray-900">{product.pricePerUnit} {product.currency}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tổng số lượng</label>
                  <p className="text-gray-900">{product.totalSupply} {product.unit}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <p className="text-gray-900">{product.category}</p>
              </div>
              
              {product.tags && product.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Mint Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin mint NFT</h2>
            
            <form onSubmit={handleMintNFT} className="space-y-6">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Hash size={16} className="inline mr-2" />
                  Số lượng NFT cần mint *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={mintData.quantity}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max={product.totalSupply}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tối đa: {product.totalSupply} NFT
                </p>
              </div>

              {/* Metadata URI */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Package size={16} className="inline mr-2" />
                  Metadata URI (tùy chọn)
                </label>
                <input
                  type="url"
                  name="metadataUri"
                  value={mintData.metadataUri}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://agrichain.com/metadata/123"
                />
              </div>

              {/* NFT Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên NFT *
                </label>
                <input
                  type="text"
                  name="name"
                  value={mintData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* NFT Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả NFT *
                </label>
                <textarea
                  name="description"
                  value={mintData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* NFT Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ImageIcon size={16} className="inline mr-2" />
                  Hình ảnh NFT *
                </label>
                <input
                  type="url"
                  name="image"
                  value={mintData.image}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/nft-image.jpg"
                />
              </div>

              {/* Cost Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Chi phí mint</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Gas fee (ước tính):</span>
                    <span>0.001 MATIC</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Tổng cộng:</span>
                    <span>0.001 MATIC</span>
                  </div>
                </div>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md"
                >
                  {success}
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? 'Đang mint...' : 'Mint NFT'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const MintNFTPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MintNFTPageContent />
    </Suspense>
  );
};

export default MintNFTPage;

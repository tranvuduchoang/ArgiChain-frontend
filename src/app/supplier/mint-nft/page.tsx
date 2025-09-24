'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Coins, Hash, Image as ImageIcon, Upload } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useNetworkCurrency } from '@/hooks/useNetworkCurrency';
import { waitForTransaction, BLOCKCHAIN_CONFIG, switchToBSC } from '@/utils/blockchain';
import { mintProductNFT, checkSupplierAuthorization } from '@/utils/mintNFT';
import { createAutoListing } from '@/utils/autoListing';
import { ethers } from 'ethers';

const MintNFTPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { account, isConnected } = useWallet();
  const { currency } = useNetworkCurrency();
  const { t } = useTranslation();
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
    contractAddress: BLOCKCHAIN_CONFIG.NFT_ADDRESS,
    chainId: BLOCKCHAIN_CONFIG.CHAIN_ID,
    autoList: true, // Tự động tạo listing sau khi mint
    listPrice: '', // Giá để list (sẽ lấy từ product.pricePerUnit)
    listQuantity: 1, // Số lượng để list
    expiryDays: 30, // Số ngày hết hạn listing
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

    // Force switch to BSC Testnet
    switchToBSC().catch(console.error);
    
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
          listPrice: productData.pricePerUnit || '0.001', // Lấy giá từ product
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
        throw new Error(errorData.error || `${t("common.error")} khi chuẩn bị mint`);
      }

      const mintParams = await prepareResponse.json();
      
      // Update mintData with data from prepare response
      setMintData(prev => ({
        ...prev,
        tokenId: mintParams.tokenId || 1,
        contractAddress: mintParams.contractAddress || BLOCKCHAIN_CONFIG.NFT_ADDRESS,
        chainId: mintParams.chainId || BLOCKCHAIN_CONFIG.CHAIN_ID,
      }));
      
      // Step 2: Mint NFT on blockchain
      setSuccess('Đang mint NFT... Vui lòng chờ xác nhận giao dịch blockchain.');
      
      // Always use the latest contract address from blockchain config
      const contractAddress = BLOCKCHAIN_CONFIG.NFT_ADDRESS;
      console.log('Using contract address:', contractAddress);
      const tokenId = mintParams.tokenId || 1;
      const quantity = parseInt(mintData.quantity.toString());
      
      // Check if user is authorized supplier
      const isAuthorized = await checkSupplierAuthorization(account, contractAddress);
      if (!isAuthorized) {
        throw new Error('Bạn chưa được ủy quyền để mint NFT. Vui lòng liên hệ admin để được ủy quyền.');
      }
      
      let transactionHash: string;
      
      try {
        // Call blockchain mint function using mintProductNFT
        transactionHash = await mintProductNFT(
          contractAddress,
          account, // Mint to supplier's wallet
          quantity,
          mintData.name,
          mintData.description,
          product.category,
          product.pricePerUnit,
          product.totalSupply,
          product.unit,
          product.isOrganic || false,
          product.harvestDate ? new Date(product.harvestDate).getTime() / 1000 : Math.floor(Date.now() / 1000),
          product.location || 'Unknown',
          mintData.metadataUri || `https://agrichain.com/metadata/${product.id}`
        );
        
        console.log('Transaction hash received:', transactionHash);
        
        if (!transactionHash) {
          throw new Error('Transaction hash is undefined. Mint may have failed.');
        }
        
        setSuccess(`Giao dịch đã được gửi! Hash: ${transactionHash}. Đang chờ xác nhận...`);
        
        // Wait for transaction confirmation
        await waitForTransaction(transactionHash, 1);
        
        setSuccess(`NFT đã được mint thành công! Hash: ${transactionHash}`);
        
      } catch (mintError) {
        console.error('Error during mint process:', mintError);
        throw new Error(`Lỗi khi mint NFT: ${mintError instanceof Error ? mintError.message : 'Unknown error'}`);
      }
      
      // Step 3: Confirm mint in backend
      // Get the actual token ID from the mint transaction receipt
      let actualTokenId = tokenId; // Default to mintParams tokenId
      
      // Try to get the actual token ID from the mint transaction receipt
      try {
        const mintReceipt = await waitForTransaction(transactionHash, 1);
        
        // Create NFT contract instance to parse events
        const provider = new ethers.BrowserProvider(window.ethereum);
        const nftContract = new ethers.Contract(
          contractAddress,
          [
            "event ProductNFTMinted(uint256 indexed tokenId, address indexed supplier, uint256 amount, string productName, string metadata)",
            "function getTotalProducts() external view returns (uint256)"
          ],
          provider
        );
        
        // Look for ProductNFTMinted event to get the actual token ID
        const mintEvent = mintReceipt.logs.find((log: any) => {
          try {
            const parsed = nftContract.interface.parseLog(log);
            return parsed?.name === 'ProductNFTMinted';
          } catch {
            return false;
          }
        });
        
        if (mintEvent) {
          const parsedEvent = nftContract.interface.parseLog(mintEvent);
          actualTokenId = Number(parsedEvent?.args[0]); // tokenId is the first argument
          console.log('🎯 Actual token ID from mint event:', actualTokenId);
        } else {
          // Fallback: get the latest token ID from getTotalProducts
          try {
            const totalProducts = await nftContract.getTotalProducts();
            actualTokenId = Number(totalProducts);
            console.log('🎯 Using latest token ID from getTotalProducts:', actualTokenId);
          } catch (fallbackError) {
            console.warn('Could not get total products, using default tokenId:', fallbackError);
          }
        }
      } catch (error) {
        console.warn('Could not get token ID from mint event, using default:', error);
      }
      
      const confirmTokenId = actualTokenId;
      
      const confirmData = {
        tokenId: confirmTokenId,
        contractAddress: contractAddress,
        transactionHash: transactionHash,
        mintedQuantity: quantity,
        chainId: mintParams.chainId || BLOCKCHAIN_CONFIG.CHAIN_ID,
        toAddress: account,
      };
      
      console.log('🔍 Sending confirm data:', confirmData);
      
      const confirmResponse = await fetch(`http://localhost:5000/api/products/${product.id}/mint/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmData),
      });

      if (!confirmResponse.ok) {
        const errorData = await confirmResponse.json();
        console.error('❌ Backend error response:', errorData);
        console.error('❌ Response status:', confirmResponse.status);
        throw new Error(errorData.error || `${t("common.error")} khi xác nhận mint`);
      }

      const result = await confirmResponse.json();
      const finalTxHash = result.transactionHash || transactionHash;
      setSuccess(`Mint NFT thành công! Transaction hash: ${finalTxHash}`);
      
      // Step 4: Auto create listing if enabled
      if (mintData.autoList && mintData.listPrice) {
        try {
          setSuccess(`Mint NFT thành công! Đang tạo listing tự động...`);
          
          // Add a small delay to ensure mint is fully processed
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          console.log('🎯 Creating listing with token ID:', confirmTokenId);
          console.log('🎯 Listing price:', mintData.listPrice);
          console.log('🎯 Listing quantity:', mintData.listQuantity);
          
          const listingResult = await createAutoListing(
            confirmTokenId,
            mintData.listPrice,
            mintData.listQuantity,
            mintData.expiryDays,
            account
          );
          
          setSuccess(`Hoàn thành! NFT đã được mint và listing đã được tạo tự động. 
            Mint hash: ${finalTxHash}
            Listing ID: ${listingResult.listingId}
            Listing hash: ${listingResult.transactionHash}`);
            
        } catch (listingError) {
          console.error('Error creating auto listing:', listingError);
          setSuccess(`Mint NFT thành công! Tuy nhiên, có lỗi khi tạo listing tự động: ${listingError instanceof Error ? listingError.message : 'Unknown error'}`);
        }
      } else {
        setSuccess(`Mint NFT thành công! Transaction hash: ${finalTxHash}`);
      }
      
      // Redirect to dashboard after 5 seconds
      setTimeout(() => {
        router.push('/supplier/dashboard');
      }, 5000);

    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.error"));
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
            {t("mintNFT.loading")}
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
            {t("mintNFT.title")}
          </h1>
          <p className="text-gray-600">
            {t("mintNFT.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t("mintNFT.productInfo")}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("mintNFT.productName")}</label>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t("mintNFT.title")}</h2>
            
            <form onSubmit={handleMintNFT} className="space-y-6">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Hash size={16} className="inline mr-2" />
                  {t("mintNFT.quantity")} *
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

              {/* Auto Listing Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tự động tạo Listing</h3>
                
                {/* Auto List Toggle */}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="autoList"
                    checked={mintData.autoList}
                    onChange={(e) => setMintData(prev => ({ ...prev, autoList: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Tự động tạo listing sau khi mint NFT
                  </label>
                </div>

                {mintData.autoList && (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    {/* List Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giá listing (AGRI tokens) *
                      </label>
                      <input
                        type="number"
                        name="listPrice"
                        value={mintData.listPrice}
                        onChange={handleInputChange}
                        required={mintData.autoList}
                        step="0.001"
                        min="0.001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0.001"
                      />
                    </div>

                    {/* List Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số lượng listing *
                      </label>
                      <input
                        type="number"
                        name="listQuantity"
                        value={mintData.listQuantity}
                        onChange={handleInputChange}
                        required={mintData.autoList}
                        min="1"
                        max={mintData.quantity}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Tối đa: {mintData.quantity} NFT
                      </p>
                    </div>

                    {/* Expiry Days */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thời gian hết hạn (ngày) *
                      </label>
                      <input
                        type="number"
                        name="expiryDays"
                        value={mintData.expiryDays}
                        onChange={handleInputChange}
                        required={mintData.autoList}
                        min="1"
                        max="365"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cost Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Chi phí mint</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-gray-900">
                    <span>Gas fee (ước tính):</span>
                     <span>0.001 {currency}</span>
                  </div>
                  <div className="flex justify-between font-medium text-gray-900">
                    <span>Tổng cộng:</span>
                     <span>0.001 {currency}</span>
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
                  {loading ? t("mintNFT.minting") : t("mintNFT.mint")}
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

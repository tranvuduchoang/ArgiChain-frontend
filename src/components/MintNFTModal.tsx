'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Package, Coins, Hash, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { mintNFT, waitForTransaction, BLOCKCHAIN_CONFIG } from '@/utils/blockchain';

interface MintNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    description: string;
    images?: string[];
    pricePerUnit: number;
    currency: string;
  };
  onMintSuccess?: (txHash: string) => void;
}

const MintNFTModal: React.FC<MintNFTModalProps> = ({
  isOpen,
  onClose,
  product,
  onMintSuccess,
}) => {
  const { account, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mintData, setMintData] = useState({
    quantity: 1,
    metadataUri: `https://agrichain.com/metadata/${product.id}`,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMintData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMintNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !account) {
      setError('Vui lòng kết nối ví trước khi mint NFT');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Step 1: Prepare mint parameters
      const prepareResponse = await fetch(`http://localhost:5000/api/products/${product.id}/mint/prepare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: parseInt(mintData.quantity.toString()),
          metadataUri: mintData.metadataUri,
        }),
      });

      if (!prepareResponse.ok) {
        const errorData = await prepareResponse.json();
        throw new Error(errorData.error || 'Lỗi khi chuẩn bị mint');
      }

      const mintParams = await prepareResponse.json();
      
      // Step 2: Mint NFT on blockchain
      setSuccess('Đang mint NFT... Vui lòng chờ xác nhận giao dịch blockchain.');
      
      const contractAddress = mintParams.contractAddress || (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_AGRICHAIN_NFT_ADDRESS : undefined) || BLOCKCHAIN_CONFIG.NFT_ADDRESS;
      const tokenId = mintParams.tokenId || 1;
      const quantity = parseInt(mintData.quantity.toString());
      
      // Call blockchain mint function
      const transactionHash = await mintNFT(
        contractAddress,
        account, // Mint to user's wallet
        tokenId,
        quantity
      );
      
      setSuccess(`Giao dịch đã được gửi! Hash: ${transactionHash}. Đang chờ xác nhận...`);
      
      // Wait for transaction confirmation
      await waitForTransaction(transactionHash, 1);
      
      setSuccess(`NFT đã được mint thành công! Hash: ${transactionHash}`);
      
      // Step 3: Confirm mint in backend
      const confirmResponse = await fetch(`http://localhost:5000/api/products/${product.id}/mint/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenId: tokenId,
          contractAddress: contractAddress,
          transactionHash: transactionHash,
          mintedQuantity: quantity,
          chainId: mintParams.chainId || BLOCKCHAIN_CONFIG.CHAIN_ID,
          toAddress: account,
        }),
      });

      if (!confirmResponse.ok) {
        const errorData = await confirmResponse.json();
        throw new Error(errorData.error || 'Lỗi khi xác nhận mint');
      }

      const result = await confirmResponse.json();
      setSuccess(`Mint NFT thành công! Transaction hash: ${result.transactionHash}`);
      
      // Call success callback
      if (onMintSuccess) {
        onMintSuccess(transactionHash);
      }
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Package className="w-6 h-6 mr-2 text-blue-600" />
              Mint NFT
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Product Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-4">
              {product.images && product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                <div className="flex items-center mt-2">
                  <Coins className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">
                    {product.pricePerUnit} {product.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mint Form */}
          <form onSubmit={handleMintNFT} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượng NFT
              </label>
              <input
                type="number"
                name="quantity"
                value={mintData.quantity}
                onChange={handleInputChange}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metadata URI (tùy chọn)
              </label>
              <input
                type="url"
                name="metadataUri"
                value={mintData.metadataUri}
                onChange={handleInputChange}
                placeholder="https://agrichain.com/metadata/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 text-red-700 px-4 py-3 rounded-md text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 text-green-700 px-4 py-3 rounded-md text-sm"
              >
                {success}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading || !isConnected}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Mint NFT'
                )}
              </button>
            </div>
          </form>

          {/* Blockchain Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Thông tin Blockchain</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center">
                <Hash className="w-4 h-4 mr-2" />
                <span>Network: BSC Testnet</span>
              </div>
              <div className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                <a
                  href={`${BLOCKCHAIN_CONFIG.EXPLORER_URL}/address/${BLOCKCHAIN_CONFIG.NFT_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Xem Contract trên BSCScan
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MintNFTModal;

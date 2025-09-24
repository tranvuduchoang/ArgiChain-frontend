import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      on: (event: string, callback: () => void) => void;
      removeListener: (event: string, callback: () => void) => void;
      request: (args: any) => Promise<any>;
    };
  }
}

// Network configurations with their native currencies
const NETWORK_CURRENCIES: { [key: string]: string } = {
  '0x1': 'ETH',           // Ethereum Mainnet
  '0x11155111': 'SepoliaETH', // Sepolia Testnet
  '0x89': 'MATIC',        // Polygon Mainnet
  '0x13881': 'MATIC',     // Polygon Mumbai Testnet
  '0x44d': 'ETH',         // Polygon Cardona Testnet
  '0x61': 'tBNB',         // BSC Testnet
  '0x38': 'BNB',          // BSC Mainnet
  '0xaa36a7': 'SepoliaETH', // Sepolia Testnet (alternative)
  '0x1a4': 'ETH',         // Optimism Goerli
  '0x66eed': 'ETH',       // Arbitrum Goerli
};

export const useNetworkCurrency = () => {
  const { isConnected, account } = useWallet();
  const [currency, setCurrency] = useState<string>('tBNB'); // Default fallback
  const [networkName, setNetworkName] = useState<string>('BSC Testnet');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const detectNetwork = async () => {
      // Check if we're on client side and ethereum is available
      if (typeof window === 'undefined' || !window.ethereum || !isConnected) {
        setCurrency('tBNB');
        setNetworkName('BSC Testnet');
        return;
      }

      setIsLoading(true);
      
      try {
        // Dynamic import ethers to avoid SSR issues
        const { ethers } = await import('ethers');
        
        // Get current network
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const chainId = '0x' + network.chainId.toString(16);
        
        console.log('🔍 Detected network chainId:', chainId);
        console.log('🔍 Network name:', network.name);
        
        // Get currency for this network
        const detectedCurrency = NETWORK_CURRENCIES[chainId] || 'tBNB';
        const detectedNetworkName = network.name || 'Unknown Network';
        
        console.log('💰 Detected currency:', detectedCurrency);
        console.log('🌐 Detected network:', detectedNetworkName);
        
        setCurrency(detectedCurrency);
        setNetworkName(detectedNetworkName);
        
      } catch (error) {
        console.error('❌ Error detecting network:', error);
        // Fallback to BSC Testnet
        setCurrency('tBNB');
        setNetworkName('BSC Testnet');
      } finally {
        setIsLoading(false);
      }
    };

    detectNetwork();

    // Listen for network changes
    const handleNetworkChange = () => {
      detectNetwork();
    };

    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('chainChanged', handleNetworkChange);
      
      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('chainChanged', handleNetworkChange);
        }
      };
    }
  }, [isConnected, account]);

  return {
    currency,
    networkName,
    isLoading
  };
};

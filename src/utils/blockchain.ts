// Blockchain configuration for AgriChain
export const BLOCKCHAIN_CONFIG = {
  // Cardona zkEVM Testnet
  CHAIN_ID: 2442,
  CHAIN_NAME: 'Cardona zkEVM Testnet',
  RPC_URL: 'https://rpc.cardona.zkevm-rpc.com',
  EXPLORER_URL: 'https://mumbai.polygonscan.com', // Cập nhật nếu có explorer riêng cho Cardona
  
  // Contract addresses (will be updated after deployment)
  TOKEN_ADDRESS: '', // ERC-20 token address
  NFT_ADDRESS: '', // ERC-1155 NFT address
  MARKETPLACE_ADDRESS: '', // Marketplace contract address
  
  // Network configuration
  NETWORK_CONFIG: {
    chainId: '0x98a', // 2442 in hex
    chainName: 'Cardona zkEVM Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.cardona.zkevm-rpc.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'], // Cập nhật nếu có explorer riêng cho Cardona
  },
};

// MetaMask connection utilities
export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      // Switch to Mumbai testnet
      await switchToMumbai();
      
      return accounts[0];
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw error;
    }
  } else {
    throw new Error('MetaMask is not installed');
  }
};

export const switchToMumbai = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BLOCKCHAIN_CONFIG.NETWORK_CONFIG.chainId }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BLOCKCHAIN_CONFIG.NETWORK_CONFIG],
        });
      } catch (addError) {
        console.error('Error adding Mumbai network:', addError);
        throw addError;
      }
    } else {
      throw switchError;
    }
  }
};

// Check if wallet is connected
export const isWalletConnected = async (): Promise<boolean> => {
  if (typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    return accounts.length > 0;
  }
  return false;
};

// Get current account
export const getCurrentAccount = async (): Promise<string | null> => {
  if (typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    return accounts[0] || null;
  }
  return null;
};

// Get account balance
export const getAccountBalance = async (address: string): Promise<string> => {
  if (typeof window.ethereum !== 'undefined') {
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
    return balance;
  }
  return '0';
};

// Format balance from wei to MATIC
export const formatBalance = (balance: string): string => {
  const wei = BigInt(balance);
  const matic = Number(wei) / Math.pow(10, 18);
  return matic.toFixed(4);
};

// Declare global ethereum object
declare global {
  interface Window {
    ethereum?: any;
  }
} 
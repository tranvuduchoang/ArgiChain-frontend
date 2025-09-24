// Blockchain configuration for AgriChain
export const BLOCKCHAIN_CONFIG = {
  // BSC Testnet
  CHAIN_ID: 97,
  CHAIN_NAME: 'BSC Testnet',
  RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  EXPLORER_URL: 'https://testnet.bscscan.com',
  
  // Contract addresses (from .env)
  TOKEN_ADDRESS: (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_AGRICHAIN_TOKEN_ADDRESS : undefined) || '0x0a5123a377A87321975578ED3C8D3336eF67F28a',
  NFT_ADDRESS: (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_AGRICHAIN_NFT_ADDRESS : undefined) || '0x739ECFc4a3C66e1E0b14B4581C5dA3341586a4E4',
  MARKETPLACE_ADDRESS: (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_AGRICHAIN_MARKETPLACE_ADDRESS : undefined) || '0xf88559b87f94FF07c6c4297E7D04ab10573e9d62',
  
  // Network configuration
  NETWORK_CONFIG: {
    chainId: '0x61', // 97 in hex
    chainName: 'BSC Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
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
      
      // Switch to BSC testnet
      await switchToBSC();
      
      return accounts[0];
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw error;
    }
  } else {
    throw new Error('MetaMask is not installed');
  }
};

export const switchToBSC = async () => {
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
        console.error('Error adding BSC Testnet network:', addError);
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
    try {
      // Import ethers dynamically
      const { ethers } = await import('ethers');
      
      // Get provider from MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Get balance
      const balance = await provider.getBalance(address);
      return balance.toString();
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }
  return '0';
};

// Format balance from wei to BNB
export const formatBalance = (balance: string): string => {
  try {
    // Manual calculation for now
    const wei = BigInt(balance);
    const bnb = Number(wei) / Math.pow(10, 18);
    return bnb.toFixed(4);
  } catch (error) {
    console.error('Error formatting balance:', error);
    return '0.0000';
  }
};

// NFT Minting utilities
export const mintNFT = async (
  contractAddress: string,
  to: string,
  tokenId: number,
  quantity: number,
  data: string = '0x'
): Promise<string> => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  try {
    // Import ethers dynamically
    const { ethers } = await import('ethers');
    
    // Get provider from MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // Get contract ABI (simplified for ERC1155 mint)
    const contractABI = [
      {
        "inputs": [
          {"internalType": "address", "name": "to", "type": "address"},
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "uint256", "name": "amount", "type": "uint256"},
          {"internalType": "bytes", "name": "data", "type": "bytes"}
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    // Create contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Call mint function
    const tx = await contract.mint(to, tokenId, quantity, data, {
      gasLimit: 500000, // Gas limit
    });

    return tx.hash;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
};

// Get transaction receipt
export const getTransactionReceipt = async (txHash: string) => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  try {
    // Import ethers dynamically
    const { ethers } = await import('ethers');
    
    // Get provider from MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    // Get transaction receipt
    const receipt = await provider.getTransactionReceipt(txHash);
    return receipt;
  } catch (error) {
    console.error('Error getting transaction receipt:', error);
    throw error;
  }
};

// Wait for transaction confirmation
export const waitForTransaction = async (txHash: string, confirmations: number = 1): Promise<any> => {
  try {
    // Import ethers dynamically
    const { ethers } = await import('ethers');
    
    // Get provider from MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    // Wait for transaction confirmation
    const receipt = await provider.waitForTransaction(txHash, confirmations);
    
    if (receipt && receipt.status === 1) {
      return receipt;
    } else {
      throw new Error('Transaction failed');
    }
  } catch (error) {
    console.error('Error waiting for transaction:', error);
    throw error;
  }
};

// Declare global ethereum object
declare global {
  interface Window {
    ethereum?: any;
  }
} 
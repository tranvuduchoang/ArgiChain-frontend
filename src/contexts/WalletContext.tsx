'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  connectWallet, 
  isWalletConnected, 
  getCurrentAccount, 
  getAccountBalance, 
  formatBalance 
} from '@/utils/blockchain';

interface WalletContextType {
  isConnected: boolean;
  account: string | null;
  balance: string;
  connect: () => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  // Check wallet connection on mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected wallet
          setIsConnected(false);
          setAccount(null);
          setBalance('0');
        } else {
          // User switched accounts
          setAccount(accounts[0]);
          updateBalance(accounts[0]);
        }
      };

      const handleChainChanged = () => {
        // Reload page when chain changes
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const checkWalletConnection = async () => {
    try {
      const connected = await isWalletConnected();
      if (connected) {
        const currentAccount = await getCurrentAccount();
        if (currentAccount) {
          setIsConnected(true);
          setAccount(currentAccount);
          await updateBalance(currentAccount);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const updateBalance = async (address: string) => {
    try {
      const balanceWei = await getAccountBalance(address);
      const formattedBalance = formatBalance(balanceWei);
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const connect = async () => {
    setIsLoading(true);
    try {
      const connectedAccount = await connectWallet();
      setIsConnected(true);
      setAccount(connectedAccount);
      await updateBalance(connectedAccount);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAccount(null);
    setBalance('0');
  };

  const value: WalletContextType = {
    isConnected,
    account,
    balance,
    connect,
    disconnect,
    isLoading,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 
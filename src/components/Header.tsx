'use client';

import React, { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, User, Globe, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { isConnected, account, balance, connect, disconnect, isLoading } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'VI'>('EN');

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      // You can add a toast notification here
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'VI' : 'EN');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600">
                AgriChain
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {language === 'EN' ? 'Home' : 'Trang chủ'}
            </a>
            <a
              href="/marketplace"
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Marketplace
            </a>
            <a
              href="/suppliers"
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {language === 'EN' ? 'Suppliers' : 'Nhà cung cấp'}
            </a>
          </nav>

          {/* Right side - Language and Wallet */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Globe size={16} />
              <span>{language}</span>
            </button>

            {/* Wallet Connection */}
            <div className="hidden md:block">
              {isConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {formatAddress(account!)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {balance} MATIC
                    </div>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <User size={16} />
                    <span>{language === 'EN' ? 'Disconnect' : 'Ngắt kết nối'}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  disabled={isLoading}
                  className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <Wallet size={16} />
                  <span>
                    {isLoading 
                      ? (language === 'EN' ? 'Connecting...' : 'Đang kết nối...')
                      : (language === 'EN' ? 'Connect Wallet' : 'Kết nối ví')
                    }
                  </span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <a
                href="/"
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {language === 'EN' ? 'Home' : 'Trang chủ'}
              </a>
              <a
                href="/marketplace"
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Marketplace
              </a>
              <a
                href="/suppliers"
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {language === 'EN' ? 'Suppliers' : 'Nhà cung cấp'}
              </a>
              
              {/* Mobile Wallet Connection */}
              <div className="pt-4 border-t border-gray-200">
                {isConnected ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      {formatAddress(account!)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {balance} MATIC
                    </div>
                    <button
                      onClick={handleDisconnect}
                      className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium w-full justify-center"
                    >
                      <User size={16} />
                      <span>{language === 'EN' ? 'Disconnect' : 'Ngắt kết nối'}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleConnectWallet}
                    disabled={isLoading}
                    className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium w-full justify-center"
                  >
                    <Wallet size={16} />
                    <span>
                      {isLoading 
                        ? (language === 'EN' ? 'Connecting...' : 'Đang kết nối...')
                        : (language === 'EN' ? 'Connect Wallet' : 'Kết nối ví')
                      }
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
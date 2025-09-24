'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useNetworkCurrency } from '@/hooks/useNetworkCurrency';
import LanguageSwitcher from './LanguageSwitcher';
import NetworkInfo from './NetworkInfo';
import { Wallet, User, Globe, Menu, X, ChevronDown, Package, Plus, Settings, LogOut, ShoppingBag } from 'lucide-react';

const Header: React.FC = () => {
  const { isConnected, account, balance, connect, disconnect, isLoading } = useWallet();
  const { t } = useTranslation();
  const { currency, networkName } = useNetworkCurrency();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [supplierData, setSupplierData] = useState<any>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

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
    setIsUserMenuOpen(false);
  };

  const handleBecomeSupplier = () => {
    window.location.href = '/createsupplier';
    setIsUserMenuOpen(false);
  };

  const handleSupplierDashboard = () => {
    window.location.href = '/supplier/dashboard';
    setIsUserMenuOpen(false);
  };


  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Check supplier status when wallet connects
  useEffect(() => {
    const checkSupplierStatus = async () => {
      if (isConnected && account) {
        try {
          const response = await fetch(`http://localhost:5000/api/suppliers?walletAddress=${account}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const suppliers = await response.json();
            if (suppliers && Array.isArray(suppliers) && suppliers.length > 0) {
              setIsSupplier(true);
              setSupplierData(suppliers[0]);
            } else {
              setIsSupplier(false);
              setSupplierData(null);
            }
          } else {
            console.warn('Failed to fetch supplier status:', response.status);
            setIsSupplier(false);
            setSupplierData(null);
          }
        } catch (error) {
          console.error('Error checking supplier status:', error);
          setIsSupplier(false);
          setSupplierData(null);
        }
      } else {
        setIsSupplier(false);
        setSupplierData(null);
      }
    };

    checkSupplierStatus();
  }, [isConnected, account]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold ui-gradient-text">
                AgriChain
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-green-600 hover:underline underline-offset-4 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
{t('navigation.home')}
            </a>
            <a
              href="/marketplace"
              className="text-gray-700 hover:text-green-600 hover:underline underline-offset-4 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
{t('navigation.marketplace')}
            </a>
            <a
              href="/suppliers"
              className="text-gray-700 hover:text-green-600 hover:underline underline-offset-4 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
{t('navigation.suppliers')}
            </a>
            {isConnected && (
              <a
                href="/supplier/dashboard"
                className="text-gray-700 hover:text-green-600 hover:underline underline-offset-4 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
{t('common.dashboard')}
              </a>
            )}
          </nav>

          {/* Right side - Language, Network Info and Wallet */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageSwitcher />
            
            {/* Network Info */}
            <NetworkInfo className="hidden lg:block" />

            {/* Wallet Connection */}
            <div className="hidden md:block">
              {isConnected ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="ui-focus-ring flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {formatAddress(account!)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {balance} {currency}
                      </div>
                    </div>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">Wallet Address</div>
                        <div className="text-xs text-gray-500 font-mono">{account}</div>
                      </div>
                      
                      <div className="py-2">
                        {isSupplier ? (
                          <button
                            onClick={handleSupplierDashboard}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Package size={16} />
                            <span>{t('auth.yourSupplier')}</span>
                          </button>
                        ) : (
                          <button
                            onClick={handleBecomeSupplier}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={16} />
                            <span>{t('auth.becomeSupplier')}</span>
                          </button>
                        )}
                        
                        <button
                          onClick={() => window.location.href = '/purchased-products'}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <ShoppingBag size={16} />
                          <span>{t('navigation.purchasedProducts')}</span>
                        </button>
                        
                        <button
                          onClick={handleDisconnect}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} />
                          <span>{t('auth.disconnectWallet')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  disabled={isLoading}
                  className="ui-focus-ring flex items-center space-x-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <Wallet size={16} />
                  <span>
                    {isLoading 
                      ? t('common.connecting')
                      : t('auth.connectWallet')
                    }
                  </span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ui-focus-ring text-gray-700 hover:text-green-600 p-2"
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
                className="text-gray-700 hover:text-green-600 hover:underline underline-offset-4 block px-3 py-2 rounded-md text-base font-medium"
              >
  {t('navigation.home')}
              </a>
              <a
                href="/marketplace"
                className="text-gray-700 hover:text-green-600 hover:underline underline-offset-4 block px-3 py-2 rounded-md text-base font-medium"
              >
{t('navigation.marketplace')}
              </a>
              <a
                href="/suppliers"
                className="text-gray-700 hover:text-green-600 hover:underline underline-offset-4 block px-3 py-2 rounded-md text-base font-medium"
              >
  {t('navigation.suppliers')}
              </a>
              {isConnected && (
                <a
                  href="/supplier/dashboard"
                  className="text-gray-700 hover:text-green-600 hover:underline underline-offset-4 block px-3 py-2 rounded-md text-base font-medium"
                >
  {t('common.dashboard')}
                </a>
              )}
              
              {/* Mobile Wallet Connection */}
              <div className="pt-4 border-t border-gray-200">
                {isConnected ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {formatAddress(account!)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {balance} {currency}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {isSupplier ? (
                        <button
                          onClick={handleSupplierDashboard}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Package size={16} />
                            <span>{t('auth.yourSupplier')}</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleBecomeSupplier}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Plus size={16} />
                          <span>Trở thành nhà cung cấp</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => window.location.href = '/profile'}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Settings size={16} />
                        <span>{t('navigation.profile')}</span>
                      </button>
                      
                      <button
                        onClick={handleDisconnect}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Ngắt kết nối</span>
                      </button>
                    </div>
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
                        ? t('common.connecting')
                        : t('auth.connectWallet')
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

'use client';

import React from 'react';
import { useNetworkCurrency } from '@/hooks/useNetworkCurrency';
import { Wifi, WifiOff } from 'lucide-react';

interface NetworkInfoProps {
  className?: string;
}

const NetworkInfo: React.FC<NetworkInfoProps> = ({ className = '' }) => {
  const { currency, networkName, isLoading } = useNetworkCurrency();

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-gray-500 ${className}`}>
        <Wifi className="w-4 h-4 animate-pulse" />
        <span>Detecting network...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 text-sm ${className}`}>
      <Wifi className="w-4 h-4 text-green-500" />
      <span className="text-gray-700">
        {networkName} ({currency})
      </span>
    </div>
  );
};

export default NetworkInfo;

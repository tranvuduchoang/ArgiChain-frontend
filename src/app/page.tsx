'use client';

import React from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { 
  Leaf, 
  Shield, 
  Users, 
  Zap, 
  ArrowRight, 
  Star,
  ShoppingCart,
  Award
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { isConnected, connect } = useWallet();

  const handleGetStarted = async () => {
    if (!isConnected) {
      try {
        await connect();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Fresh Agricultural Products",
      description: "Direct connection between farmers and consumers, ensuring fresh and quality products."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Blockchain Security",
      description: "Transparent and secure transactions using Polygon blockchain technology."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Trusted Suppliers",
      description: "Verified farmers and suppliers with transparent product information."
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "Fast Transactions",
      description: "Quick and efficient crypto payments with instant confirmation."
    }
  ];

  const stats = [
    { number: "100+", label: "Verified Suppliers" },
    { number: "1000+", label: "Products Listed" },
    { number: "5000+", label: "Happy Customers" },
    { number: "99.9%", label: "Transaction Success" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="ui-gradient-text">AgriChain</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The future of agricultural commerce is here. Connect directly with farmers, 
              buy fresh products with crypto, and experience the power of blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="ui-cta-gradient text-white px-8 py-3 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="/marketplace"
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors cursor-pointer"
              >
                Explore Marketplace
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AgriChain?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the benefits of decentralized agricultural commerce
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AgriChain in Numbers
            </h2>
            <p className="text-xl text-green-100">
              Growing community of farmers and consumers
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to start trading agricultural products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Connect Wallet
              </h3>
              <p className="text-gray-600">
                Connect your MetaMask wallet to access the marketplace
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Browse Products
              </h3>
              <p className="text-gray-600">
                Explore fresh agricultural products from verified suppliers
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Buy & Collect
              </h3>
              <p className="text-gray-600">
                Purchase with crypto and collect your products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers and consumers already using AgriChain
          </p>
          <button
            onClick={handleGetStarted}
            className="ui-cta-gradient text-white px-8 py-3 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 mx-auto transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Start Trading Now</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

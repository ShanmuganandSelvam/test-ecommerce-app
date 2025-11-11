import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">ShopHub</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-800 hover:text-primary-600 font-medium">Home</a>
            <a href="/products" className="text-primary-600 border-b-2 border-primary-600 font-medium">Products</a>
            <a href="/categories" className="text-gray-800 hover:text-primary-600 font-medium">Categories</a>
            <a href="/deals" className="text-gray-800 hover:text-primary-600 font-medium">Deals</a>
            <a href="/about" className="text-gray-800 hover:text-primary-600 font-medium">About</a>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-primary-600">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-primary-600">
              <User size={20} />
            </button>
            <button className="relative text-gray-600 hover:text-primary-600">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-gray-800 hover:text-primary-600 font-medium">Home</a>
              <a href="/products" className="text-primary-600 font-medium">Products</a>
              <a href="/categories" className="text-gray-800 hover:text-primary-600 font-medium">Categories</a>
              <a href="/deals" className="text-gray-800 hover:text-primary-600 font-medium">Deals</a>
              <a href="/about" className="text-gray-800 hover:text-primary-600 font-medium">About</a>
            </nav>
            
            <div className="flex items-center space-x-6 mt-6 pt-4 border-t">
              <button className="flex items-center text-gray-600 hover:text-primary-600">
                <Search size={20} />
                <span className="ml-2">Search</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-primary-600">
                <User size={20} />
                <span className="ml-2">Account</span>
              </button>
              <button className="relative flex items-center text-gray-600 hover:text-primary-600">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                <span className="ml-2">Cart</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

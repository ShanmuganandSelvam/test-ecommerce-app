import { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
      {/* Product Image with Overlay */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="bg-white text-primary-600 p-2 rounded-full hover:bg-primary-600 hover:text-white transition-colors">
            <ShoppingCart size={20} />
          </button>
          <button 
            className={`p-2 rounded-full transition-colors ${
              isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-800 hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <span className="font-bold text-lg text-gray-900">
              {formatPrice(product.price * (1 - product.discount / 100))}
            </span>
          </div>
          
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

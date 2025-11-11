import { useState } from 'react';
import { ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react';
import { Product } from '../types/product';

interface ProductListItemProps {
  product: Product;
}

export function ProductListItem({ product }: ProductListItemProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row">
      {/* Product Image */}
      <div className="relative w-full sm:w-48 h-48">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="flex-grow p-4 flex flex-col">
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
        
        <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
        
        {/* Price, Quantity and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
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
          
          <div className="flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button 
                onClick={decrementQuantity}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Minus size={16} />
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    setQuantity(val);
                  }
                }}
                className="w-12 text-center border-x border-gray-300 py-1"
              />
              <button 
                onClick={incrementQuantity}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            
            {/* Action Buttons */}
            <button 
              className={`p-2 rounded-full transition-colors ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

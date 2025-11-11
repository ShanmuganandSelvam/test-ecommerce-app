import { useState } from 'react';
import { Slider } from '../components/ui/Slider';

interface FilterSidebarProps {
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

export function FilterSidebar({ categories, activeCategory, setActiveCategory }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  
  const handleRatingToggle = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 sticky top-24">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="category-all"
              name="category"
              checked={activeCategory === null}
              onChange={() => setActiveCategory(null)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
              All Categories
            </label>
          </div>
          
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="radio"
                id={`category-${category}`}
                name="category"
                checked={activeCategory === category}
                onChange={() => setActiveCategory(category)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700 capitalize">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
        <Slider 
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={setPriceRange}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">${priceRange[0]}</span>
          <span className="text-sm text-gray-600">${priceRange[1]}</span>
        </div>
      </div>
      
      {/* Ratings */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Ratings</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center">
              <input
                type="checkbox"
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingToggle(rating)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
              />
              <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                {Array.from({ length: rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span className="ml-1">& Up</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Availability */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="in-stock"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
            />
            <label htmlFor="in-stock" className="ml-2 text-sm text-gray-700">
              In Stock
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="on-sale"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
            />
            <label htmlFor="on-sale" className="ml-2 text-sm text-gray-700">
              On Sale
            </label>
          </div>
        </div>
      </div>
      
      {/* Reset Button */}
      <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm font-medium">
        Reset Filters
      </button>
    </div>
  );
}

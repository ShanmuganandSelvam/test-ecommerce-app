import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, ChevronDown, Grid, List } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductListItem } from '../components/ProductListItem';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FilterSidebar } from '../components/FilterSidebar';
import { Product } from '../types/product';
import { fetchProducts } from '../services/productService';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !activeCategory || product.category === activeCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Our Products</h1>
            <p className="text-xl font-light max-w-2xl">
              Discover our premium selection of high-quality products designed to meet your needs.
            </p>
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter size={18} />
                  <span className="hidden sm:inline">Filters</span>
                </button>
                
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'bg-white'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'bg-white'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
                
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <span>Sort By</span>
                    <ChevronDown size={16} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                    <div className="py-1">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Price: Low to High</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Price: High to Low</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Newest First</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Popularity</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button 
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeCategory === null 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeCategory === category 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar - Only visible when showFilters is true */}
            {showFilters && (
              <div className="md:w-64 flex-shrink-0">
                <FilterSidebar 
                  categories={categories} 
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              </div>
            )}
            
            {/* Products Grid/List */}
            <div className="flex-grow">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map(product => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Floating Cart Button */}
      <button className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-20">
        <ShoppingCart />
      </button>
    </div>
  );
}

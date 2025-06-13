import React, { useState, useEffect } from 'react';
import { Filter, Search, ShoppingCart, Star, ChevronDown, X, Tag, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration - replace with your actual Supabase integration
const mockParts = [
  {
    id: 1,
    name: "Premium Brake Pads",
    description: "High-performance ceramic brake pads for superior stopping power",
    price: 89.99,
    category: "Engine",
    brand: "Toyota",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    isAccessory: false,
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "LED Headlight Kit",
    description: "Ultra-bright LED conversion kit with easy installation",
    price: 129.99,
    category: "Exterior",
    brand: "BMW",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    isAccessory: true,
    rating: 4.6,
    inStock: true
  },
  {
    id: 3,
    name: "Carbon Fiber Spoiler",
    description: "Lightweight carbon fiber rear spoiler for enhanced aerodynamics",
    price: 299.99,
    category: "Exterior",
    brand: "Ford",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=300&fit=crop",
    isAccessory: true,
    rating: 4.9,
    inStock: false
  },
  {
    id: 4,
    name: "Leather Seat Covers",
    description: "Premium genuine leather seat covers with perfect fit",
    price: 199.99,
    category: "Interior",
    brand: "Toyota",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop",
    isAccessory: true,
    rating: 4.7,
    inStock: true
  }
];

const CarPartsPage = () => {
  const [parts, setParts] = useState(mockParts);
  const [filteredParts, setFilteredParts] = useState(mockParts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    brand: 'All',
    minPrice: '',
    maxPrice: '',
    isAccessory: null,
    inStock: false
  });
  const navigate = useNavigate();

  // Simulate API call
  const fetchParts = async () => {
    try {
      setLoading(true);
      let query = supabase.from('car_parts').select('*');

      if (filters.category !== 'All') {
        query = query.eq('category', filters.category);
      }
      if (filters.brand !== 'All') {
        query = query.eq('brand', filters.brand);
      }
      if (filters.isAccessory !== null) {
        query = query.eq('isAccessory', filters.isAccessory);
      }
      if (filters.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setParts(data || []);
    } catch (err) {
      setError('Failed to fetch car parts');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, parts]);

  const applyFilters = () => {
    let filtered = parts.filter(part => {
      const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           part.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filters.category === 'All' || part.category === filters.category;
      const matchesBrand = filters.brand === 'All' || part.brand === filters.brand;
      const matchesAccessory = filters.isAccessory === null || part.isAccessory === filters.isAccessory;
      const matchesStock = !filters.inStock || part.inStock;
      const matchesMinPrice = !filters.minPrice || part.price >= parseFloat(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || part.price <= parseFloat(filters.maxPrice);

      return matchesSearch && matchesCategory && matchesBrand && matchesAccessory && 
             matchesStock && matchesMinPrice && matchesMaxPrice;
    });

    setFilteredParts(filtered);
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      brand: 'All',
      minPrice: '',
      maxPrice: '',
      isAccessory: null,
      inStock: false
    });
    setSearchTerm('');
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== 'All' && value !== '' && value !== null && value !== false
  ).length + (searchTerm ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b z-40 pt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Car Parts & Accessories
              </h1>
              <p className="text-gray-600">Premium quality parts for your vehicle</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search parts..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
            >
              <Filter size={20} className="text-gray-600" />
              <span className="font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown 
                size={16} 
                className={`text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </button>
            
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <X size={16} />
                Clear all
              </button>
            )}
            
            <div className="text-sm text-gray-600 ml-auto">
              {filteredParts.length} parts found
            </div>
          </div>

          {showFilters && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  >
                    <option value="All">All Categories</option>
                    <option value="Engine">Engine</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Interior">Interior</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <select
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  >
                    <option value="All">All Brands</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Ford">Ford</option>
                    <option value="BMW">BMW</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="$0"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="$999+"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filters.isAccessory === null ? 'All' : filters.isAccessory ? 'Yes' : 'No'}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          isAccessory:
                            e.target.value === 'All'
                              ? null
                              : e.target.value === 'Yes'
                        })
                      }
                    >
                      <option value="All">All Types</option>
                      <option value="Yes">Accessories</option>
                      <option value="No">Parts</option>
                    </select>
                  </div>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={filters.inStock}
                      onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                    />
                    <span className="text-sm text-gray-700">In stock only</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 text-lg font-medium mb-2">{error}</div>
            <button 
              onClick={fetchParts}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Try again
            </button>
          </div>
        ) : filteredParts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-500 text-lg mb-4">No parts match your criteria</div>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters to see all parts
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredParts.map((part) => (
              <div
                key={part.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                
                  {part.isAccessory && (
                    <div className="absolute top-3 right-3 bg-purple-500 text-white p-1.5 rounded-full">
                      <Tag size={12} />
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {part.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {part.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">{part.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {part.brand}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${part.price}
                      </span>
                    </div>
                    <button
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                       true
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => navigate('/checkout', { state: { part } })}

                    >
                      <ShoppingCart size={16} />
                      {'Buy Now' }
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarPartsPage;
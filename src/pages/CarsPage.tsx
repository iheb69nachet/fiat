import React, { useState, useEffect } from 'react';
import { Car } from '../types/Car';
import CarCard from '../components/CarCard';
import { SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    make: 'All',
    model: 'All',
    minPrice: '',
    maxPrice: '',
    year: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchCars = async () => {
    try {
      setLoading(true);
      let query = supabase.from('cars').select('*');

      if (filters.make !== 'All') {
        query = query.eq('make', filters.make);
      }

      if (filters.model !== 'All') {
        query = query.eq('model', filters.model);
      }

      if (filters.minPrice) {
        query = query.gte('price', Number(filters.minPrice));
      }

      if (filters.maxPrice) {
        query = query.lte('price', Number(filters.maxPrice));
      }

      if (filters.year !== 'All') {
        query = query.eq('year', Number(filters.year));
      }

      const { data, error: queryError } = await query;

      if (queryError) throw queryError;
      setCars(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters]);

  return (
    <div className="pt-24 container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Cars</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <select
            value={filters.make}
            onChange={(e) => setFilters({ ...filters, make: e.target.value })}
            className="border rounded-md p-2"
          >
            <option value="All">All Makes</option>
            {/* Add your make options here */}
          </select>

          <select
            value={filters.model}
            onChange={(e) => setFilters({ ...filters, model: e.target.value })}
            className="border rounded-md p-2"
          >
            <option value="All">All Models</option>
            {/* Add your model options here */}
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="border rounded-md p-2"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="border rounded-md p-2"
          />

          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            className="border rounded-md p-2"
          >
            <option value="All">All Years</option>
            {/* Add your year options here */}
          </select>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD1D21]"></div>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Error Loading Cars</h2>
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsPage;
import React, { useState, useEffect } from 'react';
import { getCars } from '../data/cars';
import { Car } from '../types/Car';
import CarCard from '../components/CarCard';
import { SlidersHorizontal } from 'lucide-react';

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState({
    make: 'All',
    model: 'All',
    minPrice: '',
    maxPrice: '',
    year: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Get cars data
    const allCars = getCars();
    setCars(allCars);
    setFilteredCars(allCars);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = cars;

    if (filters.make !== 'All') {
      result = result.filter(car => car.make === filters.make);
    }

    if (filters.model !== 'All') {
      result = result.filter(car => car.model === filters.model);
    }

    if (filters.minPrice) {
      result = result.filter(car => car.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter(car => car.price <= Number(filters.maxPrice));
    }

    if (filters.year !== 'All') {
      result = result.filter(car => car.year === Number(filters.year));
    }

    setFilteredCars(result);
  }, [filters, cars]);

  // Get unique makes, models, and years for filters
  const makes = ['All', ...new Set(cars.map(car => car.make))];
  const models = ['All', ...new Set(cars.map(car => car.model))];
  const years = ['All', ...new Set(cars.map(car => car.year.toString()))];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      make: 'All',
      model: 'All',
      minPrice: '',
      maxPrice: '',
      year: 'All'
    });
  };

  return (
    <div className="page-transition pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Our Cars</h1>
        <p className="text-gray-600 mb-8">Explore our range of FIAT models</p>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
          >
            <SlidersHorizontal size={20} />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className={`
            lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit
            ${showFilters ? 'block' : 'hidden lg:block'}
          `}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                  <select
                    name="make"
                    value={filters.make}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3"
                  >
                    {makes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <select
                    name="model"
                    value={filters.model}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3"
                  >
                    {models.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      placeholder="Min"
                      className="w-1/2 rounded-md border border-gray-300 py-2 px-3"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      placeholder="Max"
                      className="w-1/2 rounded-md border border-gray-300 py-2 px-3"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full mt-6 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Car listings */}
          <div className="lg:w-3/4">
            {filteredCars.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                <p className="text-gray-600 mb-4">No cars match your current filter criteria.</p>
                <button
                  onClick={resetFilters}
                  className="bg-[#DD1D21] text-white py-2 px-6 rounded-md hover:bg-[#B51419] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
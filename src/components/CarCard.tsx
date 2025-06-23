import React from 'react';
import { Link } from 'react-router-dom';
import { Car as CarType } from '../types/Car';
import { ArrowRight } from 'lucide-react';

interface CarCardProps {
  car: CarType;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="car-card bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative overflow-hidden h-48 sm:h-64">
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {car.isNew && (
          <div className="absolute top-0 right-0 bg-[#DD1D21] text-white px-3 py-1 font-medium text-sm">
            New
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{car.make} {car.model}</h3>
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-[#DD1D21]">{car.price.toLocaleString()} DT</span>
          {car.msrp && car.msrp > car.price && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              {car.msrp.toLocaleString()} DT
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Engine</span>
            <span className="font-medium">{car.engine}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Transmission</span>
            <span className="font-medium">{car.transmission}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">MPG</span>
            <span className="font-medium">{car.mpg}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Year</span>
            <span className="font-medium">{car.year}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <Link 
            to={`/cars/${car.id}`}
            className="flex-1 bg-[#DD1D21] text-white py-2 px-4 rounded-md font-medium text-center hover:bg-[#B51419] transition-colors"
          >
            View Details
          </Link>
          <Link 
            to={`/test-drive?carId=${car.id}`}
            className="flex items-center justify-center border-2 border-[#DD1D21] text-[#DD1D21] py-2 px-4 rounded-md font-medium hover:bg-[#DD1D21] hover:text-white transition-colors"
          >
            Test Drive
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
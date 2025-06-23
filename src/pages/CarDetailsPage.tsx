import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Car } from '../types/Car';
import {
  Clock,
  Fuel,
  Gauge,
  RotateCw,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const CarDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<{ title: string, description: string } | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCar(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const nextImage = () => {
    if (car?.images?.length) {
      setCurrentImageIndex((currentImageIndex + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car?.images?.length) {
      setCurrentImageIndex((currentImageIndex - 1 + car.images.length) % car.images.length);
    }
  };

  const openFeatureModal = (title: string, description: string) => {
    setSelectedFeature({ title, description });
    setShowFeatureModal(true);
  };

  if (loading) return <div className="pt-24 pb-16 text-center">Loading...</div>;
  if (error) return <div className="pt-24 pb-16 text-center text-red-600">{error}</div>;
  if (!car) return <div className="pt-24 pb-16 text-center">No car found.</div>;

  return (
    <div className="page-transition pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-[#DD1D21]">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/cars" className="hover:text-[#DD1D21]">Cars</Link>
            <span className="mx-2">/</span>
            <span className="text-[#DD1D21]">{car.make} {car.model}</span>
          </div>
        </div>

        {/* Title & Price */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{car.year} {car.make} {car.model}</h1>
            <p className="text-gray-600">{car.trim}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-3xl font-bold text-[#DD1D21]">{car.price.toLocaleString()} DT</div>
            {car.msrp && car.msrp > car.price && (
              <div className="text-gray-500 line-through text-lg">{car.msrp.toLocaleString()} DT</div>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative">
            <div className="relative h-64 md:h-96 bg-gray-100">
              <img
                src={car.images[currentImageIndex]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="flex overflow-x-auto py-2 px-1 bg-gray-100">
              {car.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`
                    flex-shrink-0 w-20 h-16 mx-1 border-2 cursor-pointer
                    ${currentImageIndex === idx ? 'border-[#DD1D21]' : 'border-transparent'}
                  `}
                >
                  <img
                    src={img}
                    alt={`${car.make} ${car.model} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center">
                  <Fuel size={24} className="text-[#DD1D21] mb-2" />
                  <span className="text-sm text-gray-500">Engine</span>
                  <span className="font-medium">{car.engine}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCw size={24} className="text-[#DD1D21] mb-2" />
                  <span className="text-sm text-gray-500">Transmission</span>
                  <span className="font-medium">{car.transmission}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Gauge size={24} className="text-[#DD1D21] mb-2" />
                  <span className="text-sm text-gray-500">MPG</span>
                  <span className="font-medium">{car.mpg}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Clock size={24} className="text-[#DD1D21] mb-2" />
                  <span className="text-sm text-gray-500">Year</span>
                  <span className="font-medium">{car.year}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">{car.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Ready to Experience This Car?</h3>
              <div className="space-y-3">
                <Link
                  to={`/test-drive?carId=${car.id}`}
                  className="flex items-center justify-center w-full bg-[#DD1D21] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#B51419] transition-colors"
                >
                  Schedule a Test Drive
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <a
                  href="tel:+1800FIATUSA"
                  className="flex items-center justify-center w-full border-2 border-[#DD1D21] text-[#DD1D21] py-3 px-4 rounded-md font-semibold hover:bg-red-50 transition-colors"
                >
                  Call for Inquiry
                </a>
              </div>
            </div>

            <div className="bg-[#DD1D21] bg-opacity-10 rounded-lg p-6 border border-[#DD1D21]">
              <h3 className="text-xl font-bold mb-2 text-[#DD1D21]">Special Offer</h3>
              <p className="text-gray-700 mb-3">
                0% APR Financing for 60 months on select new FIAT models.
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Offer valid until {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <Link
                to="#"
                className="flex items-center text-[#DD1D21] font-semibold hover:underline"
              >
                View Details <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Modal */}
      {showFeatureModal && selectedFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-3">{selectedFeature.title}</h3>
            <p className="text-gray-600 mb-6">{selectedFeature.description}</p>
            <button
              onClick={() => setShowFeatureModal(false)}
              className="w-full bg-[#DD1D21] text-white py-2 rounded-md hover:bg-[#B51419] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsPage;

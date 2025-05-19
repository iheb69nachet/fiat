import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Wrench, Calendar, Car } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Car as CarType } from '../types/Car';
import CarCard from '../components/CarCard';

const HomePage: React.FC = () => {
  const [featuredCars, setFeaturedCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('featured', true)
        .limit(3);

      if (error) throw error;

      setFeaturedCars(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/11188047/pexels-photo-11188047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 z-10 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Experience Italian Excellence</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover the perfect blend of style, performance, and innovation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/cars"
              className="bg-[#DD1D21] text-white py-3 px-8 rounded-md font-semibold text-lg hover:bg-[#B51419] transition-colors"
            >
              Explore Our Cars
            </Link>
            <Link 
              to="/test-drive"
              className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-md font-semibold text-lg hover:bg-white hover:text-[#DD1D21] transition-colors"
            >
              Book a Test Drive
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Featured Models</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our latest models that combine Italian design with innovative technology.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD1D21]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/cars"
              className="inline-flex items-center text-[#DD1D21] font-semibold hover:underline"
            >
              View All Models <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a range of services to keep your FIAT running smoothly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Test Drive Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-[#DD1D21] flex items-center justify-center">
                <Car className="h-20 w-20 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Test Drive</h3>
                <p className="text-gray-600 mb-4">
                  Experience the joy of driving a FIAT. Book a test drive at your convenience.
                </p>
                <Link 
                  to="/test-drive"
                  className="inline-flex items-center text-[#DD1D21] font-semibold hover:underline"
                >
                  Book Now <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Maintenance Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-[#333333] flex items-center justify-center">
                <Wrench className="h-20 w-20 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Maintenance & Repair</h3>
                <p className="text-gray-600 mb-4">
                  Keep your FIAT in perfect condition with our professional service.
                </p>
                <Link 
                  to="/service"
                  className="inline-flex items-center text-[#DD1D21] font-semibold hover:underline"
                >
                  Schedule Service <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Service Appointments Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-[#555555] flex items-center justify-center">
                <Calendar className="h-20 w-20 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Service Appointments</h3>
                <p className="text-gray-600 mb-4">
                  Convenient online scheduling for all your service needs.
                </p>
                <Link 
                  to="/service"
                  className="inline-flex items-center text-[#DD1D21] font-semibold hover:underline"
                >
                  Book Appointment <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="relative py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/11188054/pexels-photo-11188054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 z-10 relative text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience FIAT?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our showroom or book a test drive to experience the joy of driving a FIAT.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/test-drive"
              className="bg-[#DD1D21] text-white py-3 px-8 rounded-md font-semibold text-lg hover:bg-[#B51419] transition-colors"
            >
              Book a Test Drive
            </Link>
            <Link 
              to="/cars"
              className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-md font-semibold text-lg hover:bg-white hover:text-[#DD1D21] transition-colors"
            >
              View Our Cars
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
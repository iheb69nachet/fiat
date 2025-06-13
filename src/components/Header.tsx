import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Car className="h-8 w-8 text-[#DD1D21]" />
            <span className="ml-2 text-2xl font-bold text-[#DD1D21]">FIAT</span>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className={`font-medium ${
                    location.pathname === '/' 
                      ? 'text-[#DD1D21]' 
                      : 'text-black'
                  } hover:text-[#DD1D21] transition-colors`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/cars" 
                  className={`font-medium ${
                    location.pathname === '/cars' 
                      ? 'text-[#DD1D21]' 
                      : 'text-black'
                  } hover:text-[#DD1D21] transition-colors`}
                >
                  Our Cars
                </Link>
              </li>
              <li>
                <Link 
                  to="/car-parts" 
                  className={`font-medium ${
                    location.pathname === '/car-parts' 
                      ? 'text-[#DD1D21]' 
                      : 'text-black'
                  } hover:text-[#DD1D21] transition-colors`}
                >
                  Our Cars Parts
                </Link>
              </li>
              <li>
                <Link 
                  to="/test-drive" 
                  className={`font-medium ${
                    location.pathname === '/test-drive' 
                      ? 'text-[#DD1D21]' 
                      : 'text-black'
                  } hover:text-[#DD1D21] transition-colors`}
                >
                  Test Drive
                </Link>
              </li>
              <li>
                <Link 
                  to="/service" 
                  className={`font-medium ${
                    location.pathname === '/service' 
                      ? 'text-[#DD1D21]' 
                      : 'text-black'
                  } hover:text-[#DD1D21] transition-colors`}
                >
                  Service
                </Link>
              </li>
            </ul>
          </nav>

          <button 
            className="md:hidden text-[#DD1D21]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 page-transition">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block font-medium text-gray-800 hover:text-[#DD1D21] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/cars" 
                  className="block font-medium text-gray-800 hover:text-[#DD1D21] transition-colors"
                >
                  Our Cars
                </Link>
              </li>
              <li>
                <Link 
                  to="/test-drive" 
                  className="block font-medium text-gray-800 hover:text-[#DD1D21] transition-colors"
                >
                  Test Drive
                </Link>
              </li>
              <li>
                <Link 
                  to="/service" 
                  className="block font-medium text-gray-800 hover:text-[#DD1D21] transition-colors"
                >
                  Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
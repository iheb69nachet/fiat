import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Car className="h-8 w-8 text-[#DD1D21]" />
              <span className="ml-2 text-2xl font-bold text-[#DD1D21]">FIAT</span>
            </div>
            <p className="text-gray-400 mb-6">
              Celebrating over 120 years of Italian design and engineering excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#DD1D21] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#DD1D21] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#DD1D21] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#DD1D21] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-white transition-colors">
                  Our Cars
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-white transition-colors">
                  Our Cars Parts
                </Link>
              </li>
              <li>
                <Link to="/test-drive" className="text-gray-400 hover:text-white transition-colors">
                  Test Drive
                </Link>
              </li>
              <li>
                <Link to="/service" className="text-gray-400 hover:text-white transition-colors">
                  Service
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={20} className="text-[#DD1D21] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">+1 (800) FIAT-USA</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="text-[#DD1D21] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">customercare@fiat.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="text-[#DD1D21] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">1000 Chrysler Drive, Auburn Hills, MI 48326</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md flex-grow focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#DD1D21] text-white px-4 py-2 rounded-r-md hover:bg-[#B51419] transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} FIAT. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
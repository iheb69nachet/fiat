import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, 
  Calendar, 
  Wrench, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/cars', label: 'Cars', icon: Car },
    { path: '/admin/test-drives', label: 'Test Drives', icon: Calendar },
    { path: '/admin/services', label: 'Services', icon: Wrench },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60 hidden md:block">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <Car className="h-8 w-8 text-[#DD1D21]" />
            <span className="ml-2 text-xl font-bold text-[#DD1D21]">FIAT Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100
                        ${isActive(item.path) ? 'bg-red-50 text-[#DD1D21]' : ''}
                      `}
                    >
                      <Icon size={20} className="mr-3" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut size={20} className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-md">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-[#DD1D21]" />
            <span className="ml-2 text-xl font-bold text-[#DD1D21]">FIAT Admin</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="bg-white border-t">
            <ul className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100
                        ${isActive(item.path) ? 'bg-red-50 text-[#DD1D21]' : ''}
                      `}
                    >
                      <Icon size={20} className="mr-3" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut size={20} className="mr-3" />
                  Sign Out
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <main className="md:ml-60 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
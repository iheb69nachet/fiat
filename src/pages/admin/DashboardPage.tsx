import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Calendar, Wrench, DollarSign } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardStats {
  totalCars: number;
  testDrives: number;
  serviceBookings: number;
  revenue: number;
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCars: 0,
    testDrives: 0,
    serviceBookings: 0,
    revenue: 0
  });
  const [recentTestDrives, setRecentTestDrives] = useState([]);
  const [recentServices, setRecentServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch total cars
      const { count: totalCars } = await supabase
        .from('cars')
        .select('id', { count: 'exact' });

      // Fetch test drives count and recent test drives
      const { count: testDrives, data: recentTestDrivesData } = await supabase
        .from('test_drive_bookings')
        .select('*, car:cars(*)', { count: 'exact' })
        .order('date', { ascending: false })
        .limit(2);

      // Fetch service bookings count and recent services
      const { count: serviceBookings, data: recentServicesData } = await supabase
        .from('service_bookings')
        .select('*, service:service_booking_services(service:services(*))', { count: 'exact' })
        .order('appointment_date', { ascending: false })
        .limit(2);

      // Calculate total revenue from service bookings
      const { data: revenueData } = await supabase
        .from('service_bookings')
        .select('total_price');
      const revenue = revenueData?.reduce((total, booking) => total + (booking.total_price || 0), 0) || 0;

      setStats({
        totalCars: totalCars || 0,
        testDrives: testDrives || 0,
        serviceBookings: serviceBookings || 0,
        revenue
      });

      setRecentTestDrives(recentTestDrivesData || []);
      setRecentServices(recentServicesData || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Cars',
      value: stats.totalCars.toString(),
      icon: Car,
      link: '/admin/cars'
    },
    {
      title: 'Test Drive Requests',
      value: stats.testDrives.toString(),
      icon: Calendar,
      link: '/admin/test-drives'
    },
    {
      title: 'Service Bookings',
      value: stats.serviceBookings.toString(),
      icon: Wrench,
      link: '/admin/service-bookings'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      link: '/admin/service-bookings'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD1D21]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-600">
        Error loading dashboard data: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Icon size={24} className="text-[#DD1D21]" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Test Drives */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Test Drives</h2>
              <Link 
                to="/admin/test-drives"
                className="text-[#DD1D21] text-sm hover:underline"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTestDrives.map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{booking.first_name} {booking.last_name}</p>
                    <p className="text-sm text-gray-500">{booking.car?.make} {booking.car?.model}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{new Date(booking.date).toLocaleDateString()}</p>
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    `}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Services */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Services</h2>
              <Link 
                to="/admin/service-bookings"
                className="text-[#DD1D21] text-sm hover:underline"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentServices.map((service: any) => (
                <div key={service.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{service.first_name} {service.last_name}</p>
                    <p className="text-sm text-gray-500">
                      {service.service?.map((s: any) => s.service.name).join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{new Date(service.appointment_date).toLocaleDateString()}</p>
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${service.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}
                    `}>
                      {service.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
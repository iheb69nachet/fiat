import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Calendar, Wrench, DollarSign } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const stats = [
    {
      title: 'Total Cars',
      value: '24',
      change: '+2',
      changeType: 'increase',
      icon: Car,
      link: '/admin/cars'
    },
    {
      title: 'Test Drive Requests',
      value: '12',
      change: '+5',
      changeType: 'increase',
      icon: Calendar,
      link: '/admin/test-drives'
    },
    {
      title: 'Service Bookings',
      value: '18',
      change: '+3',
      changeType: 'increase',
      icon: Wrench,
      link: '/admin/services'
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+8.3%',
      changeType: 'increase',
      icon: DollarSign,
      link: '/admin/services'
    }
  ];

  const recentTestDrives = [
    {
      id: '1',
      customer: 'John Doe',
      car: 'FIAT 500X',
      date: '2024-03-15',
      time: '10:00 AM',
      status: 'pending'
    },
    {
      id: '2',
      customer: 'Jane Smith',
      car: 'FIAT 500e',
      date: '2024-03-16',
      time: '2:30 PM',
      status: 'confirmed'
    }
  ];

  const recentServices = [
    {
      id: '1',
      customer: 'Mike Johnson',
      services: ['Oil Change', 'Brake Inspection'],
      date: '2024-03-15',
      status: 'in_progress'
    },
    {
      id: '2',
      customer: 'Sarah Wilson',
      services: ['Tire Rotation', 'Air Filter'],
      date: '2024-03-16',
      status: 'pending'
    }
  ];

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
        {stats.map((stat, index) => {
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
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
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
              {recentTestDrives.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{booking.customer}</p>
                    <p className="text-sm text-gray-500">{booking.car}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{booking.date}</p>
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
                to="/admin/services"
                className="text-[#DD1D21] text-sm hover:underline"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{service.customer}</p>
                    <p className="text-sm text-gray-500">
                      {service.services.join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{service.date}</p>
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
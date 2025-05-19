import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { TestDriveBooking } from '../../types/Booking';
import { Check, X, Phone, Mail } from 'lucide-react';

const TestDrivesManagementPage: React.FC = () => {
  const [bookings, setBookings] = useState<TestDriveBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('test_drive_bookings')
        .select(`
          *,
          car:cars(*)
        `)
        .order('date', { ascending: true });

      if (error) throw error;

      setBookings(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('test_drive_bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD1D21]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Test Drive Requests</h1>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {booking.first_name} {booking.last_name}
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <a 
                      href={`mailto:${booking.email}`}
                      className="flex items-center hover:text-[#DD1D21]"
                    >
                      <Mail size={14} className="mr-1" />
                      {booking.email}
                    </a>
                    <a 
                      href={`tel:${booking.phone}`}
                      className="flex items-center hover:text-[#DD1D21]"
                    >
                      <Phone size={14} className="mr-1" />
                      {booking.phone}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {booking.car.year} {booking.car.make} {booking.car.model}
                  </div>
                  <div className="text-sm text-gray-500">{booking.car.trim}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">{booking.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestDrivesManagementPage;
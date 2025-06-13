import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ServiceBooking } from '../../types/Booking';
import { Check, X, Phone, Mail, Eye } from 'lucide-react';

const ServiceBookingsManagementPage: React.FC = () => {
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<ServiceBooking | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('service_bookings')
        .select('*')
        .order('appointment_date', { ascending: true });

      if (bookingsError) throw bookingsError;

      const bookingsWithServices = await Promise.all(
        (bookingsData || []).map(async (booking) => {
          const { data: servicesData, error: servicesError } = await supabase
            .from('service_booking_services')
            .select('service:services(*)')
            .eq('booking_id', booking.id);

          if (servicesError) throw servicesError;

          return {
            ...booking,
            services: servicesData?.map((item) => item.service) || [],
          };
        })
      );

      setBookings(bookingsWithServices);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('service_bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleViewBooking = (booking: ServiceBooking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
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
        <h1 className="text-2xl font-bold">Service Bookings</h1>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {booking.first_name} {booking.last_name}
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <a href={`mailto:${booking.email}`} className="flex items-center hover:text-[#DD1D21]">
                      <Mail size={14} className="mr-1" />
                      {booking.email}
                    </a>
                    <a href={`tel:${booking.phone}`} className="flex items-center hover:text-[#DD1D21]">
                      <Phone size={14} className="mr-1" />
                      {booking.phone}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {booking.car_year} {booking.car_make} {booking.car_model}
                  </div>
                  {booking.car_vin && <div className="text-sm text-gray-500">VIN: {booking.car_vin}</div>}
                  {booking.car_mileage && <div className="text-sm text-gray-500">Mileage: {booking.car_mileage}</div>}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {booking.services.map((service: any) => service.name).join(', ')}
                  </div>
                  <div className="text-sm font-medium text-[#DD1D21]">
                    ${booking.total_price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {new Date(booking.appointment_date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">{booking.appointment_time}</div>
                  <div className="text-sm text-gray-500">{booking.location}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : booking.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                  <button onClick={() => handleViewBooking(booking)} className="text-gray-600 hover:text-gray-900" title="View Details">
                    <Eye size={16} />
                  </button>
                  {booking.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(booking.id, 'confirmed')} className="text-green-600 hover:text-green-900" title="Confirm Booking">
                        <Check size={16} />
                      </button>
                      <button onClick={() => updateStatus(booking.id, 'cancelled')} className="text-red-600 hover:text-red-900" title="Cancel Booking">
                        <X size={16} />
                      </button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <button onClick={() => updateStatus(booking.id, 'in_progress')} className="text-blue-600 hover:text-blue-900">
                      Start Service
                    </button>
                  )}
                  {booking.status === 'in_progress' && (
                    <button onClick={() => updateStatus(booking.id, 'completed')} className="text-green-600 hover:text-green-900">
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {isViewModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Customer Information</h3>
                <p className="text-gray-600">{selectedBooking.first_name} {selectedBooking.last_name}</p>
                <p className="text-gray-600">{selectedBooking.email}</p>
                <p className="text-gray-600">{selectedBooking.phone}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Vehicle Information</h3>
                <p className="text-gray-600">{selectedBooking.car_year} {selectedBooking.car_make} {selectedBooking.car_model}</p>
                {selectedBooking.car_vin && <p className="text-gray-600">VIN: {selectedBooking.car_vin}</p>}
                {selectedBooking.car_mileage && <p className="text-gray-600">Mileage: {selectedBooking.car_mileage}</p>}
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Appointment Details</h3>
                <p className="text-gray-600">Date: {new Date(selectedBooking.appointment_date).toLocaleDateString()}</p>
                <p className="text-gray-600">Time: {selectedBooking.appointment_time}</p>
                <p className="text-gray-600">Location: {selectedBooking.location}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Services</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedBooking.services.map((service: any) => (
                    <li key={service.id}>{service.name} - ${service.price.toFixed(2)}</li>
                  ))}
                </ul>
                <p className="font-medium text-[#DD1D21] mt-2">
                  Total: ${selectedBooking.total_price.toFixed(2)}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Status</h3>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  selectedBooking.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : selectedBooking.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : selectedBooking.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedBooking.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceBookingsManagementPage;

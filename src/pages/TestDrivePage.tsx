import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Car } from '../types/Car';
import { TestDriveBooking } from '../types/Booking';
import DatePicker from '../components/DatePicker';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, User, Mail, Phone, MapPin, Car as CarIcon, CheckCircle2 } from 'lucide-react';

const TestDrivePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const carIdFromUrl = searchParams.get('carId');
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [carOptions, setCarOptions] = useState<Car[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: 'downtown',
    comments: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data: cars, error } = await supabase
        .from('cars')
        .select('*');

      if (error) throw error;

      setCarOptions(cars || []);
      
      if (carIdFromUrl && cars) {
        const car = cars.find(c => c.id === carIdFromUrl);
        if (car) setSelectedCar(car);
      }
    } catch (err: any) {
      setFormError('Error loading cars. Please try again.');
    }
  };

  const timeOptions = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    if (!selectedCar || !selectedDate || !selectedTime) {
      setFormError('Please select a car, date, and time.');
      setLoading(false);
      return;
    }

    try {
      const booking = {
        car_id: selectedCar.id, // Changed from carId to car_id to match the schema
        first_name: formData.firstName, // Changed from firstName to first_name
        last_name: formData.lastName, // Changed from lastName to last_name
        email: formData.email,
        phone: formData.phone,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        location: formData.location,
        comments: formData.comments,
        status: 'pending'
      };

      const { error } = await supabase
        .from('test_drive_bookings')
        .insert([booking]);

      if (error) throw error;

      setFormSubmitted(true);
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: 'downtown',
        comments: ''
      });
      setSelectedDate(null);
      setSelectedTime('');
    } catch (err: any) {
      setFormError(err.message || 'Error submitting booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const locations = [
    { id: 'downtown', name: 'Downtown FIAT Dealership', address: '123 Main Street, City Center' },
    { id: 'north', name: 'North FIAT Dealership', address: '456 North Avenue, North District' },
    { id: 'west', name: 'West FIAT Dealership', address: '789 West Boulevard, West Side' }
  ];

  if (formSubmitted) {
    return (
      <div className="page-transition pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Test Drive Scheduled!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for scheduling a test drive with us. We've sent a confirmation to your email.
              </p>
              
              <div className="bg-gray-50 w-full rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4 text-left">Your Test Drive Details:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex">
                    <CarIcon size={20} className="text-[#DD1D21] mr-3 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 block text-sm">Vehicle</span>
                      <span className="font-medium">{selectedCar?.year} {selectedCar?.make} {selectedCar?.model}</span>
                    </div>
                  </div>
                  <div className="flex">
                    <Calendar size={20} className="text-[#DD1D21] mr-3 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 block text-sm">Date</span>
                      <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex">
                    <Clock size={20} className="text-[#DD1D21] mr-3 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 block text-sm">Time</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  </div>
                  <div className="flex">
                    <MapPin size={20} className="text-[#DD1D21] mr-3 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 block text-sm">Location</span>
                      <span className="font-medium">
                        {locations.find(loc => loc.id === formData.location)?.name}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        {locations.find(loc => loc.id === formData.location)?.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                Our team will contact you shortly to confirm your appointment. 
                If you need to reschedule, please call us at (800) FIAT-TUNISIA.
              </p>
              
              <div className="flex space-x-4">
                <a 
                  href="/"
                  className="bg-[#DD1D21] text-white py-2 px-6 rounded-md hover:bg-[#B51419] transition-colors"
                >
                  Return to Homepage
                </a>
                <a 
                  href="/cars"
                  className="border-2 border-[#DD1D21] text-[#DD1D21] py-2 px-6 rounded-md hover:bg-red-50 transition-colors"
                >
                  Explore More Cars
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 container mx-auto px-4 pb-16">
      <h1 className="text-3xl font-bold mb-8">Schedule a Test Drive</h1>

      {formSubmitted ? (
        <div className="bg-green-50 p-8 rounded-lg text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Test Drive Scheduled!</h2>
          <p className="text-gray-600 mb-6">We'll contact you shortly to confirm your appointment.</p>
          <button
            onClick={() => {
              setFormSubmitted(false);
              navigate('/cars');
            }}
            className="bg-[#DD1D21] text-white px-6 py-2 rounded-md hover:bg-[#B51419] transition-colors"
          >
            Browse More Cars
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          {formError && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
              {formError}
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select a Car</h2>
            <select
              value={selectedCar?.id || ''}
              onChange={(e) => {
                const car = carOptions.find(c => c.id === e.target.value);
                setSelectedCar(car || null);
              }}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Select a car</option>
              {carOptions.map(car => (
                <option key={car.id} value={car.id}>
                  {car.year} {car.make} {car.model} {car.trim}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
              <div className="space-y-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={setSelectedDate}
                  minDate={new Date()}
                  placeholderText="Select a date"
                  className="w-full border rounded-md p-2"
                  required
                />
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Select a time</option>
                  {timeOptions.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="downtown">Downtown Dealership</option>
                <option value="north">North Location</option>
                <option value="south">South Location</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border rounded-md p-2"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border rounded-md p-2"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border rounded-md p-2"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="border rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Additional Comments</h2>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              placeholder="Any special requests or questions?"
              className="w-full border rounded-md p-2 h-32"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#DD1D21] text-white py-3 rounded-md hover:bg-[#B51419] transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Scheduling...' : 'Schedule Test Drive'}
          </button>
        </form>
      )}
    </div>
  );
};

export default TestDrivePage;
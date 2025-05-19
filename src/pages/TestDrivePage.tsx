import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCars } from '../data/cars';
import { Car } from '../types/Car';
import DatePicker from '../components/DatePicker';
import { Calendar, Clock, User, Mail, Phone, MapPin, Car as CarIcon, CheckCircle2 } from 'lucide-react';

const TestDrivePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const carIdFromUrl = searchParams.get('carId');
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [carOptions, setCarOptions] = useState<Car[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
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
    // Get all cars
    const allCars = getCars();
    setCarOptions(allCars);
    
    // If carId is provided in URL, select that car
    if (carIdFromUrl) {
      const car = allCars.find(c => c.id === carIdFromUrl);
      if (car) {
        setSelectedCar(car);
      }
    }
  }, [carIdFromUrl]);

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

  const handleCarSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = e.target.value;
    if (carId === '') {
      setSelectedCar(null);
      return;
    }
    
    const car = carOptions.find(c => c.id === carId);
    if (car) {
      setSelectedCar(car);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedCar) {
      setFormError('Please select a car for your test drive.');
      return;
    }
    
    if (!selectedDate) {
      setFormError('Please select a date for your test drive.');
      return;
    }
    
    if (!selectedTime) {
      setFormError('Please select a time for your test drive.');
      return;
    }
    
    // Basic form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setFormError('Please fill out all required fields.');
      return;
    }
    
    // Clear any errors
    setFormError('');
    
    // Form submission would go here
    // For demo, just show success state
    setFormSubmitted(true);
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
                If you need to reschedule, please call us at (800) FIAT-USA.
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
    <div className="page-transition pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Schedule a Test Drive</h1>
        <p className="text-gray-600 mb-8">Experience the joy of driving a FIAT</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Select a Car</h2>
              
              <select
                value={selectedCar?.id || ''}
                onChange={handleCarSelect}
                className="w-full rounded-md border border-gray-300 py-3 px-4 mb-6"
              >
                <option value="">Select a car for test drive</option>
                {carOptions.map(car => (
                  <option key={car.id} value={car.id}>
                    {car.year} {car.make} {car.model} - {car.trim}
                  </option>
                ))}
              </select>
              
              {selectedCar && (
                <div className="flex flex-col sm:flex-row bg-gray-50 rounded-lg overflow-hidden">
                  <div className="sm:w-1/3">
                    <img 
                      src={selectedCar.image} 
                      alt={`${selectedCar.make} ${selectedCar.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:w-2/3">
                    <h3 className="font-semibold text-lg mb-2">
                      {selectedCar.year} {selectedCar.make} {selectedCar.model}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {selectedCar.trim}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Engine:</span> {selectedCar.engine}
                      </div>
                      <div>
                        <span className="text-gray-500">Transmission:</span> {selectedCar.transmission}
                      </div>
                      <div>
                        <span className="text-gray-500">MPG:</span> {selectedCar.mpg}
                      </div>
                      <div>
                        <span className="text-gray-500">Price:</span> ${selectedCar.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Select Date & Time</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Date</h3>
                  <DatePicker 
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    minDate={new Date()}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Time</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeOptions.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`
                          py-3 px-4 rounded-md border text-center
                          ${selectedTime === time 
                            ? 'bg-[#DD1D21] text-white border-[#DD1D21]' 
                            : 'border-gray-300 hover:border-gray-400'}
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Your Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">
                    Preferred Dealership Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3"
                  >
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name} - {location.address}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="comments">
                    Comments or Special Requests
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-md border border-gray-300 py-2 px-3"
                  ></textarea>
                </div>
                
                {formError && (
                  <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6">
                    {formError}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-[#DD1D21] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#B51419] transition-colors"
                >
                  Schedule Test Drive
                </button>
              </form>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">What to Expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#DD1D21] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</div>
                  <p className="text-gray-600">Schedule your test drive by selecting a car, date, and time.</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#DD1D21] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</div>
                  <p className="text-gray-600">Receive confirmation via email with details of your appointment.</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#DD1D21] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</div>
                  <p className="text-gray-600">Bring your driver's license to the dealership on the scheduled date.</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#DD1D21] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</div>
                  <p className="text-gray-600">A FIAT specialist will introduce you to the vehicle and its features.</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#DD1D21] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">5</div>
                  <p className="text-gray-600">Enjoy your test drive on a predetermined route or customize your experience.</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone size={20} className="text-[#DD1D21] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block font-medium">Phone</span>
                    <span className="text-gray-600">(800) FIAT-USA</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail size={20} className="text-[#DD1D21] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block font-medium">Email</span>
                    <span className="text-gray-600">testdrive@fiat.com</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin size={20} className="text-[#DD1D21] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block font-medium">Locations</span>
                    <div className="text-gray-600 space-y-2 mt-1">
                      {locations.map(location => (
                        <div key={location.id}>
                          <p className="font-medium text-gray-700">{location.name}</p>
                          <p className="text-sm">{location.address}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Test Drive FAQs</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">How long does a test drive last?</h4>
                  <p className="text-sm text-gray-600">Most test drives last about 30 minutes, giving you ample time to experience the vehicle.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">What do I need to bring?</h4>
                  <p className="text-sm text-gray-600">A valid driver's license is required. Insurance information may also be requested.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Can I test drive more than one vehicle?</h4>
                  <p className="text-sm text-gray-600">Yes, you can schedule multiple test drives on the same day if availability allows.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Can I bring someone with me?</h4>
                  <p className="text-sm text-gray-600">Absolutely! We encourage you to bring passengers to get their opinion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDrivePage;
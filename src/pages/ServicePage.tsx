import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import ServiceSelector from '../components/ServiceSelector';
import { getServices } from '../data/services';
import { Service } from '../types/Service';
import { CheckCircle2, Clock, MapPin, Calendar, Car, ChevronDown, ChevronUp } from 'lucide-react';

const ServicePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [carDetails, setCarDetails] = useState({
    make: 'FIAT',
    model: '',
    year: '',
    mileage: '',
    vin: ''
  });
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: 'downtown'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const [services] = useState<Service[]>(getServices());
  const [expandedSections, setExpandedSections] = useState({
    carDetails: true,
    dateTime: true,
    services: true,
    personalInfo: true
  });

  const timeOptions = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const locations = [
    { id: 'downtown', name: 'Downtown FIAT Service Center', address: '123 Main Street, City Center' },
    { id: 'north', name: 'North FIAT Service Center', address: '456 North Avenue, North District' },
    { id: 'west', name: 'West FIAT Service Center', address: '789 West Boulevard, West Side' }
  ];

  const handleCarDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value
    });
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value
    });
  };

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!carDetails.make || !carDetails.model || !carDetails.year) {
      setFormError('Please provide your car details.');
      return;
    }
    
    if (!selectedDate) {
      setFormError('Please select a date for your service appointment.');
      return;
    }
    
    if (!selectedTime) {
      setFormError('Please select a time for your service appointment.');
      return;
    }
    
    if (selectedServices.length === 0) {
      setFormError('Please select at least one service.');
      return;
    }
    
    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phone) {
      setFormError('Please fill out all required personal information fields.');
      return;
    }
    
    // Clear any errors
    setFormError('');
    
    // Form submission would go here
    // For demo, just show success state
    setFormSubmitted(true);
  };

  const calculateTotalPrice = () => {
    return services
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.price, 0);
  };

  const nextStep = () => {
    if (currentStep === 1 && (!carDetails.make || !carDetails.model || !carDetails.year)) {
      setFormError('Please provide your car details to continue.');
      return;
    }
    
    if (currentStep === 2 && (!selectedDate || !selectedTime)) {
      setFormError('Please select both date and time to continue.');
      return;
    }
    
    if (currentStep === 3 && selectedServices.length === 0) {
      setFormError('Please select at least one service to continue.');
      return;
    }
    
    setFormError('');
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  if (formSubmitted) {
    return (
      <div className="page-transition pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Service Appointment Scheduled!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for scheduling a service appointment with us. We've sent a confirmation to your email.
              </p>
              
              <div className="bg-gray-50 w-full rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-4">Your Service Appointment Details:</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <Car size={20} className="text-[#DD1D21] mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <span className="text-gray-600 block text-sm">Vehicle</span>
                      <span className="font-medium">{carDetails.year} {carDetails.make} {carDetails.model}</span>
                      {carDetails.vin && (
                        <span className="text-gray-500 text-sm block">VIN: {carDetails.vin}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <Calendar size={20} className="text-[#DD1D21] mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <span className="text-gray-600 block text-sm">Date</span>
                      <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex">
                    <Clock size={20} className="text-[#DD1D21] mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <span className="text-gray-600 block text-sm">Time</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  </div>
                  <div className="flex">
                    <MapPin size={20} className="text-[#DD1D21] mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <span className="text-gray-600 block text-sm">Location</span>
                      <span className="font-medium">
                        {locations.find(loc => loc.id === personalInfo.location)?.name}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        {locations.find(loc => loc.id === personalInfo.location)?.address}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium mb-3">Selected Services:</h4>
                  <ul className="space-y-2">
                    {services
                      .filter(service => selectedServices.includes(service.id))
                      .map(service => (
                        <li key={service.id} className="flex justify-between">
                          <span>{service.name}</span>
                          <span className="font-medium">${service.price.toFixed(2)}</span>
                        </li>
                      ))
                    }
                  </ul>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>${calculateTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                Our service team will contact you shortly to confirm your appointment. 
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
                  href="/service"
                  className="border-2 border-[#DD1D21] text-[#DD1D21] py-2 px-6 rounded-md hover:bg-red-50 transition-colors"
                >
                  Book Another Service
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
        <h1 className="text-3xl font-bold mb-2">Service Appointment</h1>
        <p className="text-gray-600 mb-8">Schedule service for your FIAT vehicle</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Car Details Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <button
                  type="button"
                  className="flex items-center justify-between w-full bg-gray-50 p-4 text-left"
                  onClick={() => toggleSection('carDetails')}
                >
                  <div className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-[#DD1D21] text-white flex items-center justify-center mr-3">1</span>
                    <h2 className="text-lg font-bold">Vehicle Information</h2>
                  </div>
                  {expandedSections.carDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {expandedSections.carDetails && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="make">
                          Make*
                        </label>
                        <select
                          id="make"
                          name="make"
                          value={carDetails.make}
                          onChange={handleCarDetailsChange}
                          className="w-full rounded-md border border-gray-300 py-2 px-3"
                          required
                        >
                          <option value="FIAT">FIAT</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="model">
                          Model*
                        </label>
                        <input
                          type="text"
                          id="model"
                          name="model"
                          value={carDetails.model}
                          onChange={handleCarDetailsChange}
                          className="w-full rounded-md border border-gray-300 py-2 px-3"
                          required
                          placeholder="e.g. 500X, 500L, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="year">
                          Year*
                        </label>
                        <input
                          type="text"
                          id="year"
                          name="year"
                          value={carDetails.year}
                          onChange={handleCarDetailsChange}
                          className="w-full rounded-md border border-gray-300 py-2 px-3"
                          required
                          placeholder="e.g. 2023"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mileage">
                          Mileage
                        </label>
                        <input
                          type="text"
                          id="mileage"
                          name="mileage"
                          value={carDetails.mileage}
                          onChange={handleCarDetailsChange}
                          className="w-full rounded-md border border-gray-300 py-2 px-3"
                          placeholder="e.g. 15000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="vin">
                        VIN (Optional)
                      </label>
                      <input
                        type="text"
                        id="vin"
                        name="vin"
                        value={carDetails.vin}
                        onChange={handleCarDetailsChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3"
                        placeholder="Vehicle Identification Number"
                      />
                    </div>
                    
                    {currentStep === 1 && (
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="bg-[#DD1D21] text-white py-2 px-6 rounded-md hover:bg-[#B51419] transition-colors"
                        >
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Date & Time Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <button
                  type="button"
                  className="flex items-center justify-between w-full bg-gray-50 p-4 text-left"
                  onClick={() => toggleSection('dateTime')}
                >
                  <div className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-[#DD1D21] text-white flex items-center justify-center mr-3">2</span>
                    <h2 className="text-lg font-bold">Select Date & Time</h2>
                  </div>
                  {expandedSections.dateTime ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {expandedSections.dateTime && (
                  <div className="p-6">
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
                    
                    {currentStep === 2 && (
                      <div className="mt-6 flex space-x-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="bg-[#DD1D21] text-white py-2 px-6 rounded-md hover:bg-[#B51419] transition-colors"
                        >
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Services Selection Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <button
                  type="button"
                  className="flex items-center justify-between w-full bg-gray-50 p-4 text-left"
                  onClick={() => toggleSection('services')}
                >
                  <div className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-[#DD1D21] text-white flex items-center justify-center mr-3">3</span>
                    <h2 className="text-lg font-bold">Select Services</h2>
                  </div>
                  {expandedSections.services ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {expandedSections.services && (
                  <div className="p-6">
                    <ServiceSelector
                      services={services}
                      selectedServices={selectedServices}
                      onToggleService={toggleService}
                    />
                    
                    {currentStep === 3 && (
                      <div className="mt-6 flex space-x-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="bg-[#DD1D21] text-white py-2 px-6 rounded-md hover:bg-[#B51419] transition-colors"
                        >
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Personal Information Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <button
                  type="button"
                  className="flex items-center justify-between w-full bg-gray-50 p-4 text-left"
                  onClick={() => toggleSection('personalInfo')}
                >
                  <div className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-[#DD1D21] text-white flex items-center justify-center mr-3">4</span>
                    <h2 className="text-lg font-bold">Your Information</h2>
                  </div>
                  {expandedSections.personalInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {expandedSections.personalInfo && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={personalInfo.firstName}
                          onChange={handlePersonalInfoChange}
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
                          value={personalInfo.lastName}
                          onChange={handlePersonalInfoChange}
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
                          value={personalInfo.email}
                          onChange={handlePersonalInfoChange}
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
                          value={personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          className="w-full rounded-md border border-gray-300 py-2 px-3"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">
                        Service Center Location
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={personalInfo.location}
                        onChange={handlePersonalInfoChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3"
                      >
                        {locations.map(location => (
                          <option key={location.id} value={location.id}>
                            {location.name} - {location.address}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {formError && (
                      <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6">
                        {formError}
                      </div>
                    )}
                    
                    {currentStep === 4 && (
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="bg-[#DD1D21] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#B51419] transition-colors"
                        >
                          Schedule Service
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Your Service Summary</h3>
              
              {/* Car Details Summary */}
              {(carDetails.make || carDetails.model || carDetails.year) && (
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Vehicle</h4>
                  <p className="font-medium">
                    {carDetails.year} {carDetails.make} {carDetails.model}
                  </p>
                  {carDetails.mileage && (
                    <p className="text-sm text-gray-600">Mileage: {carDetails.mileage}</p>
                  )}
                </div>
              )}
              
              {/* Date & Time Summary */}
              {(selectedDate || selectedTime) && (
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Appointment</h4>
                  {selectedDate && (
                    <p className="font-medium">{selectedDate.toLocaleDateString()}</p>
                  )}
                  {selectedTime && (
                    <p className="text-sm text-gray-600">Time: {selectedTime}</p>
                  )}
                </div>
              )}
              
              {/* Services Summary */}
              {selectedServices.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Selected Services</h4>
                  <ul className="space-y-2">
                    {services
                      .filter(service => selectedServices.includes(service.id))
                      .map(service => (
                        <li key={service.id} className="flex justify-between">
                          <span>{service.name}</span>
                          <span className="font-medium">${service.price.toFixed(2)}</span>
                        </li>
                      ))
                    }
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${calculateTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              )}
              
              {/* Location Summary */}
              {personalInfo.location && (
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Service Center</h4>
                  <p className="font-medium">
                    {locations.find(loc => loc.id === personalInfo.location)?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {locations.find(loc => loc.id === personalInfo.location)?.address}
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Why Choose FIAT Service?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-[#DD1D21] mr-3 flex-shrink-0 mt-0.5" />
                  <span>Factory-trained technicians specialized in FIAT vehicles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-[#DD1D21] mr-3 flex-shrink-0 mt-0.5" />
                  <span>Genuine FIAT parts and accessories</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-[#DD1D21] mr-3 flex-shrink-0 mt-0.5" />
                  <span>Comprehensive multi-point inspection with every service</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-[#DD1D21] mr-3 flex-shrink-0 mt-0.5" />
                  <span>Complimentary shuttle service and loaner vehicles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-[#DD1D21] mr-3 flex-shrink-0 mt-0.5" />
                  <span>Comfortable waiting areas with Wi-Fi and refreshments</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about our services or need assistance scheduling your appointment, please don't hesitate to contact us.
              </p>
              <div className="space-y-3">
                <a 
                  href="tel:+1800FIATUSA" 
                  className="flex items-center text-[#DD1D21] font-medium hover:underline"
                >
                  Call (800) FIAT-USA
                </a>
                <a 
                  href="mailto:service@fiat.com" 
                  className="flex items-center text-[#DD1D21] font-medium hover:underline"
                >
                  Email service@fiat.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
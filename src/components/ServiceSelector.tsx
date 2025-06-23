import React from 'react';
import { Check } from 'lucide-react';
import { Service } from '../types/Service';

interface ServiceSelectorProps {
  services: Service[];
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  selectedServices,
  onToggleService
}) => {
  // Group services by category
  const servicesByCategory: Record<string, Service[]> = {};
  
  services.forEach(service => {
    if (!servicesByCategory[service.category]) {
      servicesByCategory[service.category] = [];
    }
    servicesByCategory[service.category].push(service);
  });

  return (
    <div className="space-y-6">
      {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
        <div key={category} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">{category}</h3>
          <div className="space-y-3">
            {categoryServices.map(service => (
              <div 
                key={service.id}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-all
                  ${selectedServices.includes(service.id) 
                    ? 'border-[#DD1D21] bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300'}
                `}
                onClick={() => onToggleService(service.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div 
                      className={`
                        w-5 h-5 rounded-full border flex items-center justify-center
                        ${selectedServices.includes(service.id) 
                          ? 'bg-[#DD1D21] border-[#DD1D21]' 
                          : 'border-gray-300'}
                      `}
                    >
                      {selectedServices.includes(service.id) && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="text-base font-medium">{service.name}</h4>
                      <span className="text-base font-semibold text-[#DD1D21]">{service.price.toFixed(2)} DT</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                    
                    {service.estimatedTime && (
                      <div className="mt-2 text-sm text-gray-500">
                        Estimated time: {service.estimatedTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSelector;
import { Service } from '../types/Service';

const services: Service[] = [
  // Maintenance Services
  {
    id: 'oil-change',
    name: 'Oil Change & Filter Replacement',
    description: 'Regular oil changes are essential for maintaining engine performance and longevity. We use genuine FIAT oil filters and premium synthetic oil.',
    price: 79.95,
    estimatedTime: '30-45 minutes',
    category: 'Maintenance'
  },
  {
    id: 'brake-service',
    name: 'Brake Inspection & Service',
    description: 'Comprehensive brake system inspection including pads, rotors, calipers, and brake fluid. Includes necessary adjustments.',
    price: 129.95,
    estimatedTime: '1-2 hours',
    category: 'Maintenance'
  },
  {
    id: 'tire-rotation',
    name: 'Tire Rotation & Balance',
    description: 'Extends tire life by ensuring even wear. Includes inspection for proper inflation and tread depth.',
    price: 69.95,
    estimatedTime: '45-60 minutes',
    category: 'Maintenance'
  },
  {
    id: 'wheel-alignment',
    name: 'Four-Wheel Alignment',
    description: 'Precise adjustment of suspension angles to ensure optimal tire contact with the road, improving handling and tire longevity.',
    price: 109.95,
    estimatedTime: '1 hour',
    category: 'Maintenance'
  },
  {
    id: 'battery-service',
    name: 'Battery Test & Replacement',
    description: 'Complete electrical system check and battery test. Price includes labor only (battery cost separate if replacement needed).',
    price: 49.95,
    estimatedTime: '30 minutes',
    category: 'Maintenance'
  },
  {
    id: 'air-filter',
    name: 'Air Filter Replacement',
    description: 'Replacement of engine air filter to maintain optimal airflow and engine performance.',
    price: 39.95,
    estimatedTime: '15-20 minutes',
    category: 'Maintenance'
  },
  {
    id: 'cabin-filter',
    name: 'Cabin Air Filter Replacement',
    description: 'Replacement of cabin air filter to ensure clean air inside your vehicle and proper HVAC system function.',
    price: 49.95,
    estimatedTime: '20-30 minutes',
    category: 'Maintenance'
  },
  {
    id: 'wiper-blades',
    name: 'Wiper Blade Replacement',
    description: 'Installation of premium wiper blades for optimal visibility in all weather conditions.',
    price: 39.95,
    estimatedTime: '15 minutes',
    category: 'Maintenance'
  },

  // Inspection Services
  {
    id: 'multi-point',
    name: 'Multi-Point Vehicle Inspection',
    description: 'Comprehensive 27-point inspection of critical vehicle systems including fluid levels, filters, brakes, tires, and more.',
    price: 89.95,
    estimatedTime: '45-60 minutes',
    category: 'Inspection'
  },
  {
    id: 'ac-service',
    name: 'A/C System Inspection',
    description: 'Complete inspection of air conditioning system including performance test and leak check.',
    price: 79.95,
    estimatedTime: '30-45 minutes',
    category: 'Inspection'
  },
  {
    id: 'pre-trip',
    name: 'Pre-Trip Inspection',
    description: 'Ensure your vehicle is ready for a long journey with our comprehensive pre-trip safety and performance check.',
    price: 99.95,
    estimatedTime: '1 hour',
    category: 'Inspection'
  },
  {
    id: 'check-engine',
    name: 'Check Engine Light Diagnosis',
    description: 'Computer diagnostic scan to identify the cause of your check engine light. Fee waived if you choose to have repairs done with us.',
    price: 89.95,
    estimatedTime: '30-45 minutes',
    category: 'Inspection'
  },

  // Fluids Services
  {
    id: 'transmission-fluid',
    name: 'Transmission Fluid Exchange',
    description: 'Complete exchange of transmission fluid to ensure smooth shifting and extend transmission life.',
    price: 179.95,
    estimatedTime: '1-1.5 hours',
    category: 'Fluids'
  },
  {
    id: 'coolant-flush',
    name: 'Coolant System Flush',
    description: 'Complete flush and refill of cooling system with new antifreeze to prevent overheating and freezing.',
    price: 129.95,
    estimatedTime: '1 hour',
    category: 'Fluids'
  },
  {
    id: 'power-steering',
    name: 'Power Steering Fluid Service',
    description: 'Flush and replacement of power steering fluid to maintain smooth steering operation.',
    price: 99.95,
    estimatedTime: '45 minutes',
    category: 'Fluids'
  },
  {
    id: 'brake-fluid',
    name: 'Brake Fluid Flush',
    description: 'Complete replacement of brake fluid to maintain braking performance and prevent system corrosion.',
    price: 119.95,
    estimatedTime: '1 hour',
    category: 'Fluids'
  },

  // Specialty Services
  {
    id: 'timing-belt',
    name: 'Timing Belt Replacement',
    description: 'Replacement of timing belt and related components to prevent engine damage. Critical maintenance item.',
    price: 699.95,
    estimatedTime: '3-5 hours',
    category: 'Specialty'
  },
  {
    id: 'fuel-system',
    name: 'Fuel System Cleaning',
    description: 'Professional cleaning of fuel injectors, intake valves, and combustion chambers for improved performance and fuel economy.',
    price: 149.95,
    estimatedTime: '1-1.5 hours',
    category: 'Specialty'
  },
  {
    id: 'spark-plugs',
    name: 'Spark Plug Replacement',
    description: 'Replacement of spark plugs to maintain proper engine performance and fuel efficiency.',
    price: 149.95,
    estimatedTime: '1-2 hours',
    category: 'Specialty'
  },
  {
    id: 'headlight-restoration',
    name: 'Headlight Restoration',
    description: 'Professional restoration of foggy or yellowed headlights to improve nighttime visibility and appearance.',
    price: 129.95,
    estimatedTime: '1 hour',
    category: 'Specialty'
  },
  {
    id: 'eco-mode-tuning',
    name: 'Eco Mode Optimization',
    description: 'Specialized tuning to maximize fuel efficiency in your FIAT\'s Eco mode.',
    price: 89.95,
    estimatedTime: '45 minutes',
    category: 'Specialty'
  },
  {
    id: 'sport-mode-tuning',
    name: 'Sport Mode Enhancement',
    description: 'Performance optimization for your FIAT\'s Sport mode to enhance throttle response and driving dynamics.',
    price: 129.95,
    estimatedTime: '1 hour',
    category: 'Specialty'
  }
];

export const getServices = (): Service[] => {
  return services;
};

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};
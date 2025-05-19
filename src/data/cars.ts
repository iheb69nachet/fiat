import { Car } from '../types/Car';

const cars: Car[] = [
  {
    id: '1',
    make: 'FIAT',
    model: '500',
    trim: 'Pop',
    year: 2023,
    price: 19995,
    msrp: 21495,
    engine: '1.4L MultiAir Turbo',
    transmission: '6-Speed Automatic',
    mpg: '28 City / 33 Hwy',
    image: 'https://images.pexels.com/photos/15799318/pexels-photo-15799318/free-photo-of-red-fiat-500-parked-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/15799318/pexels-photo-15799318/free-photo-of-red-fiat-500-parked-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9070535/pexels-photo-9070535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/15799315/pexels-photo-15799315/free-photo-of-red-fiat-500-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3166785/pexels-photo-3166785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'The iconic FIAT 500 combines Italian style with efficiency and fun. This compact car offers a unique driving experience with its nimble handling and distinctive design.\n\nThe Pop trim includes a 1.4L MultiAir Turbo engine, 6-speed automatic transmission, and a range of modern features to enhance your driving pleasure.',
    featured: true,
    isNew: true,
    features: [
      { title: '7-inch Touchscreen Display', description: 'Features the Uconnect 4 system with Apple CarPlay and Android Auto integration.' },
      { title: 'Premium Audio System', description: 'Six-speaker Alpine audio system provides clear, high-quality sound throughout the cabin.' },
      { title: 'Rear Parking Sensors', description: 'Makes parking in tight spaces easier with audible alerts.' },
      { title: 'Sport-Tuned Suspension', description: 'Delivers responsive handling and a spirited driving experience.' },
      { title: 'Leather-Wrapped Steering Wheel', description: null },
      { title: 'Automatic Climate Control', description: null },
      { title: '16-inch Aluminum Wheels', description: null },
      { title: 'Push-Button Start', description: null },
      { title: 'Electronic Stability Control', description: null },
      { title: 'Seven Airbags', description: null }
    ],
    specifications: [
      {
        category: 'Engine & Performance',
        items: [
          { name: 'Engine', value: '1.4L MultiAir Turbo 4-Cylinder' },
          { name: 'Horsepower', value: '135 hp @ 5,500 rpm' },
          { name: 'Torque', value: '150 lb-ft @ 2,400 rpm' },
          { name: 'Transmission', value: '6-Speed Automatic' },
          { name: 'Drive Type', value: 'Front-Wheel Drive' },
          { name: 'Fuel Economy', value: '28 City / 33 Highway / 30 Combined MPG' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { name: 'Length', value: '144.4 inches' },
          { name: 'Width', value: '64.1 inches' },
          { name: 'Height', value: '59.8 inches' },
          { name: 'Wheelbase', value: '90.6 inches' },
          { name: 'Cargo Volume', value: '9.5 cubic feet' },
          { name: 'Curb Weight', value: '2,366 lbs' }
        ]
      },
      {
        category: 'Interior',
        items: [
          { name: 'Seating Capacity', value: '4 passengers' },
          { name: 'Front Headroom', value: '38.9 inches' },
          { name: 'Front Legroom', value: '40.7 inches' },
          { name: 'Rear Headroom', value: '35.5 inches' },
          { name: 'Rear Legroom', value: '31.7 inches' }
        ]
      }
    ]
  },
  {
    id: '2',
    make: 'FIAT',
    model: '500X',
    trim: 'Trekking',
    year: 2023,
    price: 26995,
    msrp: 27995,
    engine: '1.3L MultiAir Turbo',
    transmission: '9-Speed Automatic',
    mpg: '24 City / 30 Hwy',
    image: 'https://images.pexels.com/photos/11188053/pexels-photo-11188053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/11188053/pexels-photo-11188053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11188054/pexels-photo-11188054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11188047/pexels-photo-11188047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11188055/pexels-photo-11188055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'The FIAT 500X Trekking combines rugged capability with Italian design. This compact crossover offers all-weather confidence with standard all-wheel drive and elevated ground clearance.\n\nThe Trekking trim features a powerful 1.3L MultiAir Turbo engine, 9-speed automatic transmission, and bold styling details that set it apart from the crowd.',
    featured: true,
    isNew: true,
    features: [
      { title: 'All-Wheel Drive System', description: 'Automatically engages when needed to provide optimal traction and stability in various conditions.' },
      { title: 'Uconnect 7.0 with Navigation', description: 'Features a 7-inch touchscreen with turn-by-turn navigation, Apple CarPlay and Android Auto integration.' },
      { title: 'Blind Spot Monitoring', description: 'Alerts you when a vehicle enters your blind spot to help you change lanes safely.' },
      { title: 'ParkSense Rear Park Assist', description: 'Uses ultrasonic sensors to detect obstacles behind your vehicle while parking.' },
      { title: 'Lane Departure Warning', description: null },
      { title: 'Adaptive Cruise Control', description: null },
      { title: 'Automatic Headlamps', description: null },
      { title: 'Rain-Sensing Wipers', description: null },
      { title: 'Heated Front Seats', description: null },
      { title: 'Heated Steering Wheel', description: null }
    ],
    specifications: [
      {
        category: 'Engine & Performance',
        items: [
          { name: 'Engine', value: '1.3L MultiAir Turbo 4-Cylinder' },
          { name: 'Horsepower', value: '177 hp @ 5,500 rpm' },
          { name: 'Torque', value: '210 lb-ft @ 2,200 rpm' },
          { name: 'Transmission', value: '9-Speed Automatic' },
          { name: 'Drive Type', value: 'All-Wheel Drive' },
          { name: 'Fuel Economy', value: '24 City / 30 Highway / 26 Combined MPG' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { name: 'Length', value: '167.2 inches' },
          { name: 'Width', value: '70.7 inches' },
          { name: 'Height', value: '63.7 inches' },
          { name: 'Wheelbase', value: '101.2 inches' },
          { name: 'Cargo Volume', value: '14.1 cubic feet (39.8 with rear seats folded)' },
          { name: 'Ground Clearance', value: '7.9 inches' },
          { name: 'Curb Weight', value: '3,305 lbs' }
        ]
      },
      {
        category: 'Interior',
        items: [
          { name: 'Seating Capacity', value: '5 passengers' },
          { name: 'Front Headroom', value: '39.1 inches' },
          { name: 'Front Legroom', value: '41.4 inches' },
          { name: 'Rear Headroom', value: '37.8 inches' },
          { name: 'Rear Legroom', value: '34.8 inches' }
        ]
      }
    ]
  },
  {
    id: '3',
    make: 'FIAT',
    model: '500e',
    trim: 'La Prima',
    year: 2024,
    price: 32995,
    engine: 'Electric Motor',
    transmission: 'Single Speed Automatic',
    mpg: '142 MPGe',
    image: 'https://images.pexels.com/photos/12529805/pexels-photo-12529805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/12529805/pexels-photo-12529805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11320565/pexels-photo-11320565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11320571/pexels-photo-11320571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11320570/pexels-photo-11320570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'The all-new FIAT 500e represents the future of urban mobility with zero emissions and Italian style. This all-electric version of the iconic 500 combines sustainable driving with premium features and modern technology.\n\nThe La Prima trim offers a premium driving experience with a 42 kWh battery providing up to 199 miles of range, fast charging capability, and a host of high-end features.',
    featured: true,
    isNew: true,
    features: [
      { title: '42 kWh Battery', description: 'High-capacity battery providing up to 199 miles of range on a single charge.' },
      { title: 'Fast Charging Capability', description: 'Charges from 0-80% in just 35 minutes with a 85 kW fast charger.' },
      { title: '10.25-inch Infotainment System', description: 'High-resolution touchscreen with wireless Apple CarPlay and Android Auto integration.' },
      { title: 'Level 2 Autonomous Driving', description: 'Features including Traffic Jam Assist, Lane Centering, and Adaptive Cruise Control.' },
      { title: '360° Parking Sensors', description: null },
      { title: 'Premium Leather Interior', description: null },
      { title: 'Panoramic Glass Roof', description: null },
      { title: 'LED Matrix Headlights', description: null },
      { title: 'Wireless Smartphone Charging', description: null },
      { title: 'JBL Premium Audio System', description: null }
    ],
    specifications: [
      {
        category: 'Electric Drivetrain',
        items: [
          { name: 'Motor Type', value: 'Permanent Magnet Synchronous' },
          { name: 'Power', value: '118 hp (87 kW)' },
          { name: 'Torque', value: '162 lb-ft (220 Nm)' },
          { name: 'Battery Capacity', value: '42 kWh' },
          { name: 'Range', value: 'Up to 199 miles (WLTP)' },
          { name: 'Fast Charging', value: '0-80% in 35 minutes with 85 kW DC charger' },
          { name: 'Home Charging', value: '0-100% in 4.5 hours with 11 kW wallbox' }
        ]
      },
      {
        category: 'Performance',
        items: [
          { name: '0-62 mph (0-100 km/h)', value: '9.0 seconds' },
          { name: 'Top Speed', value: '93 mph (150 km/h)' },
          { name: 'Drive Type', value: 'Front-Wheel Drive' },
          { name: 'Driving Modes', value: 'Normal, Range, Sherpa' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { name: 'Length', value: '147.5 inches' },
          { name: 'Width', value: '66.3 inches' },
          { name: 'Height', value: '60.2 inches' },
          { name: 'Wheelbase', value: '94.5 inches' },
          { name: 'Cargo Volume', value: '7.1 cubic feet' },
          { name: 'Curb Weight', value: '2,998 lbs' }
        ]
      }
    ]
  },
  {
    id: '4',
    make: 'FIAT',
    model: '500L',
    trim: 'Urbana',
    year: 2022,
    price: 23495,
    msrp: 24995,
    engine: '1.4L MultiAir Turbo',
    transmission: '6-Speed Automatic',
    mpg: '22 City / 30 Hwy',
    image: 'https://images.pexels.com/photos/15799313/pexels-photo-15799313/free-photo-of-black-fiat-500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/15799313/pexels-photo-15799313/free-photo-of-black-fiat-500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/15799314/pexels-photo-15799314/free-photo-of-black-fiat-500-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9070534/pexels-photo-9070534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3166786/pexels-photo-3166786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'The FIAT 500L Urbana offers impressive interior space in a uniquely Italian package. This compact utility vehicle provides functionality for everyday life with distinctive design elements.\n\nThe Urbana trim features a turbocharged engine, stylish black accents, and a flexible interior that adapts to your lifestyle.',
    featured: false,
    isNew: false,
    features: [
      { title: 'Spacious Interior', description: 'Best-in-class interior volume with flexible seating configurations for up to 5 passengers.' },
      { title: 'BeatsAudio Premium Sound System', description: 'Six premium speakers and subwoofer deliver studio-quality sound throughout the cabin.' },
      { title: 'Dual-Pane Panoramic Sunroof', description: 'Extends over the front and rear seats for an open, airy driving experience.' },
      { title: 'ParkView Rear Backup Camera', description: 'Provides a wide-angle view of the area behind your vehicle when in reverse.' },
      { title: 'Uconnect 4 with 7-inch Display', description: null },
      { title: 'Apple CarPlay & Android Auto', description: null },
      { title: 'Heated Front Seats', description: null },
      { title: 'Urbana Appearance Package', description: null },
      { title: 'Tilt & Telescoping Steering Column', description: null },
      { title: 'Remote Start System', description: null }
    ],
    specifications: [
      {
        category: 'Engine & Performance',
        items: [
          { name: 'Engine', value: '1.4L MultiAir Turbo 4-Cylinder' },
          { name: 'Horsepower', value: '160 hp @ 5,500 rpm' },
          { name: 'Torque', value: '184 lb-ft @ 2,500 rpm' },
          { name: 'Transmission', value: '6-Speed Automatic' },
          { name: 'Drive Type', value: 'Front-Wheel Drive' },
          { name: 'Fuel Economy', value: '22 City / 30 Highway / 25 Combined MPG' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { name: 'Length', value: '166.6 inches' },
          { name: 'Width', value: '70.7 inches' },
          { name: 'Height', value: '65.4 inches' },
          { name: 'Wheelbase', value: '102.8 inches' },
          { name: 'Cargo Volume', value: '22.4 cubic feet (68.0 with rear seats folded)' },
          { name: 'Curb Weight', value: '3,254 lbs' }
        ]
      },
      {
        category: 'Interior',
        items: [
          { name: 'Seating Capacity', value: '5 passengers' },
          { name: 'Front Headroom', value: '40.7 inches' },
          { name: 'Front Legroom', value: '42.4 inches' },
          { name: 'Rear Headroom', value: '38.5 inches' },
          { name: 'Rear Legroom', value: '36.7 inches' }
        ]
      }
    ]
  },
  {
    id: '5',
    make: 'FIAT',
    model: '124 Spider',
    trim: 'Abarth',
    year: 2021,
    price: 29995,
    msrp: 31995,
    engine: '1.4L MultiAir Turbo',
    transmission: '6-Speed Manual',
    mpg: '26 City / 35 Hwy',
    image: 'https://images.pexels.com/photos/19111895/pexels-photo-19111895/free-photo-of-red-fiat-124-spider-parked-in-front-of-a-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/19111895/pexels-photo-19111895/free-photo-of-red-fiat-124-spider-parked-in-front-of-a-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/19111905/pexels-photo-19111905/free-photo-of-red-fiat-124-spider-parked-on-asphalt-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/19111898/pexels-photo-19111898/free-photo-of-red-fiat-124-spider-on-asphalt-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/19111900/pexels-photo-19111900/free-photo-of-front-of-a-parked-red-fiat-124-spider.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'The FIAT 124 Spider Abarth delivers the pure joy of open-top Italian motoring. This two-seat roadster combines classic styling with modern performance for an exhilarating driving experience.\n\nThe Abarth trim elevates performance with a sport-tuned suspension, limited-slip differential, and distinctive styling elements that pay homage to FIATs racing heritage.',
    featured: true,
    isNew: false,
    features: [
      { title: 'Abarth-Tuned Sport Suspension', description: 'Features Bilstein performance shock absorbers for enhanced handling and control.' },
      { title: 'Sport Mode Selector', description: 'Adjusts throttle response and steering calibration for a more dynamic driving experience.' },
      { title: 'Limited-Slip Differential', description: 'Optimizes traction by limiting wheel slip to provide better stability during cornering.' },
      { title: 'Brembo Performance Brakes', description: 'Four-piston front calipers and performance rotors provide superior stopping power.' },
      { title: 'Recaro Sport Seats', description: null },
      { title: 'Record Monza Exhaust', description: null },
      { title: 'Alcantara Interior Trim', description: null },
      { title: 'Soft-Touch Convertible Top', description: null },
      { title: '7-inch Touchscreen Display', description: null },
      { title: 'Bose Premium Audio System', description: null }
    ],
    specifications: [
      {
        category: 'Engine & Performance',
        items: [
          { name: 'Engine', value: '1.4L MultiAir Turbo 4-Cylinder' },
          { name: 'Horsepower', value: '164 hp @ 5,500 rpm' },
          { name: 'Torque', value: '184 lb-ft @ 2,500 rpm' },
          { name: 'Transmission', value: '6-Speed Manual (6-Speed Automatic available)' },
          { name: 'Drive Type', value: 'Rear-Wheel Drive' },
          { name: 'Fuel Economy', value: '26 City / 35 Highway / 30 Combined MPG (Manual)' }
        ]
      },
      {
        category: 'Performance Specs',
        items: [
          { name: '0-60 mph', value: '6.4 seconds' },
          { name: 'Top Speed', value: '144 mph' },
          { name: 'Braking 60-0 mph', value: '112 feet' },
          { name: 'Quarter Mile', value: '14.8 seconds @ 95 mph' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { name: 'Length', value: '159.6 inches' },
          { name: 'Width', value: '68.5 inches' },
          { name: 'Height', value: '48.5 inches' },
          { name: 'Wheelbase', value: '90.9 inches' },
          { name: 'Cargo Volume', value: '4.9 cubic feet' },
          { name: 'Curb Weight', value: '2,477 lbs (Manual)' }
        ]
      }
    ]
  },
  {
    id: '6',
    make: 'FIAT',
    model: '500 Abarth',
    trim: 'Competizione',
    year: 2023,
    price: 26495,
    engine: '1.4L MultiAir Turbo',
    transmission: '5-Speed Manual',
    mpg: '24 City / 32 Hwy',
    image: 'https://images.pexels.com/photos/15799316/pexels-photo-15799316/free-photo-of-green-fiat-500-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/15799316/pexels-photo-15799316/free-photo-of-green-fiat-500-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/15799317/pexels-photo-15799317/free-photo-of-green-fiat-500-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/19033824/pexels-photo-19033824/free-photo-of-a-white-fiat-500-parked-beside-a-sidewalk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3166785/pexels-photo-3166785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'The FIAT 500 Abarth Competizione delivers scorpion-stung performance in a compact package. This high-performance version of the iconic 500 offers a thrilling driving experience with its turbocharged engine and sport-tuned chassis.\n\nThe Competizione trim includes exclusive performance upgrades and distinctive styling elements that set it apart from the standard 500.',
    featured: false,
    isNew: false,
    features: [
      { title: 'Abarth-Tuned 1.4L Turbo Engine', description: 'Delivers 160 horsepower and 170 lb-ft of torque for exceptional performance.' },
      { title: 'Torque Transfer Control', description: 'Electronic differential that improves handling and traction during aggressive driving.' },
      { title: 'Performance-Tuned Suspension', description: 'Features Koni shock absorbers and stiffer springs for enhanced handling.' },
      { title: 'Abarth Sport Seats', description: 'Provide excellent support during spirited driving with premium leather and Alcantara upholstery.' },
      { title: 'High-Performance Braking System', description: null },
      { title: 'Sport-Tuned Exhaust', description: null },
      { title: '17-inch Forged Aluminum Wheels', description: null },
      { title: 'Red Brake Calipers', description: null },
      { title: 'Sport Steering Wheel with Flat Bottom', description: null },
      { title: 'Abarth Performance Telemetry', description: null }
    ],
    specifications: [
      {
        category: 'Engine & Performance',
        items: [
          { name: 'Engine', value: '1.4L MultiAir Turbo 4-Cylinder' },
          { name: 'Horsepower', value: '160 hp @ 5,500 rpm' },
          { name: 'Torque', value: '170 lb-ft @ 2,500 rpm' },
          { name: 'Transmission', value: '5-Speed Manual (6-Speed Automatic available)' },
          { name: 'Drive Type', value: 'Front-Wheel Drive' },
          { name: 'Fuel Economy', value: '24 City / 32 Highway / 27 Combined MPG (Manual)' }
        ]
      },
      {
        category: 'Performance Specs',
        items: [
          { name: '0-60 mph', value: '6.9 seconds' },
          { name: 'Top Speed', value: '130 mph' },
          { name: 'Braking 60-0 mph', value: '115 feet' },
          { name: 'Lateral Acceleration', value: '0.90g' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { name: 'Length', value: '144.4 inches' },
          { name: 'Width', value: '64.1 inches' },
          { name: 'Height', value: '58.7 inches' },
          { name: 'Wheelbase', value: '90.6 inches' },
          { name: 'Cargo Volume', value: '9.5 cubic feet' },
          { name: 'Curb Weight', value: '2,512 lbs (Manual)' }
        ]
      }
    ]
  }
];

export const getCars = (): Car[] => {
  return cars;
};

export const getCarById = (id: string): Car | undefined => {
  return cars.find(car => car.id === id);
};
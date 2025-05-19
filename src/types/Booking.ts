export interface TestDriveBooking {
  id: string;
  carId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  location: string;
  comments?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ServiceBooking {
  id: string;
  carDetails: {
    make: string;
    model: string;
    year: string;
    mileage?: string;
    vin?: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  location: string;
  services: string[];
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
}
export interface Car {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  msrp?: number;
  engine: string;
  transmission: string;
  mpg: string;
  image: string;
  images: string[];
  description: string;
  featured: boolean;
  isNew: boolean;
  features: {
    title: string;
    description: string | null;
  }[];
  specifications: {
    category: string;
    items: {
      name: string;
      value: string;
    }[];
  }[];
}
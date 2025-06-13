export interface CarPart {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  compatibility: string[];
  image: string;
  images?: string[];
  stockQuantity: number;
  brand: string;
  partNumber: string;
  isAccessory: boolean;
}
export interface Order {
  id: string;
  user_id: string;
  part_id: string;
  quantity: number;
  total_price: number;
  shipping_address: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
}
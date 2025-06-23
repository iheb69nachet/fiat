import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Order } from '../types/Order';
import { CarPart } from '../types/CarPart';
import { CheckCircle2 } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [part, setPart] = useState<CarPart | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }

        // Get the latest order for the current user
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (orderError) throw orderError;
        if (!orderData) {
          navigate('/');
          return;
        }

        setOrder(orderData);

        // Fetch the part details
        const { data: partData, error: partError } = await supabase
          .from('car_parts')
          .select('*')
          .eq('id', orderData.part_id)
          .single();

        if (partError) throw partError;
        setPart(partData);
      } catch (err) {
        setError('Failed to fetch order details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [navigate]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !order || !part) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-red-500">{error || 'Order not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-green-500">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <img src={part.image} alt={part.name} className="w-24 h-24 object-cover rounded" />
            <div>
              <h3 className="font-semibold">{part.name}</h3>
              <p className="text-gray-600">{part.price} DT × {order.quantity}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order ID</span>
              <span>{order.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Status</span>
              <span className="capitalize">{order.status}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping Address</span>
              <span className="text-right">{order.shipping_address}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Date</span>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span>{order.total_price.toFixed(2)} DT</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/car-parts')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
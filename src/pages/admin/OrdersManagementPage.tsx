import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Order } from '../../types/Order';
import { CarPart } from '../../types/CarPart';
import { Eye, Package } from 'lucide-react';

interface OrderWithDetails extends Order {
  car_part: CarPart;
}

const OrdersManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          car_part:car_parts(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
      await fetchOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={order.car_part.image}
                        alt={order.car_part.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{order.car_part.name}</div>
                      <div className="text-sm text-gray-500">Qty: {order.quantity}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.shipping_address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.total_price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="text-sm rounded-full px-3 py-1 font-semibold"
                    style={{
                      backgroundColor: {
                        pending: '#FEF3C7',
                        processing: '#DBEAFE',
                        shipped: '#D1FAE5',
                        delivered: '#ECFDF5'
                      }[order.status],
                      color: {
                        pending: '#92400E',
                        processing: '#1E40AF',
                        shipped: '#065F46',
                        delivered: '#064E3B'
                      }[order.status]
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsViewModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isViewModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Product</h4>
                <div className="flex items-center mt-2">
                  <img
                    src={selectedOrder.car_part.image}
                    alt={selectedOrder.car_part.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-medium">{selectedOrder.car_part.name}</p>
                    <p className="text-sm text-gray-500">${selectedOrder.car_part.price} × {selectedOrder.quantity}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium">Shipping Address</h4>
                <p className="text-gray-600 mt-1">{selectedOrder.shipping_address}</p>
              </div>
              <div>
                <h4 className="font-medium">Order Status</h4>
                <p className="text-gray-600 mt-1 capitalize">{selectedOrder.status}</p>
              </div>
              <div>
                <h4 className="font-medium">Order Date</h4>
                <p className="text-gray-600 mt-1">
                  {new Date(selectedOrder.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-semibold">${selectedOrder.total_price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagementPage;
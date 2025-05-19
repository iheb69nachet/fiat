import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Service } from '../../types/Service';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';

const ServicesManagementPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;

      setServices(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setIsEditing(true);
    setEditingService(service);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(services.filter(service => service.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSave = async () => {
    if (!editingService) return;

    try {
      if (editingService.id) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(editingService)
          .eq('id', editingService.id);

        if (error) throw error;
      } else {
        // Create new service
        const { error } = await supabase
          .from('services')
          .insert([editingService]);

        if (error) throw error;
      }

      setIsEditing(false);
      setEditingService(null);
      fetchServices();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD1D21]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services Management</h1>
        <button
          onClick={() => {
            setIsEditing(true);
            setEditingService({});
          }}
          className="bg-[#DD1D21] text-white px-4 py-2 rounded-md hover:bg-[#B51419] transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Service
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          {error}
        </div>
      )}

      {isEditing ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingService?.id ? 'Edit Service' : 'Add New Service'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editingService?.name || ''}
                onChange={e => setEditingService({ ...editingService, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DD1D21] focus:ring focus:ring-[#DD1D21] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={editingService?.category || ''}
                onChange={e => setEditingService({ ...editingService, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DD1D21] focus:ring focus:ring-[#DD1D21] focus:ring-opacity-50"
              >
                <option value="">Select a category</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Inspection">Inspection</option>
                <option value="Fluids">Fluids</option>
                <option value="Specialty">Specialty</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={editingService?.description || ''}
                onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DD1D21] focus:ring focus:ring-[#DD1D21] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={editingService?.price || ''}
                onChange={e => setEditingService({ ...editingService, price: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DD1D21] focus:ring focus:ring-[#DD1D21] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estimated Time</label>
              <input
                type="text"
                value={editingService?.estimated_time || ''}
                onChange={e => setEditingService({ ...editingService, estimated_time: e.target.value })}
                placeholder="e.g. 1 hour"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DD1D21] focus:ring focus:ring-[#DD1D21] focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleSave}
              className="bg-[#DD1D21] text-white px-4 py-2 rounded-md hover:bg-[#B51419] transition-colors flex items-center"
            >
              <Check size={20} className="mr-2" />
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingService(null);
              }}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center"
            >
              <X size={20} className="mr-2" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Est. Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map(service => (
                <tr key={service.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-500">{service.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${service.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.estimated_time}
                  </td>
                  <td className="px-6  py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-[#DD1D21] hover:text-[#B51419] mr-3"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServicesManagementPage;
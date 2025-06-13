import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { CarPart } from '../../types/CarPart';
import { Pencil, Trash2, Plus, Check, X, Image } from 'lucide-react';

const CarPartsManagementPage: React.FC = () => {
  const [parts, setParts] = useState<CarPart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPart, setEditingPart] = useState<Partial<CarPart> | null>(null);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const { data, error } = await supabase
        .from('car_parts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setParts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (part: CarPart) => {
    setIsEditing(true);
    setEditingPart(part);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this part?')) return;

    try {
      const { error } = await supabase
        .from('car_parts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setParts(parts.filter(part => part.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPart) return;

    try {
      if (editingPart.id) {
        // Update existing part
        const { error } = await supabase
          .from('car_parts')
          .update(editingPart)
          .eq('id', editingPart.id);

        if (error) throw error;

        setParts(parts.map(part =>
          part.id === editingPart.id ? { ...part, ...editingPart } : part
        ));
      } else {
        // Create new part
        const { data, error } = await supabase
          .from('car_parts')
          .insert([editingPart])
          .select();

        if (error) throw error;
        if (data) setParts([data[0], ...parts]);
      }

      setIsEditing(false);
      setEditingPart(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingPart(prev => prev ? { ...prev, [name]: value } : null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Car Parts Management</h1>
        <button
          onClick={() => {
            setIsEditing(true);
            setEditingPart({
              name: '',
              description: '',
              price: 0,
              category: '',
              compatibility: [],
              image: '',
              images: [],
              stock_quantity: 0,
              brand: '',
              part_number: '',
              is_accessory: false
            });
          }}
          className="bg-[#DD1D21] text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Part
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {isEditing && editingPart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingPart.id ? 'Edit Part' : 'Add New Part'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingPart.name || ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={editingPart.brand || ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Part Number</label>
                  <input
                    type="text"
                    name="part_number"
                    value={editingPart.part_number || ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editingPart.price || ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock_quantity"
                    value={editingPart.stock_quantity || ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={editingPart.category || ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Engine">Engine Parts</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Interior">Interior</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={editingPart.description || ''}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={editingPart.image || ''}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingPart(null);
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 flex items-center gap-2"
                >
                  <X size={20} />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#DD1D21] text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <Check size={20} />
                  {editingPart.id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD1D21] mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parts.map(part => (
            <div key={part.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
              <img
                src={part.image}
                alt={part.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{part.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{part.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">${part.price}</span>
                  <span className="text-sm text-gray-500">Stock: {part.stock_quantity}</span>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(part)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(part.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarPartsManagementPage;
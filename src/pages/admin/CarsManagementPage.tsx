import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Car } from '../../types/Car';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';

const CarsManagementPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCar, setEditingCar] = useState<Partial<Car> | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car: Car) => {
    setIsEditing(true);
    setEditingCar(car);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;

      setCars(cars.filter(car => car.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64Image = await convertToBase64(file);
      setEditingCar(prev => ({
        ...prev,
        image: base64Image
      }));
    } catch {
      setError('Error uploading image. Please try again.');
    }
  };

  const handleAdditionalImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const base64Images = await Promise.all(
        Array.from(files).map(file => convertToBase64(file))
      );
      setEditingCar(prev => ({
        ...prev,
        images: base64Images
      }));
    } catch {
      setError('Error uploading additional images. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!editingCar) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('cars')
        .upsert([
          {
            ...editingCar,
            updated_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      await fetchCars();
      setIsEditing(false);
      setEditingCar(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
        <h1 className="text-2xl font-bold">Cars Management</h1>
        <button
          onClick={() => {
            setIsEditing(true);
            setEditingCar({ make: 'FIAT' });
          }}
          className="bg-[#DD1D21] text-white px-4 py-2 rounded-md hover:bg-[#B51419] transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Car
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          {error}
        </div>
      )}

      {isEditing && editingCar ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingCar.id ? 'Edit Car' : 'Add New Car'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Standard Fields */}
            {[
              ['Make', 'make'],
              ['Model', 'model'],
              ['Trim', 'trim'],
              ['Engine', 'engine'],
              ['Transmission', 'transmission'],
              ['MPG', 'mpg'],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="text"
                  disabled={label=="Make"}
                  value={(editingCar as any)[key] || ''}
                  onChange={e => setEditingCar({ ...editingCar, [key]: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DD1D21] focus:ring-[#DD1D21] focus:ring-opacity-50"
                />
              </div>
            ))}

            {/* Numeric Fields */}
            {[
              ['Year', 'year'],
              ['Price', 'price'],
              ['MSRP', 'msrp'],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="number"
                  value={(editingCar as any)[key] || ''}
                  onChange={e => setEditingCar({ ...editingCar, [key]: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DD1D21] focus:ring-[#DD1D21] focus:ring-opacity-50"
                />
              </div>
            ))}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Main Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesUpload}
                className="mt-1 block w-full"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={editingCar.description || ''}
                onChange={e => setEditingCar({ ...editingCar, description: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DD1D21] focus:ring-[#DD1D21] focus:ring-opacity-50"
              />
            </div>

            {/* Featured Checkbox */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingCar.featured || false}
                  onChange={e => setEditingCar({ ...editingCar, featured: e.target.checked })}
                  className="rounded border-gray-300 text-[#DD1D21] focus:ring-[#DD1D21]"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>
          </div>

          {/* Save / Cancel */}
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
                setEditingCar(null);
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cars.map(car => (
                <tr key={car.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{car.year} {car.make} {car.model}</div>
                        <div className="text-sm text-gray-500">{car.trim}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${car.price.toLocaleString()}</div>
                    {car.msrp && (
                      <div className="text-sm text-gray-500">MSRP: ${car.msrp.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(car)} className="text-[#DD1D21] hover:text-[#B51419] mr-3">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(car.id)} className="text-red-600 hover:text-red-900">
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

export default CarsManagementPage;

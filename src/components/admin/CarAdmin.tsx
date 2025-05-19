import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Car } from '../../types/Car';

export default function CarAdmin() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Car>>({
    make: '',
    model: '',
    trim: '',
    year: new Date().getFullYear(),
    price: 0,
    engine: '',
    transmission: '',
    mpg: '',
    image: '',
    images: [],
    description: '',
    featured: false,
    isNew: false,
    features: [],
    specifications: []
  });

  // CRUD Operations
  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('cars')
        .insert([formData])
        .select();

      if (error) throw error;
      setCars([...cars, data[0]]);
      setFormData({}); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCar = async (id: string, updates: Partial<Car>) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      setCars(cars.map(car => car.id === id ? data[0] : car));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteCar = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCars(cars.filter(car => car.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Car Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Car List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cars</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map(car => (
              <div key={car.id} className="border rounded p-4">
                <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover mb-4" />
                <h3 className="font-semibold">{car.make} {car.model}</h3>
                <p className="text-gray-600">{car.year} {car.trim}</p>
                <p className="text-green-600 font-semibold">${car.price.toLocaleString()}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => setFormData(car)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCar(car.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Car Form */}
      <div className="bg-gray-50 p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">
          {formData.id ? 'Edit Car' : 'Add New Car'}
        </h2>
        <form onSubmit={createCar} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Make"
              value={formData.make || ''}
              onChange={e => setFormData({ ...formData, make: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Model"
              value={formData.model || ''}
              onChange={e => setFormData({ ...formData, model: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Trim"
              value={formData.trim || ''}
              onChange={e => setFormData({ ...formData, trim: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={formData.year || ''}
              onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="border rounded p-2"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price || ''}
              onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Engine"
              value={formData.engine || ''}
              onChange={e => setFormData({ ...formData, engine: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Transmission"
              value={formData.transmission || ''}
              onChange={e => setFormData({ ...formData, transmission: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="MPG"
              value={formData.mpg || ''}
              onChange={e => setFormData({ ...formData, mpg: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image || ''}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              className="border rounded p-2"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              Featured
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isNew || false}
                onChange={e => setFormData({ ...formData, isNew: e.target.checked })}
                className="mr-2"
              />
              New
            </label>
          </div>

          <textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="border rounded p-2 w-full"
            rows={4}
            required
          />

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {formData.id ? 'Update Car' : 'Add Car'}
          </button>
        </form>
      </div>
    </div>
  );
}
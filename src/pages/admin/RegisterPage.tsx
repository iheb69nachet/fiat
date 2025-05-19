import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    inviteCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // In a real application, you would validate the invite code against a database
    if (formData.inviteCode !== 'FIAT2024') { // Example invite code
      setError('Invalid invite code');
      return;
    }

    setLoading(true);

    try {
      // Check if user already exists
      const { data: existingUser, error: userCheckError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (existingUser?.user) {
        setError('An account with this email already exists. Please use a different email or login.');
        setLoading(false);
        return;
      }

      // Register the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: 'admin'
          }
        }
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('An account with this email already exists. Please use a different email or login.');
          return;
        }
        throw authError;
      }

      if (!authData.user?.id) {
        throw new Error('Failed to create user account');
      }

      // Create admin profile in the database
      const { error: profileError } = await supabase
        .from('admin_profiles')
        .insert([
          {
            user_id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email
          }
        ]);

      if (profileError) {
        // If profile creation fails, attempt to delete the auth user to maintain consistency
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw new Error('Failed to create admin profile. Please try again.');
      }

      // Redirect to login page with success message
      navigate('/admin/login', { 
        state: { 
          message: 'Registration successful! Please check your email to confirm your account before logging in.' 
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <Car className="h-12 w-12 text-[#DD1D21]" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Registration</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your admin account to manage FIAT services
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DD1D21] focus:border-[#DD1D21]"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DD1D21] focus:border-[#DD1D21]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DD1D21] focus:border-[#DD1D21]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DD1D21] focus:border-[#DD1D21]"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DD1D21] focus:border-[#DD1D21]"
              />
            </div>

            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700">
                Invite Code
              </label>
              <input
                id="inviteCode"
                name="inviteCode"
                type="text"
                required
                value={formData.inviteCode}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DD1D21] focus:border-[#DD1D21]"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the invite code provided by your administrator
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#DD1D21] hover:bg-[#B51419]'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DD1D21]
              `}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
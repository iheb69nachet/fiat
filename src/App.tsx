import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import TestDrivePage from './pages/TestDrivePage';
import ServicePage from './pages/ServicePage';
import LoginPage from './pages/admin/LoginPage';
import RegisterPage from './pages/admin/RegisterPage';
import DashboardPage from './pages/admin/DashboardPage';
import CarsManagementPage from './pages/admin/CarsManagementPage';
import ServicesManagementPage from './pages/admin/ServicesManagementPage';
import TestDrivesManagementPage from './pages/admin/TestDrivesManagementPage';
import ServiceBookingsManagementPage from './pages/admin/ServiceBookingsManagementPage';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider } from './lib/auth';
import './App.css';
import CarPartsPage from './pages/CarPartsPage';
import CarPartsManagementPage from './pages/admin/CarPartsManagementPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
// Add import
import OrdersManagementPage from './pages/admin/OrdersManagementPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/register" element={<RegisterPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Navigate to="/admin/dashboard" replace />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <DashboardPage />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/cars" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <CarsManagementPage />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/services" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ServicesManagementPage />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/test-drives" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <TestDrivesManagementPage />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/service-bookings" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ServiceBookingsManagementPage />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <OrdersManagementPage />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <HomePage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/cars"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <CarsPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/cars/:id"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <CarDetailsPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/test-drive"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <TestDrivePage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/service"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <ServicePage />
                </main>
                <Footer />
              </>
            }
          />
          <Route path="/car-parts" element={<>
            <Header />
                <main className="flex-grow">
                  <CarPartsPage />
                </main>
                <Footer />
          </>} />
          // Add this route in the admin routes section
          <Route 
            path="/admin/car-parts" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <CarPartsManagementPage />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
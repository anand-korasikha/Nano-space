import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import Layout from './components/layout/Layout';
import './styles/responsive.css';

// Eagerly load Home for fast first-paint
import Home from './pages/Home';

// Lazy load all other pages — each becomes its own JS chunk
const Coworking = lazy(() => import('./pages/Coworking'));
const CityCoworking = lazy(() => import('./pages/CityCoworking'));
const CoworkingSpaceDetails = lazy(() => import('./components/coworking/CoworkingSpaceDetails'));
const Coliving = lazy(() => import('./pages/Coliving'));
const CityColiving = lazy(() => import('./pages/CityColiving'));
const ColivingSpaceDetails = lazy(() => import('./components/coliving/ColivingSpaceDetails'));
const VirtualOffice = lazy(() => import('./pages/VirtualOffice'));
const CityVirtualOffice = lazy(() => import('./pages/CityVirtualOffice'));
const OfficeSpaces = lazy(() => import('./pages/OfficeSpaces'));
const Login = lazy(() => import('./pages/Login'));
const HotelRooms = lazy(() => import('./pages/HotelRooms'));
const EventSpaces = lazy(() => import('./pages/EventSpaces'));
const PartyHalls = lazy(() => import('./pages/PartyHalls'));
const PrivateTheatres = lazy(() => import('./pages/PrivateTheatres'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const Sell = lazy(() => import('./pages/Sell'));
const Buy = lazy(() => import('./pages/Buy'));
const Rent = lazy(() => import('./pages/Rent'));
const OtherServices = lazy(() => import('./pages/OtherServices'));
const ServiceCategory = lazy(() => import('./pages/ServiceCategory'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'));
const OwnerDashboard = lazy(() => import('./pages/OwnerDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Simple full-page loading fallback
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div style={{ width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);


function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="coworking" element={<Coworking />} />
          <Route path="coworking/:cityName" element={<CityCoworking />} />
          <Route path="coworking/space/:city/:spaceId" element={<CoworkingSpaceDetails />} />
          <Route path="coliving" element={<Coliving />} />
          <Route path="coliving/:cityName" element={<CityColiving />} />
          <Route path="coliving/space/:city/:spaceId" element={<ColivingSpaceDetails />} />
          <Route path="virtual-office" element={<VirtualOffice />} />
          <Route path="virtual-office/:cityName" element={<CityVirtualOffice />} />
          <Route path="business-plans/:cityName" element={<OfficeSpaces />} />
          <Route path="business-plans" element={<OfficeSpaces />} />
          <Route path="hotel-rooms" element={<HotelRooms />} />
          <Route path="event-spaces" element={<EventSpaces />} />
          <Route path="party-halls" element={<PartyHalls />} />
          <Route path="private-theatres" element={<PrivateTheatres />} />
          <Route path="property/:propertyId" element={<PropertyDetails />} />
          <Route path="sell" element={<Sell />} />
          <Route path="buy" element={<Buy />} />
          <Route path="rent" element={<Rent />} />
          <Route path="other-services" element={<OtherServices />} />
          <Route path="services/:category" element={<ServiceCategory />} />
          <Route path="login" element={<Login />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="dashboard/customer"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/owner"
            element={
              <ProtectedRoute requiredRole="owner">
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;

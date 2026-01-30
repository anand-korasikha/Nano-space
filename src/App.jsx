import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Coworking from './pages/Coworking';
import CityCoworking from './pages/CityCoworking';
import CoworkingSpaceDetails from './components/coworking/CoworkingSpaceDetails';
import Coliving from './pages/Coliving';
import CityColiving from './pages/CityColiving';
import ColivingSpaceDetails from './components/coliving/ColivingSpaceDetails';
import VirtualOffice from './pages/VirtualOffice';
import CityVirtualOffice from './pages/CityVirtualOffice';
import OfficeSpaces from './pages/OfficeSpaces';
import Login from './pages/Login';
import HotelRooms from './pages/HotelRooms';
import EventSpaces from './pages/EventSpaces';
import PartyHalls from './pages/PartyHalls';
import PrivateTheatres from './pages/PrivateTheatres';
import PropertyDetails from './pages/PropertyDetails';
import Sell from './pages/Sell';
import Buy from './pages/Buy';
import OtherServices from './pages/OtherServices';
import ServiceCategory from './pages/ServiceCategory';
import CustomerDashboard from './pages/CustomerDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './styles/responsive.css';


function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
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
    </AuthProvider>
  );
}

export default App;

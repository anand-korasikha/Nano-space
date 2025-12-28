import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Coworking from './pages/Coworking';
import CityCoworking from './pages/CityCoworking';
import Coliving from './pages/Coliving';
import VirtualOffice from './pages/VirtualOffice';
import CityVirtualOffice from './pages/CityVirtualOffice';
import BusinessPlans from './pages/BusinessPlans';
import Login from './pages/Login';
import HotelRooms from './pages/HotelRooms';
import EventSpaces from './pages/EventSpaces';
import PartyHalls from './pages/PartyHalls';
import PrivateTheatres from './pages/PrivateTheatres';
import './styles/responsive.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="coworking" element={<Coworking />} />
        <Route path="coworking/:cityName" element={<CityCoworking />} />
        <Route path="coliving" element={<Coliving />} />
        <Route path="virtual-office" element={<VirtualOffice />} />
        <Route path="virtual-office/:cityName" element={<CityVirtualOffice />} />
        <Route path="business-plans" element={<BusinessPlans />} />
        <Route path="hotel-rooms" element={<HotelRooms />} />
        <Route path="event-spaces" element={<EventSpaces />} />
        <Route path="party-halls" element={<PartyHalls />} />
        <Route path="private-theatres" element={<PrivateTheatres />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;

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
      </Route>
    </Routes>
  );
}

export default App;

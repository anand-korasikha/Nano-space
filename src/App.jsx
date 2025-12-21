import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Coworking from './pages/Coworking';
import Coliving from './pages/Coliving';
import VirtualOffice from './pages/VirtualOffice';
import BusinessPlans from './pages/BusinessPlans';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="coworking" element={<Coworking />} />
        <Route path="coliving" element={<Coliving />} />
        <Route path="virtual-office" element={<VirtualOffice />} />
        <Route path="business-plans" element={<BusinessPlans />} />
      </Route>
    </Routes>
  );
}

export default App;

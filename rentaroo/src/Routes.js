import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Catalog from './pages/Catalog';

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/vehicles" element={<Catalog />} />
      {/* Add more routes for other pages as needed */}
    </Routes>
  );
};

export default AppRoutes;

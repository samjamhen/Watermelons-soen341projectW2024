import React from 'react';
import Home from './pages/Home'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import './App.css';

// Import BrowseVehicles component
import CatalogPage from './pages/CatalogPage';
import ReservationPage from './pages/ReservationPage';

function App() {
  return (
    <Router>
      <div className="App">
        
        <header className="App-header">
        
        </header>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Catalog" element={<CatalogPage />} /> 
          <Route path="/Home" element={<Home />} /> 
          <Route path="/Reservation" element={<ReservationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

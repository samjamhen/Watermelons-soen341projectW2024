import React from 'react';
import Home from './pages/Home'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import './App.css';

// Import BrowseVehicles component
import CatalogPage from './pages/CatalogPage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

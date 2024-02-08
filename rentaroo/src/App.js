import React from 'react';
import Home from './pages/Home'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import Admin from './pages/Admin';
import ClientManagement from './pages/ClientManagement';



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
          <Route path="/Admin" element={<Admin />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

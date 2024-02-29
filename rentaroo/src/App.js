import React from 'react';
import Home from './pages/Home'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CatalogPage from './pages/CatalogPage';
import Admin from './pages/SystemAdministrator/Admin';
import ReservationPage from './pages/ReservationPage';
import ClientsManagement from './pages/SystemAdministrator/Clients/ClientsManagement';
import ClientCard from './components/SystemAdministrator/ClientCard';
import VehiclesManagement from './pages/SystemAdministrator/Vehicules/VehiclesManagement';
// import VehiclesManagement from './pages/SystemAdministrator/Vehicles/VehiclesManagement';
import ReservationsManagement from './pages/SystemAdministrator/Reservations/ReservationsManagement';
import ClientForm from './pages/SystemAdministrator/Clients/ClientForm';

//import './App.css';


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
          <Route path="/ReservationPage" element={<ReservationPage/>} />
          <Route path="/Admin" element = {<Admin/>} />
        </Routes>

        <Routes>
          <Route  path="/ClientsManagement" element={<ClientsManagement/>} />
          <Route  path="/ReservationsManagement" element={<ReservationsManagement/>} />
          <Route  path="/VehiclesManagement" element={<VehiclesManagement/>} />
          <Route  path="/ClientForm" element={<ClientForm/>}/>
        </Routes>

        
      </div>
    </Router>
  );
}

export default App;

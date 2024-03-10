import React from 'react';
import Home from './pages/Home'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CatalogPage from './pages/CatalogPage';
import Admin from './pages/SystemAdministrator/Admin';
import ReservationPage from './pages/ReservationPage';
import ClientsManagement from './pages/SystemAdministrator/Clients/ClientsManagement';
import ClientCard from './components/SystemAdministrator/ClientCard';
import VehiclesManagement from './pages/SystemAdministrator/Vehicules/VehiclesManagement';
import ReservationsManagement from './pages/SystemAdministrator/Reservations/ReservationsManagement';
import ClientForm from './pages/SystemAdministrator/Clients/ClientForm';
import VehicleForm from './pages/SystemAdministrator/Vehicules/VehicleForm';
import StartReservation from './pages/StartReservation';
import ViewReservationPage from "./pages/ViewReservationPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";



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
          {/* <Route exact path="/HomeCustomer" element={<HomeCustomer />} />
          <Route exact path="/HomeCSR" element={<HomeCSR />} />
          <Route exact path="/HomeAdmin" element={<HomeAdmin />} /> */}





          
          <Route path="/ReservationPage" element={<ReservationPage/>} />
          <Route path="/Admin" element = {<Admin/>} />
          <Route path="/ViewReservationPage" element ={<ViewReservationPage/>} />
          <Route path="/Login"  element={<Login/>} />
          <Route path="/Signup"  element={<Signup/>} />

          
        </Routes>

        <Routes>
          <Route  path="/UsersManagement" element={<ClientsManagement/>} />
          <Route  path="/ReservationsManagement" element={<ReservationsManagement/>} />
          <Route  path="/VehiclesManagement" element={<VehiclesManagement/>} />
          <Route  path="/ClientForm" element={<ClientForm/>}/>
          <Route  path="/VehicleForm" element={<VehicleForm/>}/>
          <Route  path="/StartReservation" element={<StartReservation/>}/>

        </Routes>

        
      </div>
    </Router>
  );
}

export default App;

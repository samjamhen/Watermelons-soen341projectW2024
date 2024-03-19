import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home'; 
import CatalogPage from './pages/CatalogPage';
import StartReservation from './pages/StartReservation';
import ViewReservationPage from "./pages/ViewReservationPage";
import TermsAndConditions from './pages/TermsAndConditions';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Admin from './pages/SystemAdministrator/Admin';
import ReservationPage from './pages/ReservationPage';
import ClientsManagement from './pages/SystemAdministrator/Clients/ClientsManagement';
import ClientCard from './components/SystemAdministrator/ClientCard';
import VehiclesManagement from './pages/SystemAdministrator/Vehicules/VehiclesManagement';
import ReservationsManagement from './pages/SystemAdministrator/Reservations/ReservationsManagement';
import ClientForm from './pages/SystemAdministrator/Clients/ClientForm';
import VehicleForm from './pages/SystemAdministrator/Vehicules/VehicleForm';
import ConfirmationPage from './components/Confirmation';

import HomeCustomer from "./pages/Customer/CustomerHome";
import HomeCSR from "./pages/Service_rep/ServiceHome";
import HomeAdmin from "./pages/SystemAdministrator/AdminHome";

import Branch from './pages/Branch';

import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <div className="App">
        
        <header className="App-header">
        </header>

        <Routes>
          <Route path="/" element={user ? (
            user.user.userType === 'client' ? <HomeCustomer /> :
            user.user.userType === 'customer_representative' ? <HomeCSR /> :
            user.user.userType === 'system_administrator' ? <HomeAdmin /> :
            <Navigate to="/Home" />) : <Navigate to="/Home" />} 
          />
          <Route path="/Home" element={<Home />} />
          <Route path="/Catalog" element={<CatalogPage />} /> 
          <Route path="/HomeCustomer" element={ user ? (
            user.user.userType === 'client' ? <HomeCustomer /> :
            <Navigate to="/" /> ) : <Navigate to="/Home" />} 
          />
          <Route path="/HomeCSR" element={ user ? (
            user.user.userType === 'customer_representative' ? <HomeCSR /> :
            <Navigate to="/" /> ) : <Navigate to="/Home" />} 
          />
          <Route path="/HomeAdmin" element={ user ? (
            user.user.userType === 'system_administrator' ? <HomeAdmin /> :
            <Navigate to="/" /> ) : <Navigate to="/Home" />}
          />

          <Route path="/ReservationPage" element={user ? <ReservationPage/> : <Navigate to="/Login"/>} />





          <Route path="/Admin" element={ user ? (
            user.user.userType === 'system_administrator' ? <Admin /> :
            <Navigate to="/" /> ) : <Navigate to="/Home" />}
          />


          <Route path="/Branch" element={ <Branch/>}/>


















          <Route path="/ViewReservationPage" element={ user ? (
            user.user.userType === 'client' ? <ViewReservationPage /> :
            <Navigate to="/" /> ) : <Navigate to="/Home" />}
          />
          <Route path="/Login"  element={!user ? <Login/> : <Navigate to="/"/>} />
          <Route path="/Signup"  element={!user ? <Signup/> : <Navigate to="/"/>} />

          
          <Route path="/TermsAndConditions" element = {<TermsAndConditions/>} />
        </Routes>

        <Routes>
          <Route path="/ClientsManagement" element={ user ? (
            user.user.userType === 'system_administrator' ? <ClientsManagement /> :
            <Navigate to="/" /> ) : <Navigate to="/Home" />}
          />
          <Route path="/ReservationsManagement" element={ user ? (
            (user.user.userType === 'system_administrator' || user.user.userType === 'customer_representative') ? <ReservationsManagement /> :
            <Navigate to="/" /> ) : <Navigate to="/Home" />}
          />
          <Route path="/VehiclesManagement" element={ user ? (
            user.user.userType === 'system_administrator' ? <VehiclesManagement /> :
            <Navigate to="/" /> ) : <Navigate to="/Home" />}
          />
          <Route path="/ClientForm" element={ user ? (
            user.user.userType === 'system_administrator' ? <ClientForm /> :
            <Navigate to="/" /> ) : <Navigate to="/Home" />}
          />
          <Route path="/VehicleForm" element={ user ? (
            user.user.userType === 'system_administrator' ? <VehicleForm /> :
            <Navigate to="/" /> ) : <Navigate to="/Home" />}
          />
          <Route  path="/StartReservation" element={user ? <StartReservation/> : <Navigate to="/Login"/>} />


        </Routes>

        
      </div>
    </Router>
  );
}

export default App;

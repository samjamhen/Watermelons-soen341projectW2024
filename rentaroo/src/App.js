import React from "react";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import CatalogPage from "./pages/CatalogPage";
import Admin from "./pages/Admin";
import ReservationPage from "./pages/ReservationPage";
import ClientsManagement from "./pages/ClientsManagement";
import VehiclesManagement from "./pages/VehiclesManagement";
import ReservationsManagement from "./pages/ReservationsManagement";

//import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header"></header>

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/Catalog" element={<CatalogPage />} /> 
          <Route path="/Home" element={<Home />} /> 
          <Route path="/ReservationPage" element={<ReservationPage/>} />
          <Route path="/Admin" element = {<Admin/>} />

        </Routes>

        <Routes>
          <Route path="/ClientsManagement" element={<ClientsManagement />} />
          <Route
            path="/ReservationsManagement"
            element={<ReservationsManagement />}
          />
          <Route path="/VehiclesManagement" element={<VehiclesManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

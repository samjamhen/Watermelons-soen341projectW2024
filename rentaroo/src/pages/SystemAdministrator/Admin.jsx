import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import '../../styles/Home.css'


const Admin = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to Administrator Page</h2>
      <ul>
      <li>
        <Link to="/ReservationsManagement">Reservations</Link>
      </li>
      <li>
        <Link to="/VehiclesManagement">Vehicles</Link>
      </li>
      <li>
        <Link to="/ClientsManagement">Users</Link>
      </li>
    </ul>
  
      </main>
      <Footer />
    </div>
  );
};

export default Admin;

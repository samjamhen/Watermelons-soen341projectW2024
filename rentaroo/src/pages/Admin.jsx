import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css'

const Admin = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to Administrator Page</h2>
        <ul>
          <li>Reservations</li>
          <li>Vehicles</li>
          <li>Clients</li>
        </ul>
  
      </main>
      <Footer />
    </div>
  );
};

export default Admin;

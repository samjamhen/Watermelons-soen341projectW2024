import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css'

const VehicleManagement = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to Administrator Page</h2>
        <h3>Vehicle Management</h3>
                {/* Add more components as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default VehicleManagement;
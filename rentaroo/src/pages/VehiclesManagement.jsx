import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css'
import VehicleCard from '../components/Catalog';
import Catalog from '../components/Catalog';

const VehiclesManagement = () => {
  return (
    <div>
      <Header/>
      <main>
        <h2>Welcome to Administrator Page</h2>
        <h3>Vehicle Management</h3>
        


        <Catalog/>
      </main>
      <Footer />
    </div>
  );
};

export default VehiclesManagement;
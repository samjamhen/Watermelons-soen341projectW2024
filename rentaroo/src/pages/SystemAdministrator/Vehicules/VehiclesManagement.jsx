import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
// import '../styles/Home.css'
import AdminCatalog from '../../../components/SystemAdministrator/AdminCatalog';
import Catalog from '../../../components/Catalog';

const VehiclesManagement = () => {
  return (
    <div>
      <Header/>
      <main>
        <h2>Welcome to Administrator Page</h2>
        <h3>Vehicle Management</h3>
        


        <AdminCatalog/>
      </main>
      <Footer />
    </div>
  );
};

export default VehiclesManagement;
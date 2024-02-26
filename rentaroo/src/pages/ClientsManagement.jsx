import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClientCard from '../components/SystemAdministrator/ClientCard'
import '../styles/Home.css'

const ClientsManagement = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to Administrator Page</h2>
        <h3>Client Management</h3>

          <button>Sort</button>
          <button>Add New Client</button>

        <ClientCard
        firstName="John"
        lastName="Doe"
        email="john.doe@example.com"
        phoneNumber="123-456-7890"
        />
        
        <ClientCard
        firstName="John"
        lastName="Doe"
        email="john.doe@example.com"
        phoneNumber="123-456-7890"
        />

        <ClientCard
        firstName="John"
        lastName="Doe"
        email="john.doe@example.com"
        phoneNumber="123-456-7890"
        />







                {/* Add more components as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default ClientsManagement;

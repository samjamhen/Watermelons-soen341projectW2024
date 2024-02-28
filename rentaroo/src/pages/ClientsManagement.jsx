import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClientCard from '../components/SystemAdministrator/ClientCard'
import '../styles/Home.css'
import { useEffect, useState } from 'react';

const ClientsManagement = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users/');
      const json = await response.json();
      
      if (response.ok) {
        setUsers(json);
      }
    }

    fetchUsers();
  }, []);

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

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

        <div>
          {users ? (
            users.map(user => (
              <ClientCard
                id = {user._id}
                username = {user.username}
                name = {user.name}
                email = {user.email}
                password = {user.password}
                phoneNumber = {user.phoneNumber}
                userType = {user.userType}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Add more components as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default ClientsManagement;

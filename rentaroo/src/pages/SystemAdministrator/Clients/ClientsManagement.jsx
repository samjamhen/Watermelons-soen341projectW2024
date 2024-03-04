import {Routes, Route, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header.jsx';
import Footer from '../../../components/Footer.jsx';
import ClientCard from '../../../components/SystemAdministrator/ClientCard.jsx';
import { Link } from 'react-router-dom';
// import '../styles/Home.css'
//import { useNavigate } from 'react-router-dom';

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

  // const navigate = useNavigate();
  
  //   // Function to handle redirection to the Form component
  //   const redirectToForm = () => {
  //    navigate('/ClientForm'); // Assuming '/form' is the route to your Form component
  //   };

  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to Administrator Page</h2>
        <h3>Client Management</h3>

          <button>Sort</button>
          <Link to= "/ClientForm"><button>Add New Client</button></Link>
         

        <div>
          {users ? (
            users.map(user => (
              <ClientCard
                id = {user._id}
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

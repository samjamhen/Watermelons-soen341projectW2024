import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Header from '../../../components/Header.jsx';
import Footer from '../../../components/Footer.jsx';
import ClientCard from '../../../components/SystemAdministrator/ClientCard.jsx';
import AddClient from './ClientForm.jsx';
// import '../styles/Home.css'

//import { useNavigate } from 'react-router-dom';

const ClientsManagement = () => {

 
    const navigate = useNavigate();
  
    // Function to handle redirection to the Form component
    const redirectToForm = () => {
     navigate('/ClientForm'); // Assuming '/form' is the route to your Form component
    };
  



  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to Administrator Page</h2>
        <h3>Client Management</h3>

          <button>Sort</button>
          <button onClick={redirectToForm}>Add New Client</button>
         

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

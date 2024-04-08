import React from 'react';
import Header from '../../components/HeaderAdmin.jsx';
import Footer from '../../components/Footer.jsx';
import AddBranchForm from '../../components/SystemAdministrator/CustomerRequests.jsx';
import CustomerRequests from '../../components/SystemAdministrator/CustomerRequests.jsx';


const Requests = () => {
    return (
    <div>
    <Header/>
    <main>

        <h1>System Administrator - Manage Customer Requests to rent their vehicles on Rentaroo </h1>
        <CustomerRequests/>
    </main>
    <Footer/>

    </div>

    );
};

export default Requests;
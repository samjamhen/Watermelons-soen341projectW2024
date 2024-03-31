import React from 'react';
import HeaderCustomer from '../../components/HeaderCustomer.jsx';
import Footer from '../../components/Footer.jsx';
import CustomerAddVehicleForm from '../../components/CustomerAddVehicleForm.jsx';

const CustomerVehicleForm = () => {
    return (
    <div>
    <HeaderCustomer/>
    <main>

        <CustomerAddVehicleForm/>

    </main>
    
    <Footer/>

    </div>

    );
};

export default CustomerVehicleForm;
import React from 'react';
import Header from '../../../components/HeaderAdmin.jsx';
import Footer from '../../../components/Footer.jsx';
import AddVehicleForm from '../../../components/SystemAdministrator/AddVehicleForm.jsx';

const VehicleForm = () => {
    return (
    <div>
    <Header/>
    <main>

        <AddVehicleForm/>
        
    </main>
    <Footer/>

    </div>

    );
};

export default VehicleForm;
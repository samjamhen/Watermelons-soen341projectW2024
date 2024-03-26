import React from 'react';
import Header from '../../components/HeaderAdmin.jsx';
import Footer from '../../components/Footer.jsx';
import AddBranchForm from '../../components/SystemAdministrator/AddBranchForm.jsx';


const BranchForm = () => {
    return (
    <div>
    <Header/>
    <main>

        <AddBranchForm/>
        
    </main>
    <Footer/>

    </div>

    );
};

export default BranchForm;
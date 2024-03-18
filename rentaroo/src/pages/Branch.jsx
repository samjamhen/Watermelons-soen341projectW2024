import React from 'react';
import Header from '../components/Header';
import HeaderAdmin from "../components/HeaderAdmin";
import HeaderCSR from "../components/HeaderCSR";
import HeaderCustomer from "../components/HeaderCustomer";
import Footer from '../components/Footer';
import BranchCard from '../components/BranchCard';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";



const Branch = () => {

  const { user } = useAuthContext();

  const renderHeader = () => {
    if (!user || !user.user || !user.user.userType) {
      return <Header />;
    }
    
    let userType = user.user.userType;
    switch (userType) {
      case "client":
        return <HeaderCustomer />;
      case "customer_representative":
        return <HeaderCSR />;
      case "system_administrator":
        return <HeaderAdmin />;
      default:
        return <Header />;
    }
};
  return (
    <div>
       {renderHeader()}
      <main>
  <div>
    <h2>Find a Branch</h2>

    <BranchCard/>
  

 </div>
</main>

      <Footer />
    </div>
  );
};

export default Branch;
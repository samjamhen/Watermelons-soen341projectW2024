import React from 'react';
import Header from '../components/Header';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderCSR from '../components/HeaderCSR';
import HeaderAdmin from '../components/HeaderAdmin';
import Footer from '../components/Footer';
import '../styles/Home.css';
import RentalAgreement from '../components/RentalAgreement';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {

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
  }


  return (
    <div>
      {renderHeader()}
      <main>
        <RentalAgreement></RentalAgreement>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

import React from 'react';
import Header from '../../components/HeaderCSR';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import CheckoutInfo from '../../components/CheckoutInfo';

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <div className="checkout-container">
        <h1>Checkout Page</h1>
       <CheckoutInfo></CheckoutInfo> 
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;

import React from 'react';
import '../styles/ConfirmationPage.css';

import Header from '../components/HeaderCSR';
import Footer from '../components/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DepositConfirmation = () => {
    const location = useLocation();
    const reservationDetails = location.state.reservation;


  if (!reservationDetails) {
    return <div>No reservation details found.</div>;
  }

  return (
    <div>
    <Header />
    <div className="confirmation-container">
      <h1>Thank You! Deposit Confirmed</h1>
      <h3>You can now take your rental vehicle.</h3>
      <p>Thank you, <b>{reservationDetails.fullName}</b>, for your deposit. Your deposit has been successfully confirmed.</p>
      <br />
      <p>A fixed amount has been frozen of your credit card. The deposit will be returned to you upon return of the vehicle in the same state. Please not that damage fees will be added to your final paiment if you do not respect the conditions of your rental agreement (damages, late return, etc.).</p>
      <br />
      <p>Details of your deposit:</p>
      <ul>
        <li>Deposit amount: $500</li>
        {/* <li>Damages: ${reservationDetails.damages}</li> */}
        {/* <li>Total Price: ${reservationDetails.updatedPrice}</li> */} 
        <li>Timestamp: {new Date().toLocaleString()}</li>
      </ul>
    </div>
    <Footer />
    </div>
  );
};

export default DepositConfirmation;
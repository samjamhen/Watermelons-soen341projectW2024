import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/HeaderCSR';
import Footer from '../../components/Footer';
import PaymentSettlement from '../../components/PaymentSettlement';

const PaymentCheckout = () => {
    const location = useLocation();
    const fetchedReservation = location.state.fetchedReservation;

    return (
        <div>
            <Header />
            <div>
                <h3>Reservation Details:</h3>
                <p><strong>Full Name:</strong> {fetchedReservation.fullName}</p>
                <p><strong>Email:</strong> {fetchedReservation.email}</p>
                <p><strong>Return Date:</strong> {fetchedReservation.returnDate}</p>
            </div>
            <div className="checkout-container">
                <h1>Payment Checkout Page</h1>
                <PaymentSettlement fetchedReservation={fetchedReservation} />
            </div>
            <Footer />
        </div>
    );
};

export default PaymentCheckout;

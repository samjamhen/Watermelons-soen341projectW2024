import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/HeaderCSR';
import Footer from '../../components/Footer';
import PaymentSettlement from '../../components/PaymentSettlement';
import PaymentConfirmation from '../../components/PaymentConfirmation'; // Import PaymentConfirmation component

const PaymentCheckout = () => {
    const location = useLocation();
    const fetchedReservation = location.state?.fetchedReservation; // Use optional chaining to safely access fetchedReservation
    const [paymentSubmitted, setPaymentSubmitted] = useState(false); // State to track payment submission

    const handlePaymentSubmit = () => {
        setPaymentSubmitted(true); // Update state to indicate payment submission
    };

    return (
        <div>
            <Header />
            <div>
                <h3>Reservation Details:</h3>
                {fetchedReservation && ( // Check if fetchedReservation is not null before rendering
                    <>
                        <p><strong>Full Name:</strong> {fetchedReservation.fullName}</p>
                        <p><strong>Email:</strong> {fetchedReservation.email}</p>
                        <p><strong>Return Date:</strong> {fetchedReservation.returnDate}</p>
                    </>
                )}
            </div>
            <div className="checkout-container">
                <h1>Payment Checkout Page</h1>
                {!paymentSubmitted ? ( // Render PaymentSettlement if payment not submitted
                    <PaymentSettlement fetchedReservation={fetchedReservation} onSubmit={handlePaymentSubmit} />
                ) : ( // Render PaymentConfirmation if payment submitted
                    <PaymentConfirmation reservationDetails={fetchedReservation} />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PaymentCheckout;

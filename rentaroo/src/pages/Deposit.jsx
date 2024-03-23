import HeaderCSR from '../components/HeaderCSR';
import Footer from '../components/Footer';
import '../styles/Deposit.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Deposit = () => {
  const location = useLocation();
  const reservation = location.state.reservation;
  const [deposit, setDeposit] = useState({
    creditCard: reservation.creditCard,
    fullName: reservation.fullName,
    amount: 500,
  });
  const [cvv, setCvv] = useState('');
  const [formValid, setFormValid] = useState(false);

  console.log("reservation: ");
  console.log(reservation);

  const fetchCard = async () => {
    try {
      console.log(deposit.creditCard)
      const response = await fetch(`/api/creditCards/cardNumber/${deposit.creditCard}`);
      console.log(response)
      if (response.ok) {
        const json = await response.json();
        setDeposit(prevDeposit => ({ ...prevDeposit, creditCard: json }));

      } else {
        throw new Error('Failed to fetch creditCards');
      }
    } catch (error) {
      console.error('Error fetching CC:', error);
    }
  }

  useEffect(() => {
    fetchCard();
  }, [])

  const handleDepositChange = (event) => {
    const { name, value } = event.target;
    setDeposit((prevDeposit) => ({ ...prevDeposit, [name]: value }));
    setFormValid(event.target.checkValidity());
  };

  const handleDepositSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // POST request to update card
      const updatedBalance = (deposit.creditCard.balance - 500);
      console.log(deposit.creditCard.balance)
      console.log(updatedBalance)
      if(updatedBalance < 0){
        alert("Card Declined: Sufficient Funds Unavailable")
        return;
      }
      const response = await fetch(`/api/creditCards/${deposit.creditCard._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({balance : updatedBalance}),
      });

      if (!response.ok) {
        throw new Error('Failed to update balance');
      }
      
      console.log('Balance updated successfully');
    } catch (error) {
      console.error('Error updating Balance:', error.message);
    }
    try{
      // POST request to update reservation status
      const response = await fetch(`/api/reservations/${reservation._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({status : "checked-in", depositStatus: "payed"}),
      });

      if (!response.ok) {
        throw new Error('Failed to update reservation status');
      }
      
      console.log('Reservation updated successfully');
    } catch (error){
      console.log("hi")
      console.log(process.env.SENDGRID_API_KEY)
      console.error('Error updating reservation status')
    }
    // Handle deposit submission logic here
    alert("Processing Deposit...");
    //do something depending on if deposit is accepted or rejected: 
    //confirmation page or denied message (allow to use another 
    //credit card? Or maybe request to change the amount..)
  };

  return (
    <div>
      <HeaderCSR />
      <h3>Taking the deposit for a customer</h3>
      <h5>
        A refundable security deposit of ${deposit.amount} is required before taking
        possession of the vehicle. This deposit serves as a safeguard against any
        potential damages, excess mileage, or late returns that may occur during the
        rental period. It ensures that the vehicle is returned in the same condition
        it was received, subject to normal wear and tear. Upon the successful return
        of the vehicle on time and without any damages, the full deposit amount will
        be promptly refunded to the customer's card. At the end of the rental
        period, the total reservation cost will be charged to the customer's card,
        completing the transaction and concluding the rental agreement. By requiring
        a security deposit and charging the reservation cost upon return, we aim to
        maintain a fair and transparent process for both parties, protecting the
        interests of our valued customers and the vehicle fleet.
      </h5>
      <form onSubmit={handleDepositSubmit}>
        <br/>
        <p>Card Number: {deposit.creditCard ? deposit.creditCard.number : ''}</p>
        <br/>
        <p>Full Name: {deposit.fullName}</p>
        <br/>
        <label htmlFor="amount">Deposit Amount:</label>
        <h6>Do not modify the deposit amount except in special circumstances, with permission only.</h6>
        <h6>Make sure to inform the client and take his concent before changing this amount.</h6>
        <input
          type="number"
          name="amount"
          value={deposit.amount}
          onChange={handleDepositChange}
          required
        />
        <br />
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          name="cvv"
          value={cvv}
          onChange={(event) => {
            setCvv(event.target.value);
            handleDepositChange(event);
          }}
          required
          pattern="[0-9]{3}"
          title="3 digits exactly"
        />
        <br />
        <button type="submit" disabled={!formValid}>
          Proceed with Deposit
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Deposit;
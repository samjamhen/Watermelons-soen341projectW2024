import React, { useState, useEffect } from 'react';
import '../styles/paymentSettlement.css';

const PaymentSettlement = ({ fetchedReservation, onSubmit }) => {
  const [damagesPrice, setDamagesPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(fetchedReservation.totalPrice);
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [creditCard, setCreditCard] = useState(null)
  const [reservation, setReservation] = useState(fetchedReservation)
  const [creditCardPaying, setCreditCardPaying] = useState(null);

  const handleDamagesPriceChange = (e) => {
    const value = e.target.value;
    // Validate if the input is a number
    if (!isNaN(value) || value === '') {
      const newDamagesPrice = value === '' ? 0 : parseFloat(value);
      setDamagesPrice(newDamagesPrice);
      // Update the total price including damages
      setTotalPrice(parseFloat(fetchedReservation.totalPrice) + newDamagesPrice);
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value.slice(0, 16));
  };

  const handleCVVChange = (e) => {
    setCVV(e.target.value.slice(0, 3));
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const fetchCard = async () => {
    try {
      console.log(reservation.creditCard)
      const response = await fetch(`/api/creditCards/cardNumber/${reservation.creditCard}`);
      console.log(response)
      if (response.ok) {
        const json = await response.json();
        setCreditCard(json);

      } else {
        throw new Error('Failed to fetch creditCards');
      }
    } catch (error) {
      console.error('Error fetching CC:', error);
    }
  }

  const fetchPayingCard = async () => {
    try {
      console.log(reservation.creditCard)
      const response = await fetch(`/api/creditCards/cardNumber/${cardNumber}`);
      console.log(response)
      if (response.ok) {
        const json = await response.json();
        setCreditCardPaying(json);

      } else {
        throw new Error('Failed to fetch creditCards');
      }
    } catch (error) {
      console.error('Error fetching CC:', error);
    }
  }

  useEffect(() => {
    fetchCard();
    fetchPayingCard();
  }, [cardNumber])

  const handleSubmitPayment = async () => {
    try {
      // Calculate the new final price
      const newFinalPrice = fetchedReservation.totalPrice + parseFloat(damagesPrice);
      
      // POST request to update the reservation's final price
      const response = await fetch(`/api/reservations/${fetchedReservation._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ finalPrice: newFinalPrice }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update reservation final price');
      }
  
      console.log('Reservation final price updated successfully');
  
      if (reservation.depositStatus === "returned") {
        alert("Deposit has already been returned");
        return;
      }
      if (reservation.depositStatus === "notPayed") {
        alert("Deposit was never paid");
        return; // If deposit not paid, stop further processing
      }
  
      // POST request to update card
      const updatedBalance = creditCard.balance + 500;
      if (!creditCard) {
        alert("Card Error: Cannot Return Funds");
        return;
      }
  
      const cardUpdateResponse = await fetch(`/api/creditCards/${creditCard._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: updatedBalance }),
      });

      if (!response.ok) {
        throw new Error('Failed to update balance');
      }
      
      console.log('Balance updated successfully');
    } catch (error) {
      console.error('Error updating Balance:', error.message);
    }
    try {
      // POST request to update card
      const updatedBalance = (creditCardPaying.balance - totalPrice);
      console.log(creditCardPaying.balance)
      console.log(updatedBalance)
      if(!creditCardPaying){
        alert("Card Error: Cannot Process Payment")
        return;
      }
      const response = await fetch(`/api/creditCards/${creditCardPaying._id}`, {
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
  
      // POST request to update reservation status
      const reservationUpdateResponse = await fetch(`/api/reservations/${reservation._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({status : "checked-out", depositStatus: "returned", finalPrice: totalPrice}),
      });
  
      if (!reservationUpdateResponse.ok) {
        throw new Error('Failed to update reservation status');
      }
  
      console.log('Reservation updated successfully');
  
      // If all processing was successful, call onSubmit
      console.log('Payment submitted. Deposit will be refunded.');
      onSubmit();
    } catch (error) {
      console.error('Error processing payment:', error.message);
    }
  };
  

  return (
    <div className="payment-settlement-container">
      <h3>Payment Settlement</h3>
      <div className="damages-price-input">
        <label htmlFor="damages-price">Damages Price $:</label>
        <input
          type="text"
          id="damages-price"
          value={damagesPrice}
          onChange={handleDamagesPriceChange}
        />
      </div>
      <div>
        <p>Total Price:<h3>${totalPrice}</h3> </p>
      </div>
      <div className="payment-details">
        <label htmlFor="card-number">Card Number:</label>
        <input
          type="text"
          id="card-number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength={16}
        />
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={handleCVVChange}
          maxLength={3}
        />
        <label htmlFor="expiration-date">Expiration Date:</label>
        <input
          type="text"
          id="expiration-date"
          value={expirationDate}
          onChange={handleExpirationDateChange}
        />
      </div>
      <strong>By submitting this payment, your deposit will be automatically refunded.</strong>
      <div>      
        <button className="submit-payment-btn" onClick={handleSubmitPayment}>Submit Payment</button>
    </div>
    </div>
  );
};

export default PaymentSettlement;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutInfo() {
    const [searchType, setSearchType] = useState('confirmationNumber');
    const [searchValue, setSearchValue] = useState('');
    const [fetchedReservation, setFetchedReservation] = useState(null);
    const [error, setError] = useState(null);
    const [showCheckoutSteps, setShowCheckoutSteps] = useState(false);
    const navigate = useNavigate();

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setSearchValue('');
        setFetchedReservation(null);
        setError(null);
    };

    const handleSearchValueChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let url = `/api/reservations/${searchType.trim()}/${searchValue}`;
            const response = await fetch(url);
            const reservation = await response.json();

            if (response.ok) {
                setFetchedReservation(reservation);
                setError(null);
                setShowCheckoutSteps(true);
            } else {
                setError(reservation.message || 'Failed to fetch reservation');
                setShowCheckoutSteps(false);
            }
        } catch (error) {
            setError('An error occurred while fetching the reservation.');
            setShowCheckoutSteps(false);
        }
    };

    const handleCheckoutConfirmReturn = () => {
        navigate('/confirm-return');
    };

    const handleCheckoutCompletePayment = () => {
        navigate('/complete-payment');
    };

    return (
        <div className='container-1'>
            <div className='checkout-info-container'>
                <h4>Search for Customer Reservation</h4>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='search-type'>Search by:</label>
                    <select id='search-type' value={searchType} onChange={handleSearchTypeChange}>
                        <option value='confirmationNumber'>Confirmation Number</option>
                        <option value='driversLicenseNumber'>License Number</option>
                        <option value='creditCardNumber'>Credit Card Number</option>
                    </select>
                    <br />

                    <label htmlFor='search-value'>Search Value:</label>
                    <input
                        type='text'
                        id='search-value'
                        value={searchValue}
                        onChange={handleSearchValueChange}
                    />
                    <br />

                    <button type='submit'>Search for Customer Reservation</button>
                </form>
            </div>

            <div className='fetched-reservation'>
                {fetchedReservation && (
                    <div>
                        <h4>Reservation Details</h4>
                        <p>Reservation Number: {fetchedReservation.reservationNumber}</p>
                        <p>Customer Name: {fetchedReservation.customerName}</p>
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {showCheckoutSteps && (
                    <div>
                        <h4>Checkout Steps</h4>
                        <button onClick={handleCheckoutConfirmReturn}>Confirm Return of Car</button>
                        <button onClick={handleCheckoutCompletePayment}>Complete Payment Settlement</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CheckoutInfo;

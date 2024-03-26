import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/checkoutInfo.css";

function CheckoutInfo() {
    const [searchType, setSearchType] = useState('confirmationNumber');
    const [searchValue, setSearchValue] = useState('');
    const [fetchedReservation, setFetchedReservation] = useState(null);
    const [error, setError] = useState(null);
    const [showCheckoutSteps, setShowCheckoutSteps] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if fetchedReservation is already passed
        if (fetchedReservation) {
            setShowCheckoutSteps(true);
        }
    }, [fetchedReservation]);

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
        navigate('/ConfirmReturn', { state: { fetchedReservation } });
    };

   

    return (
        <div className='container-1'>
            {fetchedReservation ? (
                <div className='fetched-reservation'>
                    <h4>Reservation Details</h4>
                    <p>Return Date: {fetchedReservation.returnDate}</p>
                    <p>Customer Name: {fetchedReservation.fullName}</p>
                    <div>
                        <h4>Checkout Steps</h4>
                        <button onClick={handleCheckoutConfirmReturn}>Confirm Return of Car</button>
                    </div>
                </div>
            ) : (
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
}

export default CheckoutInfo;

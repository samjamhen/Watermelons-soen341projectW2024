import React from 'react';
import { render, screen } from '@testing-library/react';
import Confirmation from '../Confirmation'; // Adjust the import path as necessary

describe('Confirmation Component', () => {
  test('renders "No reservation details found" when no reservation details are provided', () => {
    render(<Confirmation reservationDetails={null} />);
    expect(screen.getByText('No reservation details found.')).toBeInTheDocument();
  });

  test('renders reservation details correctly when provided', () => {
    const mockReservationDetails = {
      fullName: 'John Doe',
      vehicle: 'Toyota Camry',
      pickupDate: new Date('2024-04-22').toISOString(),
      returnDate: new Date('2024-04-29').toISOString(),
      totalPrice: 500 // Assuming totalPrice is a number
    };

    render(<Confirmation reservationDetails={mockReservationDetails} />);

    expect(screen.getByText(/reservation confirmed!/i)).toBeInTheDocument();
    
    // Check for parts of the message around the dynamic content
    expect(screen.getByText('Thank you, ', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('for booking with us.', { exact: false })).toBeInTheDocument();
    // Directly check for the dynamic part which might be split by tags
    expect(screen.getByText(mockReservationDetails.fullName)).toBeInTheDocument();

    expect(screen.getByText(/you can view all your reservations in the "My Reservations" tab in your account./i)).toBeInTheDocument();
  });
});

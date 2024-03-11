import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AdminVehicleCard from '../SystemAdministrator/AdminVehicleCard';

jest.mock('../../hooks/useVehicleContext', () => ({
  useVehicleContext: () => ({
    dispatch: jest.fn(),
  }),
}));

test('renders the admin vehicle card with delete and modify buttons', () => {
    const vehicle = {
        _id: '1',
        make: 'Toyota',
        model: 'Corolla',
        availabilityStatus: 'available',
        yearOfManufacture: 2020,
        price: 50,
        mileage: 10000,
        color: 'blue',
        transmissionType: 'automatic',
        seatingCapacity: 5,
        fuelType: 'gasoline',
        carType: 'sedan',
        featuresAndAmenities: ['Bluetooth', 'Backup Camera'],
        rentalTermsAndConditions: 'Terms and conditions apply',
        photos: ['https://example.com/photo.jpg'], // Add a photos array with at least one element
      };
      

  const { getByText } = render(<AdminVehicleCard vehicle={vehicle} />);

  // Expect the vehicle details to be rendered
  expect(getByText('Toyota Corolla')).toBeInTheDocument();

  // Expect delete and modify buttons to be rendered
  expect(getByText('Delete vehicle')).toBeInTheDocument();
  expect(getByText('Modify Vehicle Details')).toBeInTheDocument();
});

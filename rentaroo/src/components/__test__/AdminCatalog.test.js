import React from 'react';
import { render } from '@testing-library/react';
import AdminCatalog from '../SystemAdministrator/AdminCatalog';
import { MockVehicleContextProvider } from './MockVehicleContextProvider'; // Import the mock context provider
jest.mock('../../hooks/useVehicleContext', () => ({
  useVehicleContext: () => ({
    vehicles: [
      { _id: '1', make: 'Toyota', model: 'Corolla' },
      { _id: '2', make: 'Honda', model: 'Civic' },
    ],
    dispatch: jest.fn(), // Mock dispatch function
  }),
}));

test('renders the admin catalog with vehicles', () => {
  const { getByText } = render(<AdminCatalog />);

  expect(getByText('ADMIN CATALOG')).toBeInTheDocument();
});
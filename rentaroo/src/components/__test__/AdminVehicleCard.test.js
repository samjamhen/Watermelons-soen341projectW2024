import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AdminVehicleCard from '../SystemAdministrator/AdminVehicleCard';
import { VehicleContextProvider } from '../../contexts/VehicleContext';
import { useVehicleContext } from '../../hooks/useVehicleContext';

jest.mock('../../hooks/useVehicleContext', () => ({
    useVehicleContext: jest.fn(),
  }));
  
  test('renders the admin catalog with vehicles', () => {
    const vehicles = [
      { _id: '1', make: 'Toyota', model: 'Corolla' },
      { _id: '2', make: 'Honda', model: 'Civic' },
    ];
    const dispatch = jest.fn();
  
    useVehicleContext.mockReturnValue({ vehicles, dispatch });
  
    const { getByText } = render(
      <VehicleContextProvider>
        <AdminCatalog />
      </VehicleContextProvider>
    );
  
    expect(getByText('ADMIN CATALOG')).toBeInTheDocument();
  });

  const { getByText } = render(<AdminVehicleCard vehicle={vehicle} />);

  // Expect the vehicle details to be rendered
  expect(getByText('Toyota Corolla')).toBeInTheDocument();

  // Expect delete and modify buttons to be rendered
  expect(getByText('Delete vehicle')).toBeInTheDocument();
  expect(getByText('Modify Vehicle Details')).toBeInTheDocument();
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterForm from '../FilterForm';

test('renders the form and calls search function on button click', () => {
  const mockSearchFunction = jest.fn();

  const { getByText } = render(
    <FilterForm
      minPrice={0}
      maxPrice={100}
      onMinPriceChange={() => {}}
      onMaxPriceChange={() => {}}
      onTypesChange={() => {}}
      onCategoriesChange={() => {}}
      onLocationChange={() => {}}
      filterOptions={{}}
      selectedLocation="Montreal"
      onSearchFilteredVehicles={mockSearchFunction}
    />
  );

  // Expect the search button to be rendered
  const searchButton = getByText('Search for corresponding vehicles');
  expect(searchButton).toBeInTheDocument();

  // Simulate clicking the search button
  fireEvent.click(searchButton);

  // Expect the search function to be called
  expect(mockSearchFunction).toHaveBeenCalled();
});

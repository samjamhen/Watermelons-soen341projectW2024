import React from 'react';
import { render } from '@testing-library/react';
import AdminCatalog from '../SystemAdministrator/AdminCatalog';
import { TestContextProvider } from './TestContext.js'; // Import the TestContextProvider

test('renders the admin catalog with vehicles', () => {
  // Render AdminCatalog inside TestContextProvider
  const { getByText } = render(
    <TestContextProvider>
      <AdminCatalog />
    </TestContextProvider>
  );

  // Expect the title to be rendered
  expect(getByText('ADMIN CATALOG')).toBeInTheDocument();
});

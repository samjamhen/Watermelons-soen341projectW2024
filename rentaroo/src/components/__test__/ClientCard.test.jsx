import React from 'react';import { render } from '@testing-library/react';
import ClientCard from '../../components/SystemAdministrator/ClientCard'; // Assuming UserCardList component is used to render the list of user cards

describe('ClientCard', () => {
    it('displays field titles correctly without any data', () => {
      
      const { getByText } = render(<ClientCard clients={[]} />);
  
      
      expect(getByText('User ID:')).toBeInTheDocument();
      expect(getByText('Name:')).toBeInTheDocument();
      expect(getByText('Email Address:')).toBeInTheDocument();
      expect(getByText('Phone Number:')).toBeInTheDocument();
      expect(getByText('User Type:')).toBeInTheDocument();
      expect(getByText('Modify')).toBeInTheDocument();
      expect(getByText('Delete Client')).toBeInTheDocument();
    });
  });


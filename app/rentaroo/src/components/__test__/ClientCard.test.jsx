import React from 'react';import { render } from '@testing-library/react';
import ClientCard from '../../components/SystemAdministrator/ClientCard'; 

describe('ClientCard', () => {
    it('displays field titles correctly', () => {
      
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

  


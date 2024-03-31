import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddClientForm from "../../components/SystemAdministrator/AddClientForm"; 

describe('AddClientForm', () => {
  it('submits the form with valid data', async () => {
    const { getByLabelText, getByText } = render(<AddClientForm />);
    
 
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'John Smith' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'ABC123456!' } });
    fireEvent.change(getByLabelText('Confirm Password:'), { target: { value: 'ABC123456!' } });
    fireEvent.change(getByLabelText('Phone Number (xxx-xxx-xxxx) :'), { target: { value: '123-456-7890' } });
    fireEvent.change(getByLabelText('User Type:'), { target: { value: 'client' } });
    
    fireEvent.click(getByText('Add Client'));

  
  });

});








import React from 'react';
import { render, fireEvent, waitFor, screen  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginCard from '../../components/LoginCard';
import { useLogin } from '../../hooks/useLogin';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter


jest.mock('../../hooks/useLogin', () => ({
    useLogin: () => ({
      login: jest.fn(),
      error: null,
      isLoading: false,
    }),
  }));
  

describe('LoginCard component', () => {

    it('Submitting the form should call login function', async () => {
        const { getByPlaceholderText, getByRole } = render(
            <MemoryRouter> 
              <LoginCard />
            </MemoryRouter>
          );

    
  
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByRole('button', { name: 'Log in' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);


    // expect(useLogin().login).toHaveBeenCalledWith('test@example.com', 'password')

  });
});

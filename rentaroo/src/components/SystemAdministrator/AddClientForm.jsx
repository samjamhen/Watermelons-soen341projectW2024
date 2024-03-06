import React, { useState } from 'react';
import '../../styles/SystemAdministrator/ClientForm.css'

const AddClientForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); //Default value is true
  const [passwordStrongEnough, setPasswordStrongEnough] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberFormatError, setPhoneNumberFormatError] = useState(false);
  const [userType, setUserType] = useState('client'); //Default user type is client
  const [emailError, setEmailError] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      //POST request to add client
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber,
          userType,
        }),
      });

      console.log('Response:', response); // Log the response received from the API
  
      if (!response.ok) {
        const errorResponse = await response.json();

        if (response.status === 400) {
          console.log('Error Response:', errorResponse); // Log the error response from the API
          if (errorResponse.error && errorResponse.error.includes('duplicate key error')) {
            if (errorResponse.error.includes('email')) {
              setEmailError(true);
              setPhoneNumberError(false);
            }
            else if (errorResponse.error.includes('phoneNumber')) {
              setPhoneNumberError(true);
              setEmailError(false);
            }
            else {
              throw new Error('Failed to add client');
            }
          }
        }
        else {
          throw new Error('Failed to add client');
        }
      }
  
      else {
        console.log('User added successfully');
        //Reset form after successful submission
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber('');
        setUserType('client');
        setEmailError(false);
        setPhoneNumberError(false);
      } 
    }
    catch (error) {
      console.error('Error adding client:', error.message);
    }
  };

  return (
    <form className='client-form' onSubmit = {handleSubmit}>
      <h1>Client Form</h1>

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setEmailFormatError(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value))
          }}
          required
        />
      </label>
      {emailFormatError && email && <span style={{color: 'red'}}>Please enter a valid email address.</span>}
      {emailError && <span style={{color: 'red'}}>Email is already in use. Please use a different one.</span>}

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setPasswordStrongEnough(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(e.target.value))
          }}
          required
        />
      </label>
      {!passwordStrongEnough && password && <span style={{color: 'red'}}>Password does not meet the requirements.</span>}

      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            setPasswordMatch(e.target.value === password);}}
          required
        />
        {!passwordMatch && confirmPassword && <span style={{color: 'red'}}>Passwords do not match.</span>}
      </label>
      <span style={{ fontSize: '0.8rem', color: 'gray' }}>
        Password must contain:
        <ul style={{ paddingLeft: '20px', margin: '0', marginBottom: '15px' }}>
          <li>At least 8 characters</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one special character</li>
        </ul>
      </span>

      <label>
        Phone Number (xxx-xxx-xxxx) :
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            if (/^\d{3}-\d{3}-\d{3}$/.test(phoneNumber)) {
              setPhoneNumberFormatError(false);
            }
            else {
              setPhoneNumberFormatError(true);
            }
          }}
          required
        />
        {phoneNumberError && <span style={{color: 'red'}}>Phone number is already in use. Please use a different one.</span>}
        {phoneNumberFormatError && <span style={{color: 'red'}}>Please enter a phone number in the correct format.</span>}
      </label>

      <label>
        User Type:
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="client">Client</option>
          <option value="customer_representative">Customer Representative</option>
          <option value="system_administrator">System Administrator</option>
        </select>
      </label>

      <button type="submit">Add Client</button>
    </form>
  );
};

export default AddClientForm;
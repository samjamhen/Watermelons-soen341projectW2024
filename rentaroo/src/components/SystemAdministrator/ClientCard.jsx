import React, { useState } from 'react';
import '../../styles/SystemAdministrator/ClientManagement.css';

const ClientCard = ({ id, name, email, password, phoneNumber, userType, onDelete, specimenChequeSubmitted }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    userType: userType,
    specimenChequeSubmitted: specimenChequeSubmitted
  });
  const [emailError, setEmailError] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberFormatError, setPhoneNumberFormatError] = useState(false);

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleModifyClick = () => {
    setIsEditing(true);
  };


const handleSaveClick = async (e) => {
  e.preventDefault();

  try {
    //POST request to add client
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
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
            throw new Error('Failed to update client');
          }
        }
      }
      else {
        throw new Error('Failed to update client');
      }
    }

    else {
      setIsEditing(false);
      console.log('User updated successfully');
    } 
  }
  catch (error) {
    console.error('Error updating client:', error.message);
  }
};

  const handleCancelClick = () => {
    // Reset editedData to original values
    setEditedData({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      userType: userType,
      specimenChequeSubmitted: specimenChequeSubmitted
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^\d{3}-\d{3}-\d{4}$/.test(value)) {
      setPhoneNumberFormatError(false);
    }
    else {
      setPhoneNumberFormatError(true);
    }

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEmailAddressChange = (e)  => {
    const { name, value } = e.target;
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setEmailFormatError(false);
    }
    else {
      setEmailFormatError(true);
    }
  
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  return (
    <div className="client-etiquette">
      <div className="client-info">
        <p>
          <strong>User ID:</strong> {id}
        </p>
        {isEditing ? (
          <>
            <p>
              <strong>Name:</strong>{' '}
              <input type="text" name="name" value={editedData.name} onChange={handleChange} />
            </p>

            <p>
              <strong>Email Address:</strong>{' '}
              <input type="email" name="email" value={editedData.email} onChange={handleEmailAddressChange} />
            </p>
            {emailFormatError && <span style={{color: 'red'}}>Please enter a valid email address.</span>}
            {emailError && <span style={{color: 'red'}}>Email is already in use. Please use a different one.</span>}
            
            <p>
              <strong>Password:</strong> {showPassword ? password : '********'}
              {!showPassword ? (
                <button onClick={() => setShowPassword(true)}>Show Hashsed Password</button>
              ) : (
                <button onClick={() => setShowPassword(false)}>Hide Hashed Password</button>
              )}
            
            </p>
            <p>
              <strong>Phone Number: (xxx-xxx-xxxx)</strong>{' '}
              <input type="tel" name="phoneNumber" value={editedData.phoneNumber} onChange={handlePhoneNumberChange} />
            </p>
            {phoneNumberError && <span style={{color: 'red'}}>Phone number is already in use. Please use a different one.</span>}
            {phoneNumberFormatError && phoneNumber && <span style={{color: 'red'}}>Please enter a phone number in the correct format.</span>}

            <p>
              <strong>Specimen Cheque Submitted: </strong>{' '}
              <select name="userType" value={editedData.specimenChequeSubmitted} onChange={handleChange}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </p>
            
            <p>
              <strong>User Type:</strong>{' '}
              <select name="userType" value={editedData.userType} onChange={handleChange}>
                <option value="client">Client</option>
                <option value="customer_representative">Customer Representative</option>
                <option value="system_administrator">System Administrator</option>
              </select>
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {editedData.name}
            </p>
           
            <p>
              <strong>Email Address:</strong> {editedData.email}
            </p>
           
            <p>
              <strong>Password:</strong> {showPassword ? password : '********'}
              {!showPassword ? (
                <button onClick={() => setShowPassword(true)}>Show Hashed Password</button>
              ) : (
                <button onClick={() => setShowPassword(false)}>Hide Hashed Password</button>
              )}
            </p>
            
            <p>
              <strong>Phone Number:</strong> {editedData.phoneNumber}
            </p>

            <p>
              <strong>Specimen Cheque Submitted: </strong>{editedData.specimenChequeSubmitted}
            </p>
            
            <p>
              <strong>User Type:</strong> {editedData.userType}
            </p>
          </>
        )}
      </div>
      <div className="client-actions">
        {isEditing ? (
          <>
            <button className="info-button" onClick={handleSaveClick}>Save</button>
            <button className="delete-button" onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <button className="info-button" onClick={handleModifyClick}>Modify</button>
        )}
        <button className="delete-button" onClick={handleDeleteClick}>Delete Client</button>
      </div>
    </div>
  );
};

export default ClientCard;
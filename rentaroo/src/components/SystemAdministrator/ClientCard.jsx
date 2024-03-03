import React, { useState, useEffect } from 'react';
import '../../styles/SystemAdministrator/ClientManagement.css';


const ClientCard = ({id, name, email, password, phoneNumber, userType, onDelete}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleDeleteClick = () => {
      onDelete(id);
    };
  
    return (
        <div className="client-etiquette">
        <div className="client-info">
          <p>
            <strong>User ID:</strong> {id}
          </p>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email Address:</strong> {email}
          </p>
          <p>
          <strong>Password:</strong> {showPassword ? password : '********'}
          {!showPassword ? (
            <button onClick={() => setShowPassword(true)}>Show Password</button>
          ) : (
            <button onClick={() => setShowPassword(false)}>Hide Password</button>
          )}
        </p>
          <p>
            <strong>Phone Number:</strong> {phoneNumber}
          </p>
          <p>
            <strong>User Type:</strong> {userType}
          </p>
        </div>
        <div className="client-actions">
          <button className="info-button">Show More Info</button>
          <button className="delete-button" onClick = {handleDeleteClick}>Delete Client</button>
        </div>
      </div>
  );
};

export default ClientCard;

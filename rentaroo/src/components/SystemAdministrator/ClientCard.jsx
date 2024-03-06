import React, { useState } from 'react';
import '../../styles/SystemAdministrator/ClientManagement.css';

const ClientCard = ({ id, name, email, password, phoneNumber, userType, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    userType: userType
  });

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleModifyClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Perform saving logic here, such as updating the data in the backend
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Reset editedData to original values
    setEditedData({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      userType: userType
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
              <input type="email" name="email" value={editedData.email} onChange={handleChange} />
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
              <strong>Phone Number:</strong>{' '}
              <input type="tel" name="phoneNumber" value={editedData.phoneNumber} onChange={handleChange} />
            </p>
            <p>
              <strong>User Type:</strong>{' '}
              <input type="text" name="userType" value={editedData.userType} onChange={handleChange} />
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
                <button onClick={() => setShowPassword(true)}>Show Password</button>
              ) : (
                <button onClick={() => setShowPassword(false)}>Hide Password</button>
              )}
            </p>
            <p>
              <strong>Phone Number:</strong> {editedData.phoneNumber}
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


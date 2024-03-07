import {Routes, Route, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header.jsx';
import Footer from '../../../components/Footer.jsx';
import ClientCard from '../../../components/SystemAdministrator/ClientCard.jsx';
import { Link } from 'react-router-dom';


const ClientsManagement = () => {
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users/');
      const json = await response.json();
      
      if (response.ok) {
        setUsers(json);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        const response = await fetch(`/api/users/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };
  
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to Administrator Page</h2>
        <h3>User Management</h3>

          <button>Sort</button>
          <Link to= "/ClientForm"><button>Add New User</button></Link>
         

        <div>
          {users.length > 0 ? (
            users.map(user => (
              <ClientCard
                key={user._id}
                id={user._id}
                name={user.name}
                email={user.email}
                password={user.password}
                phoneNumber={user.phoneNumber}
                userType={user.userType}
                onDelete={handleDelete}
              />
            ))
            ) : (
              <p>No users found.</p>
            )}
        </div>

        {/* Add more components as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default ClientsManagement;
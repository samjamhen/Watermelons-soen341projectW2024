import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import '../../styles/SystemAdministrator/Admin.css'


const Admin = () => {
  return (
    <div>
      <Header />
      <main>
  <div class="admin-title">
    <h2>Management System</h2>
    <p>Welcome to our Management System Page. Assist your clients in their reservations for their next adventure and be part of their unforgettable journey!</p>
  </div>
  <ul class="link-list">
    <li>
      <div class="link-box">
      <a href="/VehiclesManagement">Vehicles</a>
      </div>
      <p>Access and manage vehicle details, including availability and specifications.</p>
    </li>
    <li>
      <div class="link-box">
      <a href="/UsersManagement">Users </a>
      </div>
      <p>Access and manage your users' accounts.</p>
    </li>
    <li>
      <div class="link-box">
      <a href="/ReservationsManagement">Reservations</a>
      </div>
      <p>View, modify, or create new reservations with ease.</p>
    </li>
  </ul>
</main>

      <Footer />
    </div>
  );
};

export default Admin;

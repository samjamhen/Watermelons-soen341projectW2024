import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/Catalog">Catalog</Link></li>
        <li><Link to="/Reservation">ReservationPage</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;

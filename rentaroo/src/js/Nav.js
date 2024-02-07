import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/vehicles">Browse Vehicles</Link></li> // Add link for Browse Vehicles page
      </ul>
    </nav>
  );
}

export default Nav;

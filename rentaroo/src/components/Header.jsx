import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
// import logo from './logo.png'
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="navBar">
      <nav className="sticky">
        <div className="logo">
          <Link to="/" id="link">
            <img src={"./logo.png"} alt="Rentaroo Logo" />
          </Link>
        </div>
        <div>
          <ul id="navbar">
            <li>
              <Link to="/Catalog" id="link">
                Catalog
              </Link>
            </li>
            <li>
              <Link to="/StartReservation" id="link">
                Start a Reservation
              </Link>
            </li>
            <li>
              <Link to="/Admin" id="link">
                System Administrator
              </Link>
            </li>

            <li>
              <Link to="/login" id="link">
                Log in
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;

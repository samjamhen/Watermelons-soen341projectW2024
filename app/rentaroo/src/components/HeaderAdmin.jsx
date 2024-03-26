import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
// import logo from './logo.png'
import "../styles/Header.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Header = () => {
  const {logout} = useLogout();
  const {user} = useAuthContext();

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="navBar">
      <nav className="sticky">
        <div className="logo">
          <Link to="/" id="link">
            <img src={"./logo2.png"} alt="Rentaroo Logo" />
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
              <Link to="/Branch" id="link">
               Find a Branch
              </Link>
            </li>
          </ul>
        </div>
        {!user && (
        <div id = "navbar">
          <Link to="/Login" id="link">
            Log in
          </Link>
        </div>
        )}
        {user && (
          <div className = "logged-in">
            <span>Welcome, {user.user.name} (Admin)</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;

import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Watermelons Inc. All rights reserved.</p>
      <p>Contact us: <a href="mailto:info@mycompany.com">info@watermelons.com</a></p>
    </footer>
  );
};

export default Footer;
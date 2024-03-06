import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
      <div className="home-container">
      <h1 className="home-title">Welcome to Our Vehicle Rental System</h1>
      <p className="home-description">
        Discover the joy of driving with our carefully selected fleet of vehicles. From compact cars to spacious SUVs, we have the perfect vehicle for your next adventure.
      </p>
      <Link to="/Catalog" className="home-button">
        View Our Vehicle Selection
      </Link>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import StartReservationCatalog from  "../components/StartReservationCatalog";


const StartReservation = () => {
  return (
    <div>
      <Header />
      <main>
        <StartReservationCatalog />

      </main>
      <Footer />
    </div>
  );
};

export default StartReservation;

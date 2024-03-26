import React from 'react';
import HeaderCSR from '../../components/HeaderCSR';
import Footer from '../../components/Footer';
import CheckinInfo from '../../components/CheckinInfo';

import '../../styles/Home.css'
import { Link } from 'react-router-dom';

const Checkin = () => {
  return (
    <div>
     <HeaderCSR/>
      <main>
        <h3> Customer Check-In page for CSRs</h3>
        <CheckinInfo></CheckinInfo>
      </main>
      <Footer />
    </div>
  );
};

export default Checkin;
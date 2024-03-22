import React from 'react';
import HeaderCSR from '../../components/HeaderCSR';
import Footer from '../../components/Footer';

import { Link } from 'react-router-dom';
import CarInspectionForm from '../../components/CarInspectionForm';

const Checkin = () => {
  return (
    <div>
     <HeaderCSR/>
      <main>
        <h3> Inspection </h3>
        <CarInspectionForm></CarInspectionForm>
      </main>
      <Footer />
    </div>
  );
};

export default Checkin;
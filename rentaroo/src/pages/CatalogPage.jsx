import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Catalog from '../components/Catalog';

const CatalogPage = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Catalog Page</h1>
        <Catalog></Catalog>
            {/* Add more components as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;

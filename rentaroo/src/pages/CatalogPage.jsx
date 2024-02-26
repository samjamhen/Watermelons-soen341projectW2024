import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Catalog from "../components/Catalog";

const CatalogPage = () => {
  return (
    <div>
      <Header />
      <main>
        <Catalog></Catalog>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;

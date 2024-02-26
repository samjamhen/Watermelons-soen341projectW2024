import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Catalog from "../components/Catalog";

const CatalogPage = () => {
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch("/api/vehicles");
      const json = await response.json();

      if (response.ok) {
        setVehicles(json);
      }
    };

    fetchVehicles();
  }, []);
  return (
    <div className="Catalog">
      <Header />
      <div className="vehicles">
        {vehicles &&
          vehicles.map((vehicle) => (
            <Catalog key={vehicle._id} vehicle={vehicle} />
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default CatalogPage;

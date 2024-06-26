import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminVehicleCard from "./AdminVehicleCard";
// import "../../styles/Catalog.css";
import { useVehicleContext } from "../../hooks/useVehicleContext";

function AdminCatalog() {
  // const [vehicles, setVehicles] = useState([]);
  const [sortedVehicles, setSortedVehicles] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState();
  const [reload, setReload] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { vehicles, dispatch } = useVehicleContext();

  useEffect(() => {
    if (reload) {
      window.location.reload();
    }
  }, [reload]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles");
        const json = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        dispatch({ type: "SET_VEHICLES", payload: json });
        // setVehicles(json);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    handleSortChange();
  }, [selectedSortOption, vehicles]);

  function handleSortChange() {
    const newSortedVehicles = sortVehiclesBy([...vehicles], selectedSortOption);
    setSortedVehicles(newSortedVehicles);
  }

  function sortVehiclesBy(vehicles, sortBy) {
    return vehicles.sort((a, b) => {
      switch (sortBy) {
        case "year":
          return compareYears(a, b);
        case "mileage":
          return compareMileages(a, b);
        case "price":
          return comparePrices(a, b);
        default:
          return 0;
      }
    });
  }

  function compareYears(a, b) {
    return a.year - b.year;
  }

  function compareMileages(a, b) {
    return a.mileage - b.mileage;
  }

  function comparePrices(a, b) {
    return a.price - b.price;
  }

  function renderVehicles() {
    const filteredVehicles = sortedVehicles.filter(vehicle => {
      // Check if the vehicle has an application and the application status is 'approved'
      return !vehicle.status || vehicle.status === 'approved';
    });
  
    return filteredVehicles.map((vehicle) => (
      <AdminVehicleCard key={vehicle._id} vehicle={vehicle} />
    ));
  }

  function handleSortOptionClick(event) {
    const sortOption = event.target.value;
    setSelectedSortOption(sortOption);
  }

  return (
    <div className="catalog-page">
      <h1>ADMIN CATALOG</h1>
      <Link to="/VehicleForm">
        <button className="add-vehicle-button">Add Vehicle</button>
      </Link>
      <div className="sorting-section">
        <label htmlFor="sort-by">Sort results by: </label>
        <button value="year" onClick={handleSortOptionClick}>
          Year
        </button>
        <button value="mileage" onClick={handleSortOptionClick}>
          Mileage
        </button>
        <button value="price" onClick={handleSortOptionClick}>
          Price
        </button>
      </div>
      <div className="create-list-display">
        <ul className="vehicle-list">{renderVehicles()}</ul>
      </div>
    </div>
  );
}

export default AdminCatalog;

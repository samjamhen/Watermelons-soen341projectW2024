import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VehicleCard from "./VehicleCard.jsx";
import "../styles/Catalog.css";

function Catalog() {
  const [vehicles, setVehicles] = useState([]);
  const [sortedVehicles, setSortedVehicles] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState(null);


  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const json = await response.json();
        setVehicles(json);
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

  function handleSelectButtonClick(vehicle) {
    setSelectedVehicle(vehicle);

  }

  function handlePopupCloseButtonClick() {
    setSelectedVehicle(null);

  }

  function renderVehicles() {
    return sortedVehicles.map((vehicle) => (
      <VehicleCard  
        key={vehicle._id} 
        vehicle={vehicle}
        onSelectButtonClick={() => handleSelectButtonClick(vehicle)}
        selectedVehicle={selectedVehicle}

        handlePopupCloseButtonClick={handlePopupCloseButtonClick}
        />
    ));
  }

  function handleSortOptionClick(event) {
    const sortOption = event.target.value;
    setSelectedSortOption(sortOption);
  }
  

  return (
    <div className="catalog-page">
      <h1>FIND THE RIGHT CAR FOR YOU WITH RENTAROO</h1>
      <Link to="/StartReservation" class-name="select-button" id="start-reservation-button">
        Start a Reservation
        </Link>
      <div className="sorting-section">
        <label htmlFor="sort-by"> Sort results by: </label>
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
      <ul className="vehicle-list">{renderVehicles()}</ul>
    </div>
  );
}

export default Catalog;
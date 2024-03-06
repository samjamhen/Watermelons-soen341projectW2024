
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; //Import useNavigate
import VehicleCard from "./VehicleCard.jsx";
import "../styles/Catalog.css";

function Catalog() {
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState([]);
  const [sortedVehicles, setSortedVehicles] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
    setIsPopupVisible(true);
  }

  function handlePopupCloseButtonClick() {
    setSelectedVehicle(null);
    setIsPopupVisible(false);
  }

  function handleBookNowButtonClick() {
    // Navigate to the booking form with selected vehicle's information
    navigate('/ReservationPage', { state: { vehicle: selectedVehicle } });
  }

  function renderVehicles() {
    return sortedVehicles.map((vehicle) => (
      <VehicleCard  
        key={vehicle._id} 
        vehicle={vehicle}
        onSelectButtonClick={() => handleSelectButtonClick(vehicle)}
        selectedVehicle={selectedVehicle}
        isPopupVisible={isPopupVisible}
        handlePopupCloseButtonClick={handlePopupCloseButtonClick}
        handleBookNowButtonClick={handleBookNowButtonClick} />
    ));
  }

  function handleSortOptionClick(event) {
    const sortOption = event.target.value;
    setSelectedSortOption(sortOption);
  }
  

  return (
    <div className="catalog-page">
      <h1>FIND THE RIGHT CAR FOR YOU WITH RENTAROO</h1>
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
      <ul className="vehicle-list">{renderVehicles()}</ul>
      {selectedVehicle && isPopupVisible && (
        <div className="popup">
          <button onClick={handlePopupCloseButtonClick}>Close</button>
          <h2>{`${selectedVehicle.yearOfManufacture} ${selectedVehicle.make} ${selectedVehicle.model}`}</h2>
          <p className={`availability-status ${selectedVehicle.availabilityStatus === 'available' ? 'available' : 'unavailable'}`}>
            {selectedVehicle.availabilityStatus}
          </p>
          <p>Color: {selectedVehicle.color}</p>
          <p>Mileage: {selectedVehicle.mileage}</p>
          <p>Price: ${selectedVehicle.price} per day</p>
          <p>Transmission: {selectedVehicle.transmissionType}</p>
          <p>Seating Capacity {selectedVehicle.seatingCapacity}</p>
          <p>Fuel Type: {selectedVehicle.fuelType}</p>
          <p>Car Type: {selectedVehicle.carType}</p>
          <p>Fuel Type: {selectedVehicle.fuelType}</p>
          <p>Features: {selectedVehicle.featuresAndAmenities.join(', ')}</p>

          <p>{selectedVehicle.rentalTermsAndConditions}</p>


          <button onClick={handleBookNowButtonClick}>Book Now</button>
        </div>
      )}
    </div>
  );
}

export default Catalog;
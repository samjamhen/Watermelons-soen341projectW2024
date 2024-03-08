import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VehicleCard from "./VehicleCard.jsx";
import "../styles/Catalog.css";
import "../styles/StartReservationCatalog.css";



function StartReservationCatalog() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("Montreal");

  const [filterOptions, setFilterOptions] = useState({
    minPrice: 0,
    maxPrice: 100,
    carTypes: ["CARs", "SUVs", "Vans", "Trucks"],
    categories: ["compact", "standard", "intermediate", "large"],
    location: ["Montreal", "Laval"]

  });

  function handleShowFilters() {
    setShowFilters(true);
  }

  function handleFilterChange(event) {
    const { name, value, checked, carType } = event.target;
  
    if (carType === "checkbox") {
      if (checked) {
        setFilterOptions({
          ...filterOptions,
          [name]: [...(filterOptions[name] || []), value]
        });
      } else {
        setFilterOptions({
          ...filterOptions,
          [name]: filterOptions[name].filter((option) => option !== value)
        });
      }
    } else if (name === "minPrice" || name === "maxPrice") {
      setFilterOptions({
        ...filterOptions,
        [name]: parseInt(value, 10)
      });
    }else if (name === "minPrice" || name === "maxPrice") {
      setFilterOptions({
        ...filterOptions,
        [name]: parseInt(value, 10)
      });
    }
  }

  function handleSearchFilteredVehicles() {
    const { minPrice, maxPrice } = filterOptions;
    const filteredVehicles = vehicles.filter(
      (vehicle) =>
        vehicle.price >= minPrice &&
        vehicle.price <= maxPrice &&
        (selectedLocation === "Montreal"
          ? vehicle.location === "Montreal"
          : vehicle.location === "Laval")
    );
    setFilteredVehicles(filteredVehicles);
  }

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


  function handleSelectButtonClick(vehicle) {
    setSelectedVehicle(vehicle);
  }

  function renderVehicles() {
    return filteredVehicles.map((vehicle) => (
      <VehicleCard  
        key={vehicle._id} 
        vehicle={vehicle}
        onSelectButtonClick={() => handleSelectButtonClick(vehicle)}
        selectedVehicle={selectedVehicle} />
    ));
  }

  return (
    <div className="catalog-page">
      <h1>Start a Reservation</h1>
        <div className="filter-options">
        <div className="filter-row">
  <label htmlFor="location">Location:</label>
  <div>
    <label htmlFor="Montreal">
      <input
        type="radio"
        name="location"
        value="Montreal"
        checked={selectedLocation === "Montreal"}
        onChange={() => setSelectedLocation("Montreal")}
      />
      Montreal
    </label>
    <label htmlFor="Laval">
      <input
        type="radio"
        name="location"
        value="Laval"
        checked={selectedLocation === "Laval"}
        onChange={() => setSelectedLocation("Laval")}
      />
      Laval
    </label>
  </div>
</div>
          <div className="filter-row">
            <label htmlFor="minPrice">Minimum Daily Rental Price:</label>
            <input
              type="number"
              name="minPrice"
              id="minPrice"
              value={filterOptions.minPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-row">
            <label htmlFor="maxPrice">Maximum Daily Rental Price:</label>
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              value={filterOptions.maxPrice} 
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-row">
            <label htmlFor="types">Type of car:</label>
            <div>
              <label htmlFor="CARs">
                <input
                  type="checkbox"
                  name="types"
                  value="CARs"
                />
                CARs
              </label>
              <label htmlFor="SUVs">
                <input
                  type="checkbox"
                  name="types"
                  value="SUVs"
                />
                SUVs
              </label>
              <label htmlFor="Vans">
                <input
                  type="checkbox"
                  name="types"
                  value="Vans"
                />
                Vans
              </label>
              <label htmlFor="Trucks">
                <input
                  type="checkbox"
                  name="types"
                  value="Trucks"
                />
                Trucks
              </label>
            </div>
          </div>
          <div className="filter-row">
            <label htmlFor="categories">Category of car:</label>
            <div>
              <label htmlFor="compact">
                <input
                  type="checkbox"
                  name="categories"
                  value="compact"
                />
                compact
              </label>
              <label htmlFor="standard">
                <input
                  type="checkbox"
                  name="categories"
                  value="standard"
                />
                standard
              </label>
              <label htmlFor="intermediate">
                <input
                  type="checkbox"
                  name="categories"
                  value="intermediate"
            />
            intermediate
          </label>
          <label htmlFor="large">
            <input
              type="checkbox"
              name="categories"
              value="large"
            />
            large
          </label>
        </div>

        
      </div>
          <div className="filter-row">
          <button onClick={handleSearchFilteredVehicles}>Search for corresponding vehicles</button></div>
        </div>
      
      <ul className="vehicle-list">{renderVehicles()}</ul>
    </div>
  );
}

export default StartReservationCatalog;
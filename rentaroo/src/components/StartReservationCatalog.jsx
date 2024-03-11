import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VehicleCard from "./VehicleCard.jsx";
import "../styles/Catalog.css";
import "../styles/StartReservationCatalog.css";
import FilterForm from "./FilterForm";

function StartReservationCatalog() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("Montreal");
  const [filterOptions, setFilterOptions] = useState({
    minPrice: 0,
    maxPrice: 100,
    carType: [],
    categories: [],
    location: ["Montreal", "Laval"],
  });
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);

  function handleFilterChange(event) {
    const { name, value, checked, carType } = event.target;
    if (carType === "checkbox") {
      setFilterOptions({
        ...filterOptions,
        carType: checked
          ? [...(filterOptions.carType || []), carType]
          : filterOptions.carType.filter((option) => option !== carType),
      });
      setSelectedCarTypes(filterOptions.carType);
    } else if (name === "minPrice" || name === "maxPrice") {
      setFilterOptions({
        ...filterOptions,
        [name]: parseInt(value, 10),
      });
    } else if (name === "location") {
      setSelectedLocation(value);
    }
  }

  function handleLocationChange(location) {
    setSelectedLocation(location);
  }

  function handleSearchFilteredVehicles() {
    const { minPrice, maxPrice, carType, categories } = filterOptions;
    const filteredVehicles = vehicles.filter(
      (vehicle) =>
        vehicle.price >= minPrice &&
        vehicle.price <= maxPrice &&
        (carType.length === 0 || carType.includes(vehicle.type)) &&
        (categories.length === 0 || categories.includes(vehicle.category)) &&
        (selectedLocation === "Montreal"
          ? vehicle.location === "Montreal"
          : vehicle.location === "Laval")
    );
    setFilteredVehicles(filteredVehicles);
    console.log("Selected Car Types:", selectedCarTypes);
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
    console.log("Selected Car Types:", selectedCarTypes);

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
      <FilterForm componentDidMount={handleSearchFilteredVehicles}
        minPrice={filterOptions.minPrice}
        maxPrice={filterOptions.maxPrice}
        onMinPriceChange={(e) =>
          handleFilterChange({ target: { name: "minPrice", value: e.target.value } })
        }
        onMaxPriceChange={(e) =>
          handleFilterChange({ target: { name: "maxPrice", value: e.target.value } })
        }
        onTypesChange={handleFilterChange}
        onCategoriesChange={handleFilterChange}
        onLocationChange={handleLocationChange}
        filterOptions={filterOptions}
        selectedLocation={selectedLocation}
        onSearchFilteredVehicles={handleSearchFilteredVehicles}
      />
      <ul className="vehicle-list">
        {renderVehicles()}
      </ul>
    </div>
  );
}

export default StartReservationCatalog;
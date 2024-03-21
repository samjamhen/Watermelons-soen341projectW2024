import React from "react";
import "../styles/FilterForm.css";

const FilterForm = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onTypesChange,
  onCategoriesChange,
  onLocationChange,
  filterOptions,
  selectedLocation,
  onSearchFilteredVehicles,
}) => {
  const carTypes = filterOptions ? filterOptions.carTypes : [];
  const categories = filterOptions ? filterOptions.categories : [];

  return (
    <form>
      <div className="filter-form">
        <div className="filter-row">
          <label className="categorytitle" htmlFor="minPrice">
            Minimum Daily Rental Price:
          </label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            value={minPrice}
            onChange={onMinPriceChange}
          />
        </div>
        <div className="filter-row">
          <label className="categorytitle" htmlFor="maxPrice">
            Maximum Daily Rental Price:
          </label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            value={maxPrice}
            onChange={onMaxPriceChange}
          />
        </div>
        <div className="filter-row">
          <label className="categorytitle" htmlFor="types">
            Type of car:
          </label>
          <div className="types-checkboxes">
            <label htmlFor="car">
              <input
                type="checkbox"
                name="carType"
                value="car"
                //checked={filterOptions.carType.includes("car")}
                onChange={onTypesChange}
              />
              car
            </label>
            <label htmlFor="SUV">
              <input
                type="checkbox"
                name="carType"
                value="SUV"
                //checked={filterOptions.carType.includes("SUV")}
                onChange={onTypesChange}
              />
              SUV
            </label>
            <label htmlFor="Van">
              <input
                type="checkbox"
                name="carType"
                value="Van"
                //checked={filterOptions.carType.includes("Van")}
                onChange={onTypesChange}
              />
              Van
            </label>
            <label htmlFor="Truck">
              <input
                type="checkbox"
                name="carType"
                value="Truck"
                //checked={filterOptions.carType.includes("Truck")}
                onChange={onTypesChange}
              />
              Truck
            </label>
          </div>
        </div>
        <div className="filter-row">
          <label className="categorytitle" htmlFor="categories">
            Category of car:
          </label>
          <div className="categories-checkboxes">
            <label htmlFor="compact">
              <input
                type="checkbox"
                name="categories"
                value="compact"
                //checked={filterOptions.categories.includes("compact")}
                onChange={onCategoriesChange}
              />
              compact
            </label>
            <label htmlFor="standard">
              <input
                type="checkbox"
                name="categories"
                value="standard"
                //checked={filterOptions.categories.includes("standard")}
                onChange={onCategoriesChange}
              />
              standard
            </label>
            <label htmlFor="large">
              <input
                type="checkbox"
                name="categories"
                value="large"
                //checked={filterOptions.categories.includes("intermediate")}
                onChange={onCategoriesChange}
              />
              intermediate
            </label>
            <label htmlFor="large">
              <input
                type="checkbox"
                name="categories"
                value="large"
                //checked={filterOptions.categories.includes("large")}
                onChange={onCategoriesChange}
              />
              large
            </label>
          </div>
        </div>
        <div className="filter-row">
          <label className="categorytitle" htmlFor="location">
            Location:
          </label>
          <div className="location-radios">
            <label htmlFor="Montreal - YUL">
              <input
                type="radio"
                name="location"
                value="Montreal - YUL"
                //checked={selectedLocation === "Montreal"}
                onChange={() => onLocationChange("Montreal - YUL")}
              />
              Montreal - YUL
            </label>
            <label htmlFor="Montreal - Downtown">
              <input
                type="radio"
                name="location"
                value="Montreal - Downtown"
                //checked={selectedLocation === "Montreal"}
                onChange={() => onLocationChange("Montreal - Downtown")}
              />
              Montreal - Downtown
            </label>
            <label htmlFor="Laval">
              <input
                type="radio"
                name="location"
                value="Laval"
                //checked={selectedLocation === "Laval"}
                onChange={() => onLocationChange("Laval")}
              />
              Laval
            </label>
          </div>
        </div>
        <div className="filter-row">
          <button type="button" onClick={onSearchFilteredVehicles}>
            Search for corresponding vehicles
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;

import React from 'react';

const SearchFilter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = React.useState([0, 100000]);
  const [carType, setCarType] = React.useState("");
  const [mileage, setMileage] = React.useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterChange({ priceRange, carType, mileage });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Price Range:
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value.split(","))}
          />
          <span>{priceRange[0]} - {priceRange[1]}</span>
        </label>
      </div>
      <div>
        <label>
          Car Type:
          <input
            type="text"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Mileage Range:
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(parseInt(e.target.value, 10))}
          />
        </label>
      </div>
      <button type="submit">Filter</button>
    </form>
  );
};

export default SearchFilter;
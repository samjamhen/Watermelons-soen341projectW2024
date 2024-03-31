import React, { useState } from "react";
import "../styles/SystemAdministrator/VehicleForm.css";
import { useVehicleContext } from "../hooks/useVehicleContext";

const CustomerAddVehicleForm = () => {
  const { dispatch } = useVehicleContext();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setcategory] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("available");
  const [yearOfManufacture, setYearOfManufacture] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("Montreal - YUL");
  const [transmissionType, setTransmissionType] = useState("automatic");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [fuelType, setFuelType] = useState("gasoline");
  const [carType, setCarType] = useState("sedan");
  const [featuresAndAmenities, setFeaturesAndAmenities] = useState("");
  const [rentalTermsAndConditions, setRentalTermsAndConditions] = useState("");
  const [photos, setPhotos] = useState([""]);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [applicationSubmittedBy, setApplicationSubmittedBy] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("pending");
  const [applicationDescription, setApplicationDescription] = useState("");
  // const [vehicleImage, setVehicleImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const vehicle = {
        make,
        model,
        color,
        category,
        carType,
        transmissionType,
        fuelType,
        seatingCapacity,
        featuresAndAmenities,
        rentalTermsAndConditions,
        location,
        availabilityStatus,
        yearOfManufacture,
        mileage,
        price,
        photos,
        application: {
          applicationSubmittedBy,
          applicationStatus,
          applicationDescription,
        },
      };

      const response = await fetch("/api/vehicles", {
        method: "POST",
        body: JSON.stringify(vehicle),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setMake("");
        setModel("");
        setcategory("");
        setColor("");
        setCarType("");
        setTransmissionType("");
        setFuelType("");
        setSeatingCapacity("");
        setFeaturesAndAmenities("");
        setRentalTermsAndConditions("");
        setLocation("Montreal - YUL");
        setAvailabilityStatus("");
        setYearOfManufacture("");
        setMileage("");
        setPrice("");
        setPhotos([""]);
        setApplicationSubmittedBy("");
        setApplicationStatus("pending");
        setApplicationDescription("");

        setError(null);
        console.log("Vehicle created successfully", json);
        setSuccessMessage("Vehicle created successfully");
        dispatch({ type: "CREATE_VEHICLE", payload: json });
      }
    } catch (error) {
      console.error("Error adding vehicle:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      // setVehicleImage(file);
      setImageError(false);
    } else {
      // setVehicleImage("");
      setImageError(true);
      <span style={{ color: "red" }}>Please upload a JPEG or PNG image.</span>;
    }
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
      <h1>Vehicle ApplicationForm</h1>
      <h4>Please provide details of your vehicle</h4>

      <label>
        Make:
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
      </label>

      <label>
        Model:
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setcategory(e.target.value)}
          required
        />
      </label>


      <label>
        Year of Manufacture:
        <input
          type="number"
          value={yearOfManufacture}
          onChange={(e) => setYearOfManufacture(e.target.value)}
          required
        />
      </label>

      <label>
        Price per Day ($):
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>

      <label>
        Mileage (Km):
        <input
          type="number"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          required
        />
      </label>

      <label>
        Color:
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
      </label>
      <label>Location:</label>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="Montreal - YUL">Montreal - YUL</option>
          <option value="Laval">Laval</option>
          <option value="Montreal - Downtown">Montreal - Downtown</option>
      </select>
      <label>
        Transmission Type:
        <select
          value={transmissionType}
          onChange={(e) => setTransmissionType(e.target.value)}
        >
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </label>

      <label>
        Seating Capacity:
        <input
          type="number"
          value={seatingCapacity}
          onChange={(e) => setSeatingCapacity(e.target.value)}
          required
        />
      </label>

      <label>
        Fuel Type:
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
          <option value="gasoline">Gasoline</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>
      </label>

      <label>
        Car Type:
        <select value={carType} onChange={(e) => setCarType(e.target.value)}>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="truck">Truck</option>
        </select>
      </label>

      <label>
        Features and Amenities:
        <input
          type="text"
          value={featuresAndAmenities}
          onChange={(e) => setFeaturesAndAmenities(e.target.value)}
          required
        />
      </label>

      <label>
        Rental Terms and Conditions:
        <textarea
          value={rentalTermsAndConditions}
          onChange={(e) => setRentalTermsAndConditions(e.target.value)}
          required
        />
      </label>
      <label>Photos (add a link):</label>
      <input
        type="text"
        value={photos.join(",")}
        onChange={(e) => setPhotos(e.target.value.split(","))}

      />
        <label>Customer ID:</label>
        <input
          type="text"
          value={applicationSubmittedBy}
          onChange={(e) => setApplicationSubmittedBy(e.target.value)}
          required
        />
        
        <label>Application Description:</label>
        <textarea
          value={applicationDescription}
          onChange={(e) => setApplicationDescription(e.target.value)}
          required
        />
      


      <button type="submit">Add Vehicle</button>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
    </form>
  );
};

export default CustomerAddVehicleForm;
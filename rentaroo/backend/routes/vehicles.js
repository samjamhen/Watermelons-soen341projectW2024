const express = require("express");
const Vehicle = require("../models/vehicles.js");
const createVehicle = require("../controllers/vehicles.js");

const router = express.Router();

//READ
//Get all Vehicles
router.get("/", (req, res) => {
  res.json({ mssg: "Get all Vehicles" });
});

//Get a specific Vehicle
router.get("/:id", (req, res) => {
  res.json({ mssg: "Get a specific Vehicle" });
});

//CREATE
//POST a new Vehicle
router.post("/", async (req, res) => {
  const {
    make,
    model,
    yearOfManufacture,
    mileage,
    carType,
    transmissionType,
    fuelType,
    seatingCapacity,
    featuresAndAmenities,
    rentalTermsAndConditions,
    photos,
    location,
    availabilityStatus,
  } = req.body;

  try {
    const vehicle = await Vehicle.create({
      make,
      model,
      yearOfManufacture,
      mileage,
      carType,
      transmissionType,
      fuelType,
      seatingCapacity,
      featuresAndAmenities,
      rentalTermsAndConditions,
      photos,
      location,
      availabilityStatus,
    });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ mssg: "POST a new workout" });
});

//DELETE
router.delete("/:id", (req, res) => {
  res.json({ mssg: "Delete a specific Vehicle" });
});

//UPDATE
router.patch("/:id", (req, res) => {
  res.json({ mssg: "Update a specific Vehicle" });
});

module.exports = router;

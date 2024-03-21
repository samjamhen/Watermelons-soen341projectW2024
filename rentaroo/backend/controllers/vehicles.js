const Vehicle = require("../models/vehicles");
const mongoose = require("mongoose");
const Branch = require("../models/branches")

//CREATE
const createVehicle = async (req, res) => {
  const {
    make,
    color,
    price,
    model,
    category,
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
    const newVehicle = await Vehicle.create({
      make,
      color,
      price,
      model,
      category,
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

    // Find the branch associated with the vehicle's location
    const branch = await Branch.findOne({ location });

    if (branch) {
      // Update the branch's vehicleIDs array with the new vehicle's ID
      await Branch.findByIdAndUpdate(branch._id, {
        $addToSet: { vehicleIDs: newVehicle._id }, // Use $addToSet to avoid adding duplicate vehicle IDs
      });
    }
    res.status(200).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//READ
//Get all Vehicles
const getAllVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({}).sort({ Timestamp: -1 });

  res.status(200).json(vehicles);
};
//Get a specific Vehicle
const getVehicle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  res.status(200).json(vehicle);
};
//UPDATE
const updateVehicle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  const existingVehicle = await Vehicle.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!existingVehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  res.status(200).json({ message: "Vehicle updated successfully" });
};

//DELETE
const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  console.log("in deletevehicle function backend");
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Vehicle not found" });
  }
  
  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  const branch = await Branch.findOne({ location: vehicle.location });

  if (branch) {
    // Remove the vehicle's ID from the branch's vehicleIDs array
    await Branch.findByIdAndUpdate(branch._id, {
      $pull: { vehicleIDs: vehicle._id },
    });
  }
  const existingVehicle = await Vehicle.findOneAndDelete({ _id: id });

  if (!existingVehicle) {
    return res.status(400).json({ error: "Vehicle not found" });
  }

  res.status(200).json({ message: "Vehicle deleted successfully" });
};

module.exports = {
  getAllVehicles,
  getVehicle,
  createVehicle,
  deleteVehicle,
  updateVehicle,
};

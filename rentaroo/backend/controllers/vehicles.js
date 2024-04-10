const Vehicle = require("../models/vehicles");
const User = require("../models/users");
const mongoose = require("mongoose");
const Branch = require("../models/branches")
const {sendVehicleEmailConfirmation, sendVehicleEmailRefused} = require("../middleware/emails.js")

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
    status,
    submittedBy,
    description,
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
      status,
      submittedBy,
      description,
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
  try {
    let query = Vehicle.find({}).sort({ Timestamp: -1 });

    // Optionally populate the application field
    if (req.query.includeApplication) {
      query = query.populate('application.submittedBy'); // Assuming 'submittedBy' is a field in the Customer model
    }

    const vehicles = await query.exec();
    
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get a specific Vehicle
const getVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    let query = Vehicle.findById(id);

    // Optionally populate the application field
    if (req.query.includeApplication) {
      query = query.populate('application.submittedBy'); // Assuming 'submittedBy' is a field in the Customer model
    }

    const vehicle = await query.exec();

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE
const updateVehicle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  try {
    const prevVehicle = await Vehicle.findById(id);

    if (!prevVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const existingVehicle = await Vehicle.findOneAndUpdate(
      { 
        _id: id,
      },
      { 
        ...req.body,
      },
      { 
        new: true // Return the updated document
      }
    );

    if (!existingVehicle) {
      // If the status was already approved, return error
      return res.status(400).json({ error: "Vehicle status already approved" });
    }

    if (prevVehicle.status === "pending" && existingVehicle.status === "approved") {
      const user = await User.findById(existingVehicle.submittedBy);
      
      if (!user) {
        throw new Error("User not found");
      }

      sendVehicleEmailConfirmation(existingVehicle, user);

      return res.status(200).json({ message: "Vehicle updated successfully" });
    }

    // If the status transition didn't occur, return success without email sending
    return res.status(200).json({ message: "Vehicle updated successfully" });
  } catch (error) {
    console.error("Error updating vehicle:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
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

  if(vehicle.status!=""){
    try {
      const user = await User.findById(vehicle.submittedBy);
      
      if (!user) {
        throw new Error("User not found");
      }

      sendVehicleEmailRefused(vehicle, user)
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }

  res.status(200).json({ message: "Vehicle deleted successfully" });
}};

module.exports = {
  getAllVehicles,
  getVehicle,
  createVehicle,
  deleteVehicle,
  updateVehicle,
};

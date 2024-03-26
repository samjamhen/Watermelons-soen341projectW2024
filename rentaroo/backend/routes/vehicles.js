const express = require("express");

const {
  createVehicle,
  getAllVehicles,
  getVehicle,
  deleteVehicle,
  updateVehicle,
} = require("../controllers/vehicles.js");

const router = express.Router();

//READ
//Get all Vehicles
router.get("/", getAllVehicles);

//Get a specific Vehicle
router.get("/:id", getVehicle);

//CREATE
//POST a new Vehicle
router.post("/", createVehicle);

//DELETE
router.delete("/:id", deleteVehicle);

//UPDATE
router.patch("/:id", updateVehicle);

module.exports = router;

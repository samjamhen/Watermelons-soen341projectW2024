const express = require("express");
const Reservation = require("../models/reservations.js");
const { bookReservation, 
  getReservations, 
  getReservationByName } = require("../controllers/reservations.js");

const router = express.Router();

//GET all reservations
router.get("/", getReservations);

//GET a single reservation 
router.get('/:fullName', getReservationByName);


router.post("/create", async (req, res) => {
  res.json({ mssg: "POST from json" });
});

//POST a new reservation
router.post("/", bookReservation);

module.exports = router;

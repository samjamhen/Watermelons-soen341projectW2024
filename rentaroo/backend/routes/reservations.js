const express = require("express");
const Reservation = require("../models/reservations.js");
const { bookReservation, 
  getReservations, 
  getReservationByName,
  updateReservation,
  deleteReservation } = require("../controllers/reservations.js");

const router = express.Router();

//GET all reservations
router.get("/", getReservations);

//GET a single reservation 
router.get('/:fullName', getReservationByName);

//POST a new reservation
router.post("/", bookReservation);

//DELETE a reservation
router.delete('/:fullName', deleteReservation);

//UPDATE a reservation
router.patch('/:fullName', updateReservation);

module.exports = router;

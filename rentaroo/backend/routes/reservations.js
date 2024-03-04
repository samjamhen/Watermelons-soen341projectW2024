const express = require("express");
const Reservation = require("../models/reservations.js");
const { bookReservation, 
  getReservations, 
  getReservationByName,
  updateReservation,
  deleteReservation,
  getReservationByPhone,
  getReservationByID } = require("../controllers/reservations.js");

const router = express.Router();

//GET all reservations
router.get("/", getReservations);

//GET a single reservation by name
router.get('/ReferenceNumber/:id', getReservationByID);

//GET a single reservation by name
router.get('/Name/:fullName', getReservationByName);

//GET a single reservation by phone
router.get('/Phone/:phone', getReservationByPhone);

//POST a new reservation
router.post("/", bookReservation);

//DELETE a reservation
router.delete('/:fullName', deleteReservation);

//UPDATE a reservation
router.patch('/:fullName', updateReservation);

module.exports = router;

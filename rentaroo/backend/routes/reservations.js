const express = require("express");
const Reservation = require("../models/reservations.js");
const { bookReservation, 
  getReservations, 
  getReservationByName,
  updateReservation,
  getReservationByPhone,
  getReservationByID,
  deleteReservationByID, 
  deleteReservationByName,
  deleteReservationByPhone} = require("../controllers/reservations.js");

const router = express.Router();

//GET all reservations
router.get("/", getReservations);

//GET a single reservation by reference number
router.get('/ReferenceNumber/:id', getReservationByID);

//GET a single reservation by name
router.get('/Name/:fullName', getReservationByName);

//GET a single reservation by phone
router.get('/Phone/:phone', getReservationByPhone);

//POST a new reservation
router.post("/", bookReservation);

//DELETE a reservation by id
router.delete('/:_id', deleteReservationByID);

//DELETE a reservation by name
router.delete('/Name/:fullName', deleteReservationByName);

//DELE a reservation by phone
router.delete('/Phone/:phone', deleteReservationByName);

//UPDATE a reservation
router.patch('/:_id', updateReservation);

module.exports = router;

const express = require('express')
const Reservation = require('../models/reservations.js')
const bookReservation = require("../controllers/reservations.js")

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: "Get all reservations"})
})

router.post('/create', async (req, res) => {
    res.json({mssg: "POST from json"})
})

//POST a new reservation
router.post('/', bookReservation)


module.exports = router

const mongoose = require("mongoose")

const reservations = new mongoose.Schema({
    reservationID:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    vehicle:{
        type: String,
        required: true
    },
    reservationStartDate:{
        type: Date,
        required: true
    },
    reservationEndDate:{
        type: Date,
        required: true
    },
}, {timestamps: true});

const Reservation = mongoose.model('Reservation', reservations)

module.exports = Reservation
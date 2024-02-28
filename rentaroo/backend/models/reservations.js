const mongoose = require("mongoose")

const reservations = new mongoose.Schema({

    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    vehicle:{
        type: String,
    },
    pickupAddress:{
        type: String, 
        required: true
    },
    pickupDate:{
        type: Date,
        required: true
    },
    returnDate:{
        type: Date,
        required: true
    },
}, {timestamps: true});

const Reservation = mongoose.model('Bookings', reservations)

module.exports = Reservation

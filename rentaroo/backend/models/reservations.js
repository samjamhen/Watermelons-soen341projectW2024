const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const reservations = new mongoose.Schema({

    id:{
        type: String,
        default: uuidv4,
        required: true
    },

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

const Reservation = mongoose.model('Reservations', reservations)

module.exports = Reservation

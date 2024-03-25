const mongoose = require("mongoose")

const reservations = new mongoose.Schema({

    userID:{
        type: String,
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
    driversLicenseNumber:{
        type: String,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    }, 
    creditCard:{
        type: String,
    },
    status:{
        type: String,
        default: "booked"
    },
    depositStatus:{
        type: String, 
        default: "notPayed"
    },
    previousDamages:{
        type: String,
        default: "none"
    },
    newDamages:{
        type: String,
        default: "none"
    },
    finalPrice:{
        type: Number
    }
}, {timestamps: true});

const Reservation = mongoose.model('Reservations', reservations)

module.exports = Reservation

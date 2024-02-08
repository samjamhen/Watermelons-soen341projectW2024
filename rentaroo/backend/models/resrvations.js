const mongoose = require("mongoose")

const reservations = new mongoose.Schema({
    reservationID:{
        type: Number,
        required: True
    },
    name:{
        type: String,
        required: True
    },
    vehicle:{
        type: String,
        required: True
    },
    reservationStartDate:{
        type: Date,
        required: True
    },
    reservationEndDate:{
        type: Date,
        required: True
    },
    reservedAt:{
        type:Date,
        default: Date.now()
        
    }
})

const Reservation = mongoose.model('Reservation', reservations)

module.exports = {
    Reservation
}
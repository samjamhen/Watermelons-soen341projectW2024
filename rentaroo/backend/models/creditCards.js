const mongoose = require("mongoose")

const creditCards = new mongoose.Schema({
    number:{
        type: String,
        required: true
    },
    CVV:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        required: true
    },
    expiry:{
        type: String,
        required: true
    }
}, {timestamps: true})

const CreditCard = mongoose.model('CreditCards', creditCards)

module.exports = CreditCard
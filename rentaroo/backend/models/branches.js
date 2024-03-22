const mongoose = require("mongoose")

const branches = new mongoose.Schema({
    location:{
        type: String,
        required: true
    },
    vehicleIDs:{
        type: [String],
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
    
}, {timestamps: true})

const Branch = mongoose.model('Branches', branches)

module.exports = Branch
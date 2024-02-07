const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://admin:Rentaroo1@rentaroodb.dchkjpr.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, () => {
        console.log("Rentaroo app is running on port 3000")
    })
}).catch((error) => {
    console.log(error)
})

//Define routes for CRUD operations

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 8000;

//Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://admin:Rentaroo1@rentaroodb.dchkjpr.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
        console.log(`Rentaroo app is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})

//Define routes for CRUD operations

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const vehicleModel = require("./models/vehicle");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:Rentaroo1@rentaroodb.dchkjpr.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/createVehicle", (req, res) => {
  vehicleModel
    .create(req.body)
    .then((vehicle) => res.json(vehicle))
    .catch((err) => res.json(err));
});
app.listen(3000, () => {
  console.log("Server is now running");
});

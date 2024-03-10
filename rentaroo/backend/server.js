const express = require("express");
const mongoose = require("mongoose");

//express app
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;
const reservationRoutes = require("./routes/reservations");
const usersRoutes = require("./routes/users");
const vehicleRoutes = require("./routes/vehicles");

//Middleware
app.use(express.json());

//Connect to MongoDB and start the server
mongoose
  .connect(
    "mongodb+srv://admin:Rentaroo1@rentaroodb.dchkjpr.mongodb.net/Rentaroo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Rentaroo app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Define routes for CRUD operations
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/vehicles", vehicleRoutes);

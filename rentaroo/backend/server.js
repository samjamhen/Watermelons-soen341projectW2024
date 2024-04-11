
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//express app
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const sgMail = require('@sendgrid/mail');

// Use middleware routes

const PORT = process.env.PORT || 8000;
const reservationRoutes = require("./routes/reservations");
const usersRoutes = require("./routes/users");
const vehicleRoutes = require("./routes/vehicles");
const billsRoutes = require("./routes/bills");
const branchRoutes = require("./routes/branches");
const creditCardRoutes = require("./routes/creditCards");
const stripeRoutes = require("./middleware/stripepayment");
const webhookRoutes = require("./middleware/webhooks");

//Middleware
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

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
app.use("/api/branches", branchRoutes);
app.use("/api/creditCards", creditCardRoutes);
app.use("/api/bills", billsRoutes);
app.use("/api/stripepayment", stripeRoutes);
app.use("/api/webhooks", webhookRoutes);

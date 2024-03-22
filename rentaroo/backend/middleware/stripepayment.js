const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51OwoUjHl4TTAadrILUqHQUzvftP0uLESSHSW9ylhzdTkbIvYM2pUcRLQP20GeIStaF3iad5JBqV6y7tEPLNXyQLn00uVQclcmw"
);
const router = express.Router();
const app = require("../server"); // Adjust the path as needed
const cors = require("cors"); // Import the cors middleware

const Reservation = require("../models/reservations"); // Import Reservation model
const Bill = require("../models/bills"); // Import Bill model
const Vehicle = require("../models/vehicles"); // Import Vehicle model

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { reservationId, userId } = req.body;

    // Retrieve reservation data from the database
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Retrieve user data from the database (if needed)

    // Retrieve vehicle data from the database
    const vehicle = await Vehicle.findById(reservation.vehicle);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Use retrieved data to create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: `Vehicle Rental - ${vehicle.make} ${vehicle.model}`, // Customize the product name as needed
            },
            unit_amount: reservation.totalPrice * 100, // Convert price to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: reservation.email, // Replace with the customer's email
      success_url: "http://localhost:3000", // Replace with your actual success URL
      cancel_url: "http://localhost:3000", // Replace with your actual cancel URL
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Checkout Session:", error);
    res.status(500).json({ error: "Failed to create Checkout Session" });
  }
});

module.exports = router;

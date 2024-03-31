const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51OwoUjHl4TTAadrILUqHQUzvftP0uLESSHSW9ylhzdTkbIvYM2pUcRLQP20GeIStaF3iad5JBqV6y7tEPLNXyQLn00uVQclcmw"
);
const router = express.Router();

// Route to handle webhook events from Stripe
router.post("/webhook", async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed.", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event based on its type
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      // Update your database or perform other actions based on the completed Checkout Session
      break;
    // Add other cases to handle different webhook event types as needed
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
});

module.exports = router;

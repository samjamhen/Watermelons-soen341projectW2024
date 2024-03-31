const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [
    {
      vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  billingDate: { type: Date, default: Date.now },
  billingAddress: { type: String, required: true },
  billPDF: { type: String },
  // Other fields like payment status, billing address, etc. can be added here
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;

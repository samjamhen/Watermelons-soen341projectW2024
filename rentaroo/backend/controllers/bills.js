// controllers/billController.js

const Bill = require("../models/bills");
const Reservations = require("../models/reservations");
const Vehicle = require("../models/vehicles");
const Customer = require("../models/users");

// Controller to create a new bill
const createBill = async (req, res) => {
  try {
    const { reservationId, customerId } = req.body;

    // Check if the order exists
    const reservation = await Reservations.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Check if the customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Calculate total amount
    let totalAmount = 0;
    const items = [];

    for (const item of req.body.items) {
      const vehicle = await Vehicle.findById(item.vehicle);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      totalAmount += item.quantity * vehicle.price;
      items.push({
        vehicle: vehicle._id,
        quantity: item.quantity,
        price: vehicle.price,
      });
    }

    // Create the bill
    const bill = new Bill({
      reservation: reservation._id,
      customer: customer._id,
      items: items,
      totalAmount: totalAmount,
      billingAddress: req.body.billingAddress,
      billPDF: req.body.billPDF,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all bills
const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate("reservation")
      .populate("customer");
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getBillById = async (req, res) => {
  try {
    const billId = req.params.id;
    const bill = await Bill.findById(billId)
      .populate("reservation")
      .populate("customer");
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a bill
const updateBill = async (req, res) => {
  try {
    const billId = req.params.id;
    const { items, totalAmount, billingAddress, billPDF } = req.body;

    // Check if the bill exists
    const bill = await Bill.findById(billId);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // Update the bill
    bill.items = items;
    bill.totalAmount = totalAmount;
    bill.billingAddress = billingAddress;
    bill = billPDF;

    // Save the updated bill
    const updatedBill = await bill.save();

    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a bill
const deleteBill = async (req, res) => {
  try {
    const billId = req.params.id;

    // Check if the bill exists
    const bill = await Bill.findById(billId);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // Delete the bill
    await bill.remove();

    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBills,
  getBillById,
  createBill,
  deleteBill,
  updateBill,
};

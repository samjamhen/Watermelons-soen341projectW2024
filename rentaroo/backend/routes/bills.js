// routes/billRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllBills,
  getBillById,
  createBill,
  deleteBill,
  updateBill,
} = require("../controllers/bills");

// Route to get all bills
router.get("/", getAllBills);

// Route to get a bill by ID
router.get("/:id", getBillById);

// Route to create a new bill
router.post("/", createBill);

// Route to update a bill
router.put("/:id", updateBill);

// Route to delete a bill
router.delete("/:id", deleteBill);

module.exports = router;

const express = require('express')
const Branch = require("../models/branches.js")
const { createBranch, getBranches, getBranch, updateBranch, deleteBranch } = require("../controllers/branches.js")

const router = express.Router()

//get all branches
router.get("/", getBranches);

//get a branch
router.get("/:_id", getBranch);

//create a branch
router.post("/", createBranch);

//update a branch
router.patch("/:_id", updateBranch);

//delete a branch
router.delete("/:_id", deleteBranch);

module.exports = router;
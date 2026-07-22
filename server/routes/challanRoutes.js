const express = require("express");
const router = express.Router();

const {
  createChallan,
  getChallans,
  getChallanById,
  updateChallan,
  deleteChallan,
} = require("../controllers/challanController");

// Create Challan
router.post("/", createChallan);

// Get All Challans
router.get("/", getChallans);

// Get Single Challan
router.get("/:id", getChallanById);

// Update Challan
router.put("/:id", updateChallan);

// Delete Challan
router.delete("/:id", deleteChallan);

module.exports = router;
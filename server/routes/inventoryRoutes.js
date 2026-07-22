const express = require("express");

const router = express.Router();

const {
  updateStock,
  getInventory
} = require("../controllers/inventoryController");


router.post("/", updateStock);

router.get("/", getInventory);


module.exports = router;
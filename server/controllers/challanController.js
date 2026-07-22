const Challan = require("../models/Challan");

// Create Challan
exports.createChallan = async (req, res) => {
  try {
    const { customer, products } = req.body;

    let totalAmount = 0;

    products.forEach((item) => {
      totalAmount += item.quantity * item.price;
    });

    const challan = await Challan.create({
      customer,
      products,
      totalAmount,
    });

    res.status(201).json({
      message: "Challan created successfully",
      challan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Challans
exports.getChallans = async (req, res) => {
  try {
    const challans = await Challan.find()
      .populate("customer", "name email")
      .populate("products.product", "name sku");

    res.json(challans);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Challan
exports.getChallanById = async (req, res) => {
  try {
    const challan = await Challan.findById(req.params.id)
      .populate("customer")
      .populate("products.product");

    if (!challan) {
      return res.status(404).json({
        message: "Challan not found",
      });
    }

    res.json(challan);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Challan
exports.updateChallan = async (req, res) => {
  try {
    const { customer, products } = req.body;

    let totalAmount = 0;

    products.forEach((item) => {
      totalAmount += item.quantity * item.price;
    });

    const challan = await Challan.findByIdAndUpdate(
      req.params.id,
      {
        customer,
        products,
        totalAmount,
      },
      { new: true }
    );

    res.json({
      message: "Challan updated successfully",
      challan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Challan
exports.deleteChallan = async (req, res) => {
  try {
    await Challan.findByIdAndDelete(req.params.id);

    res.json({
      message: "Challan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
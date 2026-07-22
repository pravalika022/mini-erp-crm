const Customer = require("../models/Customer");


// Create Customer
exports.createCustomer = async (req, res) => {
  try {

    const customer = await Customer.create(req.body);

    res.status(201).json({
      message: "Customer created successfully",
      customer
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Get All Customers
exports.getCustomers = async (req, res) => {
  try {

    const customers = await Customer.find();

    res.json(customers);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Get Single Customer
exports.getCustomerById = async (req, res) => {
  try {

    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.json(customer);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Update Customer
exports.updateCustomer = async (req, res) => {
  try {

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Customer updated successfully",
      customer
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Delete Customer
exports.deleteCustomer = async (req, res) => {
  try {

    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Customer deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
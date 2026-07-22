const Inventory = require("../models/Inventory");
const Product = require("../models/Product");


// Stock IN / OUT
exports.updateStock = async (req, res) => {
  try {

    const { product, quantity, type, note } = req.body;


    const productData = await Product.findById(product);

    if (!productData) {
      return res.status(404).json({
        message: "Product not found"
      });
    }


    // Stock IN
    if (type === "IN") {
      productData.quantity += quantity;
    }


    // Stock OUT
    if (type === "OUT") {

      if (productData.quantity < quantity) {
        return res.status(400).json({
          message: "Insufficient stock"
        });
      }

      productData.quantity -= quantity;
    }


    await productData.save();


    const inventory = await Inventory.create({
      product,
      quantity,
      type,
      note
    });


    res.status(201).json({
      message: "Stock updated successfully",
      inventory,
      currentStock: productData.quantity
    });


  } catch(error) {

    res.status(500).json({
      message:error.message
    });

  }
};



// Get Inventory History
exports.getInventory = async (req,res)=>{

  try{

    const inventory = await Inventory.find()
      .populate("product","name sku");

    res.json(inventory);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};
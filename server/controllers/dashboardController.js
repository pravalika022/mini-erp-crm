const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Challan = require("../models/Challan");

exports.getDashboard = async (req,res)=>{
  try {

    const customers = await Customer.countDocuments();

    const products = await Product.countDocuments();

    const challans = await Challan.countDocuments();

    const stock = await Product.aggregate([
      {
        $group:{
          _id:null,
          totalStock:{
            $sum:"$quantity"
          }
        }
      }
    ]);


    const sales = await Challan.aggregate([
      {
        $group:{
          _id:null,
          totalSales:{
            $sum:"$totalAmount"
          }
        }
      }
    ]);


    res.json({
      customers,
      products,
      challans,
      totalStock:
        stock[0]?.totalStock || 0,
      totalSales:
        sales[0]?.totalSales || 0
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};
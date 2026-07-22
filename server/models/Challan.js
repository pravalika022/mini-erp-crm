const mongoose = require("mongoose");

const challanSchema = new mongoose.Schema(
{
  customer:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Customer",
    required:true
  },

  products:[
    {
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
      },

      quantity:{
        type:Number,
        required:true
      },

      price:{
        type:Number,
        required:true
      }
    }
  ],

  totalAmount:{
    type:Number,
    required:true
  },

  status:{
    type:String,
    default:"Pending"
  }

},
{
  timestamps:true
});

module.exports = mongoose.model("Challan",challanSchema);
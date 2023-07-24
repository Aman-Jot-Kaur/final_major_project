const mongoose = require("mongoose")
const Schema = mongoose.Schema
const OrderSchema = new Schema({
    price: {
        type: Number

    },
    category: {
        type: String

    },
    description: {
        type: String
    },
   discountedPrice: {
        type: Number
    },
   orders: {
        type: Number
    } ,
    vendor:{
        type:String
    } ,
    title:{
        type:String,
     
    },
    approved:{
        type:Boolean
    },
    customer:{
        type:String
    },
    earning: {
        type: Number
    } ,
   quantity: {
        type: Number
    } ,
    status:{
        type:String
    }  ,
    time : { type : Date, default: Date.now }
              
})
const OrderModel = mongoose.model("order", OrderSchema)
module.exports = OrderModel
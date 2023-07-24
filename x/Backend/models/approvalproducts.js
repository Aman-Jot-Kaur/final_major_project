const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ApprovalProductSchema = new Schema({
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
    }     ,
    customer:{
        type:String
    }   ,    outofstock:{
        type:String
    }   ,images:{
        type:[String]
    }  
})
const ApprovalProductModel = mongoose.model("adminproduct", ApprovalProductSchema)
module.exports = ApprovalProductModel
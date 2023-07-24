const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserSchema = new Schema({
    displayName: {
        type: String

    },
    password: {
        type: String

    },
    email: {
        type: String,
        unique: true
    },
    number: {
        type: String
    },
    role: {
        type: String
    },
    address: {
        type: String
    },
    cart: {
        type: [Object]
    },
    vendorproduct: {
        type: [Object]
    },

    profile: {
        type: [String]
    },
    disable: {
        type: String
    },
    time: { type: Date, default: Date.now }
})
const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel
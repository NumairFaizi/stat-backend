const mongoose = require("mongoose");

const billingModel = mongoose.Schema({
    customerName: {
        type: String,
        required: [true, "Please enter a Username!"]
    },

    email: {
        type: String,
        required: [true, "Please enter the password."],
    },

    billingProducts: [],
    
    totalAmount: Number,

    totalItem: Number,

    date: String, 

    time: String
}, {
    timestamps: true,
}
);
module.exports = mongoose.model("Bill", billingModel);
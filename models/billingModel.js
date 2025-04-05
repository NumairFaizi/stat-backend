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

    discount: Number,

    discountAmount: Number,

    SGSTandCGST: Number,
    
    subTotal: Number,
    
    grandTotal: Number,

    paymentMethod: String,

    totalItem: Number,

    date: String, 

    time: String
}, {
    timestamps: true,
}
);
module.exports = mongoose.model("Bill", billingModel);
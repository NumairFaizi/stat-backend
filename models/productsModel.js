const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add the Product name"],
    },
    qty:{
        type: String,
        required: [true, "Please add the Product Quantity"],
    },
    price:{
        type: String,
        required: [true, "Please add the Product Price"],
    },
})
module.exports = mongoose.model("product", productsSchema);
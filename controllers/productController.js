const asyncHandler = require("express-async-handler");
const Products = require("../models/productsModel");


//@desc Get all products
//@route GET /api/product
//@access private
const getProducts = asyncHandler(async(req, res) => {
    const products = await Products.find({user_id: req.user.id});
    res.status(200).json(products);
});

//@desc Get products for
//@route GET /api/product/:id
//@access private
const getProduct = asyncHandler(async(req, res) => {
    const product = await Products.findById(req.params.id);
    if(!product){ 
        res.status(404).json({message: "Product not found"});
        throw new Error("Product not found");
        
    }
    res.status(200).json(product);
});

//@desc Create NEW product
//@route POST /api/product
//@access private
const createProduct = asyncHandler(async(req, res) => {

    // console.log("the request body is :",req.body);

    const {name, qty, price, brand } = req.body;

    if(!name || !qty || !price || !brand){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const product = await Products.create({
        name,
        qty,
        price,
        brand,
        user_id: req.user.id
    })
    res.status(201).json({product, message: "Product added Successfully"});
});

//@desc update product
//@route PUT /api/product/:id
//@access private
const updateProduct = asyncHandler(async(req, res) => {
    const product = await Products.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    const updatedProduct = await Products.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json({updatedProduct, message: "Product updated"});
});

//@desc delete product
//@route DELETE /api/product/:id
//@access private
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Products.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({product, message: "product deleted"});
});
module.exports = {createProduct, updateProduct, getProducts,getProduct, deleteProduct};

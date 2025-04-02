//@desc create bill
//@route GET /api/bill

const billingModel = require("../models/billingModel");
const asyncHandler = require("express-async-handler");

//@access private
const addBill = asyncHandler(async(req, res) => {
    
    const bill = req.body
    // console.log(bill)

    const newBill =  new billingModel(bill)

    const savedBill = await newBill.save()
    res.status(200).json({message: 'Bill added successfully'})

});


module.exports = {
    addBill
}
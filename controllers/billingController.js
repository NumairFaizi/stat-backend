//@desc create bill
//@route GET /api/bill

const billingModel = require("../models/billingModel");
const asyncHandler = require("express-async-handler");

//@access private
const addBill = asyncHandler(async (req, res) => {

    const bill = req.body
    // console.log(bill)

    const newBill = new billingModel(bill)

    const savedBill = await newBill.save()
    res.status(200).json({ message: 'Bill added successfully' })

});

const billBySearchString = asyncHandler(async (req, res) => {

    const searchString = req.params.searchString
    console.log(searchString)

    res.status(200).json({ message: 'Show bill' })
})

const getBills = asyncHandler(async (req, res) => {

    // console.log(req)

    const billingData = await billingModel.find()

    if (!billingData) {

        res.status(404).json({ message: "No Data Found" });
        throw new Error("Billing Data not Found");
    }

    res.status(200).json({ message: 'Show bills', billingData })
})


module.exports = {
    addBill,
    billBySearchString,
    getBills
}
const billingModel = require("../models/billingModel");
const asyncHandler = require("express-async-handler");
const productsModel = require('../models/productsModel')

//@desc create bill
//@route GET /api/bill
//@access private
const addBill = asyncHandler(async (req, res) => {

    // console.log(req.body)

    const { grandTotal, subTotal, discount, discountAmount, SGSTandCGST, CGSTAmount, totalItem, dateAndTime, billingProducts, email, customerName, paymentMethod } = req.body

    const time = dateAndTime.split(',')[1].trim()
    const date = dateAndTime.split(',')[0].trim()


    const newBill = new billingModel({ grandTotal, subTotal, discount, discountAmount, SGSTandCGST, CGSTAmount, totalItem, date, time, billingProducts, email, customerName, paymentMethod })

    // console.log(newBill)

    const savedBill = await newBill.save()

    // console.log(savedBill)
    res.status(200).json({ message: 'Bill added successfully' })

    let newProdu = [{}]
    for (const products of req.body.billingProducts) {

        const prod  = await productsModel.findByIdAndUpdate({ _id: products.id }, { $inc: { qty: -Number(products.qty) } })

        newProdu.push(prod)
    }
    console.log(newProdu)

});

const billBySearchString = asyncHandler(async (req, res) => {

    const searchString = req.params.searchString

    // console.log('string', searchString)

    let date;
    if (/^\d{4}-\d{2}-\d{2}$/.test(searchString)) {

        const dateObj = new Date(searchString);
        date = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
        // console.log('foramtted', date)
    }

    // console.log(typeof(searchString) )

    const billingData = await billingModel.find(
        {
            $or: [
                { date },
                { email: searchString },
                { customerName: searchString }
            ]
        })

    if (!billingData) {

        console.log(billingData)

        res.status(404).json({ message: "No Data Found" });
        throw new Error("Billing Data not Found");
    }

    res.status(200).json({ billingData })
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
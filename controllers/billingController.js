//@desc create bill
//@route GET /api/bill

const billingModel = require("../models/billingModel");
const asyncHandler = require("express-async-handler");

//@access private
const addBill = asyncHandler(async (req, res) => {

    const { totalAmount, totalItem, dateAndTime, billingProducts, email, customerName } = req.body

    const time = dateAndTime.split(',')[1].trim()
    const date = dateAndTime.split(',')[0].trim()

    const newBill = new billingModel({ totalAmount, totalItem, date, time, billingProducts, email, customerName })

    // console.log(newBill)

    const savedBill = await newBill.save()
    res.status(200).json({ message: 'Bill added successfully' })

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
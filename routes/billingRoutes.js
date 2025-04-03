const express = require("express");
const {
   addBill,
   billBySearchString,
   getBills,
} = require("../controllers/billingController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();


router.post("/add-bill", validateToken, addBill);


router.get("/bill-by-search-string/:searchString", validateToken, billBySearchString)
   .get('/bills', getBills)

module.exports = router;

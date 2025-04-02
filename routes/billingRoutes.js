const express = require("express");
const { 
   addBill
} = require("../controllers/billingController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();


router.post("/add-bill", validateToken, addBill);

module.exports = router;

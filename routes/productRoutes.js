const express = require("express");
const router = express.Router();
const {getProduct,getProducts, deleteProduct, createProduct, updateProduct} = require("../controllers/productController");

router.route("/").get(getProducts).post(createProduct);

router.route("/:id").put(updateProduct).delete(deleteProduct).get(getProduct);

module.exports = router;

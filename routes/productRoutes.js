const express = require("express");
const router = express.Router();
const {getProduct,getProducts, deleteProduct, createProduct, updateProduct} = require("../controllers/productController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getProducts).post(createProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct).get(getProduct);

module.exports = router;

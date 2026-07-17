const express = require("express");

const router = express.Router();

const {
    getProducts,
    addProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

require("../controllers/productController");

router.get("/", getProducts);
router.post("/", addProduct);
router.get("/:id", getSingleProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const productController = require("../controllers/products");

const router = express.Router();

router.get("/", productController.getShop);
router.get("/product/:productId", productController.getProductById);

module.exports = router;

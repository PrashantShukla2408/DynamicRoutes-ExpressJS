const path = require("path");

const express = require("express");

const cartController = require("../controllers/cart");

const router = express.Router();

router.post("/add-to-cart", cartController.postAddToCart);
router.post("/update-cart", cartController.postUpdateCart);
router.post("/delete-from-cart", cartController.postDeleteFromCart);
router.get("/cart", cartController.getCart);

module.exports = router;

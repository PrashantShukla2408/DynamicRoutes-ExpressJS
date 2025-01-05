const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

exports.postAddToCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    if (product) {
      Cart.addProduct(prodId, product.price);
      res.redirect("/cart");
    } else {
      res.status(404).send("Product not found");
    }
  });
};

exports.postUpdateCart = (req, res) => {
  const cartProductId = req.query.cartProductId;
  const newQty = parseInt(req.body.newQty);
  Product.findById(cartProductId, (product) => {
    if (product) {
      Cart.updateProduct(cartProductId, newQty, product.price);
      res.redirect("/cart");
    } else {
      res.status(404).send("Product not found");
    }
  });
};

exports.postDeleteFromCart = (req, res) => {
  const cartProductId = req.body.cartProductId;
  Product.findById(cartProductId, (product) => {
    if (product) {
      Cart.deleteProduct(cartProductId, product.price);
      res.redirect("/cart");
    } else {
      res.status(404).send("Product not found");
    }
  });
};

exports.getCart = (req, res) => {
  Cart.fetchAll((cart) => {
    if (!cart || !cart.products) {
      return res.render("cart", { cartProducts: [], totalPrice: 0 });
    }
    Product.fetchAll((products) => {
      const cartProducts = (cart.products || []).map((cartProd) => {
        const product = products.find((prod) => prod.id === cartProd.id);
        console.log(product);
        return { productData: product, qty: cartProd.qty };
      });
      res.render("cart", {
        cartProducts: cartProducts,
        totalPrice: cart.totalPrice,
      });
    });
  });
};

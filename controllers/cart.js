const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

// exports.postAddToCart = (req, res) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, (product) => {
//     if (product) {
//       Cart.addProduct(prodId, product.price);
//       res.redirect("/cart");
//     } else {
//       res.status(404).send("Product not found");
//     }
//   });
// };

exports.postAddToCart = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then(([product]) => {
      if (product.length > 0) {
        Cart.addProduct(productId, product.price)
          .then(() => {
            res.redirect("/cart");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.status(404).send("Product not found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.postUpdateCart = (req, res) => {
//   const cartProductId = req.query.cartProductId;
//   const newQty = parseInt(req.body.newQty);
//   Product.findById(cartProductId, (product) => {
//     if (product) {
//       Cart.updateProduct(cartProductId, newQty, product.price);
//       res.redirect("/cart");
//     } else {
//       res.status(404).send("Product not found");
//     }
//   });
// };

exports.postUpdateCart = (req, res) => {
  const cartProductId = req.query.cartProductId;
  const newQty = parseInt(req.body.newQty);
  Cart.updateProduct(cartProductId, newQty)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.postDeleteFromCart = (req, res) => {
//   const cartProductId = req.body.cartProductId;
//   Product.findById(cartProductId, (product) => {
//     if (product) {
//       Cart.deleteProduct(cartProductId, product.price);
//       res.redirect("/cart");
//     } else {
//       res.status(404).send("Product not found");
//     }
//   });
// };

exports.postDeleteFromCart = (req, res) => {
  const cartProductId = req.body.cartProductId;
  Cart.deleteProduct(cartProductId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Product not found");
    });
};

// exports.getCart = (req, res) => {
//   Cart.fetchAll((cart) => {
//     if (!cart || !cart.products) {
//       return res.render("cart", { cartProducts: [], totalPrice: 0 });
//     }
//     Product.fetchAll((products) => {
//       const cartProducts = (cart.products || []).map((cartProd) => {
//         const product = products.find((prod) => prod.id === cartProd.id);
//         console.log(product);
//         return { productData: product, qty: cartProd.qty };
//       });
//       res.render("cart", {
//         cartProducts: cartProducts,
//         totalPrice: cart.totalPrice,
//       });
//     });
//   });
// };

exports.getCart = (req, res) => {
  Cart.fetchAll()
    .then(([cartItems]) => {
      if (cartItems.length === 0) {
        return res.render("cart", { cartProducts: [], totalPrice: 0 });
      }
      Product.fetchAll()
        .then(([products]) => {
          const cartProducts = cartItems.map((cartItem) => {
            const product = products.find(
              (prod) => prod.id === cartItem.productId
            );
            console.log(product);
            return { productData: product, qty: cartItem.quantity };
          });
          const totalPrice = cartProducts.reduce((total, cartProduct) => {
            return total + cartProduct.qty * cartProduct.productData.price;
          }, 0);
          res.render("cart", {
            cartProducts: cartProducts,
            totalPrice: totalPrice,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

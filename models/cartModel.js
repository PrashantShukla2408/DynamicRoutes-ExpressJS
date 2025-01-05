const path = require("path");

const fs = require("fs");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

const getCartFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb({ products: [], totalPrice: 0 });
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Cart {
  static addProduct(id, productPrice) {
    getCartFromFile((cart) => {
      if (!cart.products) {
        cart.products = [];
      }

      const existingproductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingproductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingproductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice; // +productPrice is used to convert string to number(type coercion)

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static updateProduct(id, newQty, productPrice) {
    getCartFromFile((cart) => {
      const updatedCart = { ...cart };
      const productIndex = updatedCart.products.findIndex(
        (prod) => prod.id === id
      );
      if (productIndex === -1) {
        return;
      }
      const product = updatedCart.products[productIndex];
      const oldQty = product.qty;
      product.qty = newQty;
      updatedCart.products[productIndex] = product;
      updatedCart.totalPrice =
        updatedCart.totalPrice + (newQty - oldQty) * productPrice;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    getCartFromFile((cart) => {
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - product.qty * productPrice;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getCartFromFile(cb);
  }
};

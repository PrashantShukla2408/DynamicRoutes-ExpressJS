const path = require("path");

const fs = require("fs");

const db = require("../util/database");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

// const getCartFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb({ products: [], totalPrice: 0 });
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Cart {
  // static addProduct(id, productPrice) {
  //   getCartFromFile((cart) => {
  //     if (!cart.products) {
  //       cart.products = [];
  //     }

  //     const existingproductIndex = cart.products.findIndex(
  //       (prod) => prod.id === id
  //     );
  //     const existingProduct = cart.products[existingproductIndex];

  //     let updatedProduct;

  //     if (existingProduct) {
  //       updatedProduct = { ...existingProduct };
  //       updatedProduct.qty = updatedProduct.qty + 1;
  //       cart.products = [...cart.products];
  //       cart.products[existingproductIndex] = updatedProduct;
  //     } else {
  //       updatedProduct = { id: id, qty: 1 };
  //       cart.products = [...cart.products, updatedProduct];
  //     }
  //     cart.totalPrice = cart.totalPrice + +productPrice; // +productPrice is used to convert string to number(type coercion)

  //     fs.writeFile(p, JSON.stringify(cart), (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  static addProduct(id, productPrice) {
    return db
      .execute("SELECT * FROM cart WHERE productId=?", [id])
      .then(([rows]) => {
        if (rows.length > 0) {
          const newQuantity = rows[0].quantity + 1;
          return db.execute("UPDATE cart SET quantity=? WHERE productId=?", [
            newQuantity,
            id,
          ]);
        } else {
          return db.execute(
            "INSERT INTO cart (productId, quantity) VALUES (?, ?)",
            [id, 1]
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // static updateProduct(id, newQty, productPrice) {
  //   getCartFromFile((cart) => {
  //     const updatedCart = { ...cart };
  //     const productIndex = updatedCart.products.findIndex(
  //       (prod) => prod.id === id
  //     );
  //     if (productIndex === -1) {
  //       return;
  //     }
  //     const product = updatedCart.products[productIndex];
  //     const oldQty = product.qty;
  //     product.qty = newQty;
  //     updatedCart.products[productIndex] = product;
  //     updatedCart.totalPrice =
  //       updatedCart.totalPrice + (newQty - oldQty) * productPrice;
  //     fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  static updateProduct(id, newQty) {
    return db.execute("UPDATE cart SET quantity=? WHERE productId=?", [
      newQty,
      id,
    ]);
  }

  // static deleteProduct(id, productPrice) {
  //   getCartFromFile((cart) => {
  //     const updatedCart = { ...cart };
  //     const product = updatedCart.products.find((prod) => prod.id === id);
  //     if (!product) {
  //       return;
  //     }
  //     updatedCart.products = updatedCart.products.filter(
  //       (prod) => prod.id !== id
  //     );
  //     updatedCart.totalPrice =
  //       updatedCart.totalPrice - product.qty * productPrice;
  //     fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  static deleteProduct(id) {
    return db.execute("DELETE FROM cart WHERE productId = ?", [id]);
  }

  // static fetchAll(cb) {
  //   getCartFromFile(cb);
  // }

  static fetchAll() {
    return db.execute("SELECT * FROM cart");
  }
};

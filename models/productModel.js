const path = require("path");

const fs = require("fs");

const db = require("../util/database");

const rootDir = require("../util/path");
const { deleteById } = require("./contactModel");

const p = path.join(rootDir, "data", "products.json");

// Commenting the below because we are using database now

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(title, price, id) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  // save() {
  //   getProductsFromFile((products) => {
  //     products.push(this);
  //     fs.writeFile(p, JSON.stringify(products), (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  // Commenting the below because we are using database now

  // save() {
  //   getProductsFromFile((products) => {
  //     if (this.id) {
  //       const existingProductIndex = products.findIndex(
  //         (p) => p.id === this.id
  //       );
  //       const updatedProducts = [...products];
  //       updatedProducts[existingProductIndex] = this;
  //       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
  //         console.log(err);
  //       });
  //     } else {
  //       this.id = Math.random().toString();
  //       products.push(this);
  //       fs.writeFile(p, JSON.stringify(products), (err) => {
  //         console.log(err);
  //       });
  //     }
  //   });
  // }

  // static fetchAll(cb) {
  //   getProductsFromFile(cb);
  // }

  // static findById(id, cb) {
  //   getProductsFromFile((products) => {
  //     const product = products.find((p) => p.id === id);
  //     cb(product);
  //   });
  // }

  //   static deleteById(id, cb) {
  //     getProductsFromFile((products) => {
  //       const updatedProducts = products.filter((p) => p.id !== id);
  //       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
  //         if (!err) {
  //           cb();
  //         }
  //       });
  //     });
  //   }

  save() {
    if (this.id) {
      return db.execute("UPDATE products SET title=?, price=? WHERE id=?", [
        this.title,
        this.price,
        this.id,
      ]);
    } else {
      return db.execute("INSERT INTO products (title, price) VALUES(?,?)", [
        this.title,
        this.price,
      ]);
    }
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static deleteById(id) {
    return db.execute("DELETE FROM products WHERE products.id = ?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }
};

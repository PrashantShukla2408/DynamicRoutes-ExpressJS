const path = require("path");

const rootDir = require("../util/path");

const Product = require("../models/productModel");

exports.getAddProduct = (req, res) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

// exports.postAddProduct = (req, res) => {
//   const product = new Product(req.body.title, req.body.price);
//   product.save();
//   res.redirect("/shop");
// };

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title, req.body.price);
  product
    .save()
    .then(() => {
      res.redirect("/shop");
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getProducts = (req, res) => {
//   Product.fetchAll((products) => {
//     res.send(products);
//   });
// };

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getProductById = (req, res) => {
//   const productId = req.params.productId;
//   Product.findById(productId, (product) => {
//     if (product) {
//       res.render("product-detail", { product: product });
//     } else {
//       res.status(404).send("Product not found");
//     }
//   });
// };

exports.getProductById = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(([product]) => {
      res.render("product-detail", {
        product: product[0], // Because view expects only one single object not array
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getEditProduct = (req, res) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/shop");
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId, (product) => {
//     if (!product) {
//       return res.redirect("/shop");
//     }
//     res.render("edit-product", {
//       product: product,
//       edititng: editMode,
//     });
//   });
// };

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/shop");
  }
  const productId = req.params.productId;
  Product.findById(productId)
    .then(([product]) => {
      if (!product) {
        return res.redirect("/shop");
      }
      res.render("edit-product", {
        product: product[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.postEditProduct = (req, res) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;

//   const updatedProduct = new Product(updatedTitle, updatedPrice, prodId);
//   updatedProduct.save();
//   res.redirect("/shop");
// };

exports.postEditProduct = (req, res) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;

  const updatedProduct = new Product(updatedTitle, updatedPrice, productId);
  updatedProduct
    .save()
    .then(() => {
      res.redirect("/shop");
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.postDeleteProduct = (req, res) => {
//   const prodId = req.body.productId;
//   Product.deleteById(prodId, () => {
//     res.redirect("/shop");
//   });
// };

exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.deleteById(productId)
    .then(() => {
      res.redirect("/shop");
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getShop = (req, res) => {
//   Product.fetchAll((products) => {
//     res.render("shop", {
//       products: products,
//     });
//   });
// };

exports.getShop = (req, res) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop", {
        products: rows,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

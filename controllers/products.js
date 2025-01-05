const path = require("path");

const rootDir = require("../util/path");

const Product = require("../models/productModel");

exports.getAddProduct = (req, res) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title, req.body.price);
  product.save();
  res.redirect("/shop");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.send(products);
  });
};

exports.getProductById = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (product) {
      res.render("product-detail", { product: product });
    } else {
      res.status(404).send("Product not found");
    }
  });
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/shop");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/shop");
    }
    res.render("edit-product", {
      product: product,
      edititng: editMode,
    });
  });
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;

  const updatedProduct = new Product(updatedTitle, updatedPrice, prodId);
  updatedProduct.save();
  res.redirect("/shop");
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId, () => {
    res.redirect("/shop");
  });
};

exports.getShop = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      products: products,
    });
  });
};

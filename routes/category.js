var express = require("express");
var router = express.Router();
const Product = require("../models/Product");
const Variant = require("../models/Variant");
const Category = require("../models/Category");
const ensureAuthenticated = require("../modules/ensureAuthenticated");
const TypedError = require("../modules/ErrorHandler");
//GET /products
router.get("/products", function(req, res, next) {
  const { query, order } = categorizeQueryString(req.query);
  Product.getAllProducts(query, order, function(e, products) {
    if (e) {
      e.status = 406;
      return next(e);
    }
    if (products.length < 1) {
      return res.status(404).json({ message: "products not found" });
    }
    res.json({ products: products });
  });
});

//GET /products/:id
router.get("/products/:id", function(req, res, next) {
  let productId = req.params.id;
  Product.getProductByID(productId, function(e, item) {
    if (e) {
      e.status = 404;
      return next(e);
    } else {
      res.json({ product: item });
    }
  });
});

//GET /variants
router.get("/variants", function(req, res, next) {
  let { productId } = req.query;
  if (productId) {
    Variant.getVariantProductByID(productId, function(err, variants) {
      if (err) return next(err);
      return res.json({ variants });
    });
  } else {
    Variant.getAllVariants(function(e, variants) {
      if (e) {
        if (err) return next(err);
      } else {
        return res.json({ variants });
      }
    });
  }
});

//GET /variants/:id
router.get("/variants/:id", ensureAuthenticated, function(req, res, next) {
  let id = req.params.id;
  if (id) {
    Variant.getVariantByID(id, function(err, variants) {
      if (err) return next(err);
      res.json({ variants });
    });
  }
});

//GET /categories
router.get("/categories", function(req, res, next) {
  Category.getAllCategories(function(err, c) {
    if (err) return next(err);
    res.json({ categories: c });
  });
});

module.exports = router;

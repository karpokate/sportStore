//import models for filter
//const categoryModel = require("../models/Category");
const productModel = require("../models/Product");
//const variantModel = require("../models/Variant");

// filter for product
module.exports.filterProductByDepartment = function(department, callback) {
  let regexp = new RegExp(`${department}`, "i");
  var query = { department: { $regex: regexp } };
  productModel.find(query, callback);
};

module.exports.filterProductByCategory = function(category, callback) {
  let regexp = new RegExp(`${category}`, "i");
  var query = { category: { $regex: regexp } };
  productModel.find(query, callback);
};

module.exports.filterProductByTitle = function(title, callback) {
  let regexp = new RegExp(`${title}`, "i");
  var query = { title: { $regex: regexp } };
  productModel.find(query, callback);
};

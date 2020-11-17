const Product = require("../models/product");
module.exports = async (req, res, next) => {
  req.product = await new Product().where("id", req.params.id).fetch();
  if (req.product == null) {
    res.status(404);
    return res.send("Product not found");
  }
  next();
};

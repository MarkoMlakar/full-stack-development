var express = require("express");
var router = express.Router();
const Product = require("../models/product");
const { productValidation } = require("../validation");
const verifyToken = require("../middleware/tokenVerification");
const setProduct = require("../middleware/setProduct");
const verifyProductModification = require("../middleware/productModifyVerification");
const jwt = require("jsonwebtoken");

/* GET - Get all Products. */
router.get("/", async (req, res) => {
  try {
    const data = await new Product().fetchAll();
    res.json(data);
  } catch (err) {
    res.json({
      status: false,
      msg: "Error while fetching products",
      result: err,
    });
  }
});

// /* GET - Get Product by ID. */
router.get("/:id", async (req, res) => {
  try {
    const product = await new Product().where("id", req.params.id).fetch();
    res.json(product);
  } catch (err) {
    res.json({
      status: false,
      msg: "Error while fetching products",
      result: err,
    });
  }
});

// /* POST - Add new Product */
router.post("/add", verifyToken, async (req, res) => {
  const { error } = productValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let userId;
  try {
    const { cookies } = req;
    const accessToken = cookies.__act;
    userId = jwt.decode(accessToken).id;
  } catch (err) {
    res.json({
      status: false,
      msg: "Could not get User ID",
    });
  }

  const productObject = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    user_id: userId,
  };

  try {
    await new Product().save(productObject);
    res.json({
      status: true,
      msg: "Product successfully added",
    });
  } catch (err) {
    res.json({
      statusCode: res.status(400).statusCode,
      msg: "Error while adding new product",
      result: err,
    });
  }
});

// /* PUT - Update Product */
router.put(
  "/update/:id",
  setProduct,
  verifyToken,
  verifyProductModification,
  async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        throw new Error("Parameter is not of type number");
      }
      await new Product({
        id: req.params.id,
      }).save(req.body);
      res.json({
        status: true,
        msg: "Product successfully updated",
      });
    } catch (err) {
      res.json({
        status: false,
        msg: "Error while updating product",
        result: err,
      });
    }
  }
);

// /* DELETE - Delete Product */
router.delete(
  "/delete/:id",
  setProduct,
  verifyToken,
  verifyProductModification,
  async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        throw new Error("Parameter is not of type number");
      }
      await new Product({
        id: req.params.id,
      }).destroy();
      res.json({
        status: true,
        msg: "Product successfully deleted",
      });
    } catch (err) {
      res.json({
        status: false,
        msg: "Error while deleting product",
        result: err,
      });
    }
  }
);

module.exports = router;

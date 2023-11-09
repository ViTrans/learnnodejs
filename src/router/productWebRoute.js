const express = require("express");
const router = express.Router();
const uploadFile = require("../middleware/clouldinary");
const { addProduct } = require("../services/apis/product");

const productWebRoute = (app) => {
  router.post("/product/add", uploadFile.single("image"), addProduct);
  return app.use("/api", router);
};

module.exports = productWebRoute;

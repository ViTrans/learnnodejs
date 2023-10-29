const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homePageController");
const productController = require("../controllers/ProductController");
const uploadFile = require("../middleware/clouldinary");

const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/create-new", homeController.getCreateUser);
  router.post("/insert-user", homeController.createUser);
  router.get("/edit-user/:id", homeController.getEditUser);
  router.post("/update-user", homeController.updateUser);
  router.post("/delete", homeController.deleteUser);
  router.get("/add-product", productController.getAddProductPage);
  router.post(
    "/add-product",
    uploadFile.single("image"),
    productController.addProduct
  );
  router.get("/products", productController.getProducts);
  router.get("/product/:id", productController.getProductDetail);
  router.get("/admin/products", productController.getProductAdmin);
  router.get("/edit-product/:id", productController.getEditProduct);
  router.post(
    "/update-product",
    uploadFile.single("image"),
    productController.updateProduct
  );
  return app.use("/", router);
};

module.exports = initWebRoute;

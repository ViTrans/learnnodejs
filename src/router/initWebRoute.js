const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homePageController");
const productController = require("../controllers/ProductController");
const categoryController = require("../controllers/categoryController");
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const forgotPassword = require("../controllers/forgotPassword");
const uploadFile = require("../middleware/clouldinary");

const initWebRoute = (app) => {
  router.get("/login", loginController.getLoginPage);
  router.post("/login", loginController.login);
  router.get("/logout", loginController.logout);
  router.get("/register", registerController.showRegisterPage);
  router.post("/register", registerController.register);
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
  router.get("/category/add", categoryController.getAddCategoryPage);
  router.post("/category/add", categoryController.addCategory);
  router.get("/category/:id", productController.getProductByCategory);

  router.get("/forgot-password", forgotPassword.showForgotPasswordPage);
  router.post("/forgot-password", forgotPassword.forgotPassword);
  return app.use("/", router);
};

module.exports = initWebRoute;

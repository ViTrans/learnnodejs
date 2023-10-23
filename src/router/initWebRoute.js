const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homePageController");

const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/create-new", homeController.getCreateUser);
  router.post("/insert-user", homeController.createUser);
  router.get("/edit-user/:id", homeController.getEditUser);
  router.post("/update-user", homeController.updateUser);
  router.get("/delete/:id");
  return app.use("/", router);
};

module.exports = initWebRoute;

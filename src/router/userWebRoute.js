const express = require("express");
const router = express.Router();
const { register, login } = require("../services/apis/user");

const userWebRoute = (app) => {
  router.post("/register", register);
  router.post("/login", login);
  return app.use("/api", router);
};

module.exports = userWebRoute;

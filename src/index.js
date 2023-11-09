const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();
const port = process.env.PORT || 3001;
const configViewEngine = require("./configs/viewEngine");
const initWebRoute = require("./router/initWebRoute");
const userWebRoute = require("./router/userWebRoute");
const productWebRoute = require("./router/productWebRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "learnnodejs",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
connectDB();
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
const getUser = async (req, res, next) => {
  res.locals.user = req.session.user;
  console.log(res.locals);
  next();
};
app.use(getUser);

const Category = require("./models/category");
const getCategory = async (req, res, next) => {
  const category = await Category.find();

  res.locals.category = category;
  console.log(res.locals);
  next();
};
app.use(getCategory);

configViewEngine(app);
initWebRoute(app);
userWebRoute(app);
productWebRoute(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3001;
const configViewEngine = require("./configs/viewEngine");
const initWebRoute = require("./router/initWebRoute");

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

configViewEngine(app);
initWebRoute(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

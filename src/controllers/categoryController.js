const Category = require("../models/category");

const getAddCategoryPage = (req, res) => {
  return res.render("home.ejs", {
    data: { page: "addCategory", title: "Trang them danh muc" },
  });
};

const addCategory = async (req, res) => {
  const { name, slug } = req.body;
  try {
    const category = new Category({ name, slug });
    await category.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async (req, res) => {};

module.exports = {
  addCategory,
  getCategory,
  getAddCategoryPage,
};

const Products = require("../../models/product");
const Category = require("../../models/category");

const addProduct = async (req, res) => {
  const { title, description, price, feature, category } = req.body;
  const image = req.file.path;
  try {
    const products = await Products.create({
      title,
      description,
      image,
      price,
      feature,
      category,
    });
    res.status(200).json({ products, message: "Add product success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
};

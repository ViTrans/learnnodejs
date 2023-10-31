const Products = require("../models/product");
const Category = require("../models/category");

const getAddProductPage = async (req, res) => {
  const categories = await Category.find({});
  return res.render("home.ejs", {
    data: { page: "addProduct", title: "Trang them san pham", categories },
  });
};

const getProducts = async (req, res) => {
  const products = await Products.find({});
  return res.render("home.ejs", {
    data: { page: "product", title: "Trang danh sach san pham", products },
  });
};
const getProductByCategory = async (req, res) => {
  const { id } = req.params;
  const products = await Products.find({ category: id });
  res.render("home.ejs", {
    data: {
      page: "productCategory",
      title: "Trang danh sach san pham theo danh muc",
      products,
    },
  });
};

const getProductAdmin = async (req, res) => {
  const products = await Products.find({});
  return res.render("home.ejs", {
    data: {
      page: "manangerProduct",
      title: "Trang danh sach san pham",
      products,
    },
  });
};

const getProductDetail = async (req, res) => {
  const { id } = req.params;

  const product = await Products.findById(id);
  return res.render("home.ejs", {
    data: { page: "productDetail", title: "Trang chi tiet san pham", product },
  });
};

const addProduct = async (req, res) => {
  const { title, description, price, feature, category } = req.body;
  const image = req.file.path;
  try {
    await Products.create({
      title,
      description,
      image,
      price,
      feature,
      category,
    });
    return res.redirect("/products");
  } catch (error) {
    console.log(error);
  }
};

const getEditProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  return res.render("home.ejs", {
    data: { page: "editProduct", title: "Trang sua san pham", product },
  });
};

const updateProduct = async (req, res) => {
  const { title, description, price, feature, id } = req.body;
  const product = await Products.findById(id);
  const image = req.file?.path || product.image;
  try {
    await Products.findByIdAndUpdate(id, {
      title,
      description,
      image,
      price,
      feature,
    });
    return res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAddProductPage,
  addProduct,
  getProducts,
  getProductDetail,
  getProductAdmin,
  getEditProduct,
  updateProduct,
  getProductByCategory,
};

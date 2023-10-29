const Users = require("../models/user");

const getHomePage = async (req, res) => {
  const users = await Users.find({});
  return res.render("home.ejs", {
    data: { page: "main", title: "trang chu", users },
  });
};

const getCreateUser = (req, res) => {
  return res.render("home.ejs", {
    data: { page: "createNewUser", title: "Trang tao nguoi dung" },
  });
};

const createUser = async (req, res) => {
  console.log(req.body);
  const { firstName, userName, email, password, role, address } = req.body;
  try {
    const user = new Users({
      firstName,
      userName,
      email,
      password,
      role,
      address,
    });
    await user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const getEditUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);
  console.log(user);
  return res.render("home.ejs", {
    data: { page: "editUser", title: "Trang sua nguoi dung", user },
  });
};

const updateUser = async (req, res) => {
  const { id, firstName, userName, email, password, role, address } = req.body;
  try {
    await Users.findByIdAndUpdate(id, {
      firstName,
      userName,
      email,
      password,
      role,
      address,
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    await Users.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHomePage,
  getCreateUser,
  createUser,
  getEditUser,
  updateUser,
  deleteUser,
};

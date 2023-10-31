const Users = require("../models/user");

const showRegisterPage = (req, res) => {
  return res.render("home.ejs", {
    data: { page: "register", title: "Trang dang ky" },
  });
};

const register = async (req, res) => {
  const { firstName, userName, email, password, address } = req.body;
  try {
    const user = new Users({ firstName, userName, email, password, address });
    await user.save();
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  showRegisterPage,
  register,
};

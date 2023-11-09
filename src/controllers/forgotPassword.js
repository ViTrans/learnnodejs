const Users = require("../models/user");
const sendMail = require("../helpers/sendMail");

const showForgotPasswordPage = (req, res) => {
  return res.render("home.ejs", {
    data: { page: "forgotPassword", title: "Trang quên mật khẩu" },
  });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });
    const { passwordReset } = user.createChangePasswordToken();
    await user.save();
    const mailOptions = {
      from: {
        name: "Todo App",
        address: "Todoapp@gmail.com",
      }, // sender address
      to: user.email, // list of receivers
      subject: "Khôi phục mật khẩu", // Subject line
      html: `Bạn có thể đặt lại mật khẩu bằng liên kết sau:
             a href="http://localhost:5000/reset-password?token=${passwordReset}"`, // html body
    };
    sendMail(mailOptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  showForgotPasswordPage,
  forgotPassword,
};

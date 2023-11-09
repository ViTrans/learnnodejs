const { signAccessToken } = require("./auth");
const User = require("../../models/user");

const register = async (req, res) => {
  try {
    const { email, password, firstName, userName, address } = req.body;
    const user = new User({ email, password, firstName, userName, address });
    await user.save();
    res.status(200).json({ user, message: "User created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    const isValid = await user.isValidPasword(password);
    if (isValid) {
      const tokenUser = await signAccessToken({
        userName: user.userName,
        role: user.role,
      });
      const { password, ...other } = user._doc;
      res.status(200).json({ ...other, tokenUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};

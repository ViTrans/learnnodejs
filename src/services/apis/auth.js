const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signAccessToken = async (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1h",
      },
      function (err, token) {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });
};

const verifyAccessToken = async (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
};

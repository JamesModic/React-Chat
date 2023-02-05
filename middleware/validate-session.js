const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const validateSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = await jwt.verify(token, process.env.JWT);
    console.log(decodedToken);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw Error("User Not Found");
    }

    req.user = user;

    req.test = "THIS IS A TEST";
    return next();
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = validateSession;

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.authUserMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.rizzCabsToken || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodedId._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

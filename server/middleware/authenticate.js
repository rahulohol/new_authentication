const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../models/User.model");
const jwt_secret_key = process.env.jwt_secret_key;

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verifytoken = jwt.verify(token, jwt_secret_key);

    const rootUser = await UserModel.findOne({ _id: verifytoken._id });
    // console.log(rootUser);
    if (!rootUser) {
      throw new Error("user not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Unauthrized no token provided",
    });
    console.log("authenticate err ->", error);
  }
};

module.exports = {
  authenticate,
};

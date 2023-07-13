const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret_key = process.env.jwt_secret_key;

// console.log("jwt_key", jwt_secret_key.length);
// schema validation
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("Email is not a valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// hash password;

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//Token Generate

userSchema.methods.generateAuthtoken = async function () {
  try {
    let token_jwt = jwt.sign({ _id: this._id }, process.env.jwt_secret_key, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: token_jwt });
    await this.save();
    return token_jwt;
  } catch (err) {
    res.status(422).json(err);
    console.log("error while creating token");
    console.log("tokenerr ->", err);
  }
};

//model

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };

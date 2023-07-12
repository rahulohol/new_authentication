const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");

//register

userRouter.post("/register", async (req, res) => {
  const payload = req.body;
  const { name, email, password, cpassword } = payload;

  if (!name || !email || !password || !cpassword) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const preuser = await UserModel.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "This email is already exist" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "Password and confirm password not matched" });
    } else {
      const user = new UserModel(payload);

      //password has been hashed in user model file before it saved.
      const storedData = await user.save();

      // console.log(storedData);
      res.status(201).json({ status: 201, storedData });
    }
  } catch (err) {
    res.status(422).json(err);
    console.log("error while registering user");
  }
});

// Login

userRouter.post("/login", async (req, res) => {
  const payload = req.body;
  const { email, password } = payload;
  // console.log(payload);
  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const validUser = await UserModel.findOne({ email: email });
    if (validUser) {
      const passwordMatch = await bcrypt.compare(password, validUser.password);
      if (!passwordMatch) {
        res.status(422).json({ error: "Invalid details" });
      } else {
        //token generation
        const token = await validUser.generateAuthtoken();

        console.log(token);
      }
    }
  } catch (err) {
    res.status(422).status(err);
    console.log("error while login user");
    console.log("route login ->", err);
  }
});

module.exports = {
  userRouter,
};

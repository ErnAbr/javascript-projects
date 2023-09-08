const express = require("express");
const User = require("../models/userModel.js");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Email or password did not match. " });
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    req.status(500).send(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).send({ message: "User Already Exists" });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.send({ message: "User was created" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;

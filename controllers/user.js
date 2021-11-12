const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// sign up
const signup = async (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    // check registered?
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    const newUser = User({
      firstName,
      lastName,
      email,
      password,
      survey: [],
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    res.status(201).json({ message: "User created!" });
  } catch {}
};

// log in
const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // validate user
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Either email or password is incorrect" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res
        .status(400)
        .json({ error: "Either email or password is incorrect" });
    }

    // generate access token
    const accessToken = user.generateAccessToken(user._id);

    res.json({
      accessToken: accessToken,
      email: user.email,
      id: user._id,
    });
  } catch {}
};

const isValid = (req, res, next) => {
  try {
    res.json({ status: "success", message: "verified token" });
  } catch {}
};

module.exports = {
  login,
  signup,
  isValid,
};

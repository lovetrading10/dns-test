const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../util/base");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = (userId) => {
  const payload = { userId: userId };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

module.exports = mongoose.model("User", userSchema);

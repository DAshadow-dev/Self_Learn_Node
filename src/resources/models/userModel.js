const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "This email has already been taken"],
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc Register the user
// @route POST /users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fiels are mandatory");
  }

  // Check if the username already exists
  const availableUser = await User.findOne({ email });
  if (availableUser) {
    res.status(400);
    throw new Error("This user already registered");
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  //Create new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  // Check user data
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("Failed to register user");
  }

  res.json({ message: "Register the user" });
});

// @desc Login the user
// @route POST /users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });
  //Compare password with hashpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    //Generate access token
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          id: user._id,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken });
  }
  else {
    res.status(401);
    throw new Error("Email or password is incorrect");
  }
  res.json({ message: "Login the user" });
});

// @desc Get current user information
// @route GET /users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };

const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { genToken } = require("../config/genToken");

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, pic } = req.body;
  if (!userName || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new Error("User already exists");
  }
  const user = await User.create({
    userName,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      message: "User created successfully",
      user,
      token: genToken(user._id),
    });
  } else {
    throw new Error("Error creating user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please fill all the fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      message: "User logged in successfully",
      user,
      token: genToken(user._id),
    });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { userName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
  res.status(200).json({
    message: "Users fetched successfully",
    users,
  });
});

module.exports = { registerUser, loginUser, getAllUsers };

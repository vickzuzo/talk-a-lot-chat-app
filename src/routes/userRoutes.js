const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userControllers");
const protect = require("../Middlewares/AuthMiddleware");

const userRouter = express.Router();

userRouter.route("/").get(protect, getAllUsers);
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

module.exports = userRouter;

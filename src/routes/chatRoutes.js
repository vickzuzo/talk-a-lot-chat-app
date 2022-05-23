const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
} = require("../controllers/chatController");
const protect = require("../Middlewares/AuthMiddleware");

const chatRouter = express.Router();

chatRouter.route("/").post(protect, accessChat);
chatRouter.route("/").get(protect, fetchChats);
chatRouter.route("/group/create").post(protect, createGroupChat);
chatRouter.route('/group/rename').put(protect, renameGroupChat)
// chatRouter.route('/group/remove').put(protect, removeFromGroupChat)
// chatRouter.route('/group/add').put(protect, addToGroupChat)

module.exports = chatRouter;

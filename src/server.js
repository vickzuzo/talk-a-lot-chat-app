const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const colors = require("colors");
const userRouter = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./Middlewares/ErrorMiddleWare");
const chatRouter = require("./routes/chatRoutes");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("HI, it works!");
});

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));

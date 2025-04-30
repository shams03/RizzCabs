const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { connectDB } = require("./db/db");
const userRouter = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const captainRouter = require("./routes/captain.routes");

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/captains", captainRouter);

module.exports = app;

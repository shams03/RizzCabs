const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const {authUserMiddleware} = require("../middlewares/auth.middleware")

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage(
        "First name should be atleast 3 chars long and max 50 chars"
      ),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be atleast 8 chars or more"),
  ],
  userController.registerUser
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password should atleast be of length 8"),
  ],
  userController.loginUser
);

userRouter.get('/profile',authUserMiddleware,userController.getUserProfile)
userRouter.get('/logout',authUserMiddleware , userController.logoutUser)

module.exports = userRouter;

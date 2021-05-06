const userRouter = require("express").Router();
const { validate, authenticate } = require("../../middlewares");
const {
  login,
  signup,
  getProfile,
  updateProfile,
} = require("./auth.controller");
const { loginValidation, signupValidation } = require("./auth.validations");

/* Login Route, Path - /api/auth/login */
userRouter.post("/login", validate(loginValidation), login);

/* Signup Route, Path - /api/auth/signup */
userRouter.post("/signup", validate(signupValidation), signup);

/* Update Profile Route, Path - /api/auth/updateProfile */
userRouter.put("/profile", authenticate, updateProfile);

module.exports = userRouter;

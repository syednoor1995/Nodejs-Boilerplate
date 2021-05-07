const userRouter = require("express").Router();
const { validate, authenticate } = require("../../middlewares");
const { login, signup, updateProfile } = require("./user.controller");
const { loginValidation, signupValidation } = require("./user.validations");

/* Login Route, Path - /api/user/login */
userRouter.post("/login", validate(loginValidation), login);

/* Signup Route, Path - /api/user/signup */
userRouter.post("/signup", validate(signupValidation), signup);

/* Update Profile Route, Path - /api/user/updateProfile */
userRouter.put("/profile", authenticate, updateProfile);

module.exports = userRouter;

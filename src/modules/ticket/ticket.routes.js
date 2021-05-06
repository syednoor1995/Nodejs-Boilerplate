const ticketRouter = require("express").Router();
const { validate, authenticate, roleAccess } = require("../../middlewares");
const { save, get } = require("./ticket.controller");
const { saveValidation } = require("./ticket.validations");

/* Login Route, Path - /api/auth/login */
ticketRouter.post(
  "/",
  validate(saveValidation),
  roleAccess(["admin"]),
  authenticate,
  save
);

/*  */
ticketRouter.get("/", authenticate, get);

module.exports = ticketRouter;

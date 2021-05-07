const ticketRouter = require("express").Router();
const { validate, authenticate, roleAccess } = require("../../middlewares");
const { save, get } = require("./ticket.controller");
const { saveValidation } = require("./ticket.validations");
const {
  Constants: { UserRoles },
} = require("../../libraries");
/* Login Route, Path - /api/auth/login */
ticketRouter.post(
  "/",
  validate(saveValidation),
  authenticate,
  roleAccess([UserRoles.ADMIN, UserRoles.USER]),

  save
);

/*  */
ticketRouter.get(
  "/",
  authenticate,
  roleAccess([UserRoles.ADMIN]),
  authenticate,
  get
);

module.exports = ticketRouter;

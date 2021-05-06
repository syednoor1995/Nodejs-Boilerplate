const authenticate = require("./user.middleware");
const validate = require("./validate.middleware");
const roleAccess = require("./roleAccess.middleware");

module.exports = {
  authenticate,
  validate,
  roleAccess,
};

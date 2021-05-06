const httpStatus = require("http-status");

module.exports = {
  ACCOUNT_NOT_FOUND: {
    key: "ACCOUNT_NOT_FOUND",
    statusCode: httpStatus.NOT_FOUND,
    message: "No such account exist",
  },
  INVALID_LOGIN_CREDENTIALS: {
    key: "INVALID_LOGIN_CREDENTIALS",
    statusCode: httpStatus.UNAUTHORIZED,
    message: "Invalid login credentials",
  },
};

const httpStatus = require("http-status");

module.exports = {
  TICKET_NOT_FOUND: {
    key: "TICKET_NOT_FOUND",
    statusCode: httpStatus.NOT_FOUND,
    message: "No such ticket exist",
  },
};

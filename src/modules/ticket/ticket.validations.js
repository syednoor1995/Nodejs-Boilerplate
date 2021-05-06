const { Joi } = require("express-validation");

/**
 * save ticket route validation
 */
const saveValidation = {
  body: Joi.object({
    message: Joi.string().required(),
  }),
};

/**
 * Export all
 */
module.exports = {
  saveValidation,
};

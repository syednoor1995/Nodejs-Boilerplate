const { Joi } = require("express-validation");
const {
  Constants: { UserRoles },
} = require("../../libraries");
/**
 * Login route validation
 */
const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

/**
 * Signup route validation
 * Change Input Validations according to role
 * See Joi.when
 */
const signupValidation = {
  body: Joi.object({
    name: Joi.object({
      firstName: Joi.string().required(),

      lastName: Joi.string().required(),
    }).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required().allow(UserRoles.ADMIN, UserRoles.USER),
  }),
};

/**
 * Export all
 */
module.exports = {
  loginValidation,
  signupValidation,
};

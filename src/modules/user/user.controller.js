const { User } = require("../../models");
const { JWT } = require("../../config");
const {
  sendResponse,
  Factory: { ErrorFactory },
  JwtManager,
  Mappings: {
    Errors: { AccountErrors },
  },
  Constants: { UserRoles },
} = require("../../libraries");

/**
 * User login controller
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if this user exist
    const data = await User.findOne({ email });
    if (!data) {
      const error = ErrorFactory.getError(AccountErrors.ACCOUNT_NOT_FOUND);
      throw error;
    }

    // check accounts password
    if (!data.validPassword(password)) {
      const error = ErrorFactory.getError(
        AccountErrors.INVALID_LOGIN_CREDENTIALS
      );
      throw error;
    }

    // generate jwt
    const token = JwtManager.generateToken(
      {
        profile: data.safeModel(),
        role: data.safeModel().role,
      },
      JWT.SECRET,
      { expiresIn: JWT.EXPIRES_IN }
    );

    //send response back to user
    sendResponse(res, { token, profile: data.safeModel() });
  } catch (error) {
    next(error);
  }
};

/**
 * User signup controller (only signup users with role users)
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const signup = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      role: UserRoles.USER,
    };
    const data = (await User.create(payload)).safeModel();

    // generate jwt
    const token = JwtManager.generateToken(
      {
        profile: data,
        role: UserRoles.USER,
      },
      JWT.SECRET,
      { expiresIn: JWT.EXPIRES_IN }
    );

    //send response back to user
    sendResponse(res, { token, profile: data });
  } catch (error) {
    next(error);
  }
};

/**
 * Update User Profile controller
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const updateProfile = async (req, res, next) => {
  try {
    const { _id } = req.profile;
    const {
      name: { firstName, lastName },
    } = req.body;

    const data = await User.findOneAndUpdate(
      { _id },
      {
        $set: {
          "name.firstName": firstName,
          "name.lastName": lastName,
        },
      },
      { new: true }
    );
    if (!data) {
      const error = ErrorFactory.getError(AccountErrors.ACCOUNT_NOT_FOUND);
      throw error;
    }

    const safeModel = data.safeModel();

    sendResponse(res, safeModel);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  signup,
  updateProfile,
};

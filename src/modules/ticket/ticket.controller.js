const { Ticket } = require("../../models");
const {
  sendResponse,
  Factory: { ErrorFactory },

  Mappings: {
    Errors: { TicketErrors },
  },
} = require("../../libraries");

/**
 * Store authenticated user customer ticket
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const save = async (req, res, next) => {
  try {
    const { _id } = req.profile;
    const payload = {
      ...req.body,
      userId: _id,
    };
    const data = (await Ticket.create(payload)).safeModel();

    //send response back to user
    sendResponse(res, { ticket: data });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Ticket controller
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const get = async (req, res, next) => {
  try {
    const { _id: userId } = req.profile;

    const data = await Ticket.find({ userId });
    if (!data) {
      const error = ErrorFactory.getError(TicketErrors.TICKET_NOT_FOUND);
      throw error;
    }

    const safeModel = data.safeModel();

    sendResponse(res, safeModel);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  save,
  get,
};

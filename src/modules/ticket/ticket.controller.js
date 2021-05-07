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
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;

    const data = await Ticket.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit);

    if (!data) {
      const error = ErrorFactory.getError(TicketErrors.TICKET_NOT_FOUND);
      throw error;
    }
    // get total documents in the Posts collection
    const count = await Ticket.countDocuments();

    sendResponse(res, {
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      ticket: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  save,
  get,
};

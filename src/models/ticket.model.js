const mongoose = require("mongoose");

const _ = require("lodash");
const {
  Constants: { CollectionNames, ModelNames },
} = require("../libraries");

/**
 * Schema
 */
const TicketSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: ModelNames.USER },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

/**
 * Hooks/Triggers
 */

/**
 * Methods
 */
TicketSchema.method({
  /**
   * Returns a safe model for user
   */
  safeModel() {
    const data = _.omit(this.toObject(), ["__v"]);
    return data;
  },
});

/**
 * create and export mongoose model
 * @typedef User
 */
module.exports = mongoose.model(
  ModelNames.TICKET,
  TicketSchema,
  CollectionNames.TICKET
);

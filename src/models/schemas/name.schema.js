const mongoose = require('mongoose');

/**
 * Schema
 */
const NameSchema = mongoose.Schema({
  // turn off _id for this sub-doc
  _id: false,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

/**
 * Export Schema
 */
module.exports = NameSchema;
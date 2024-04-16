const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  query: { type: String, required: true },
  user: { type: String, required: true },
  userType:  { type: String, required: true }
});

const QueryModel = mongoose.model('Query', querySchema);

module.exports = QueryModel;
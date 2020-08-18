const mongoose = require('mongoose');

const DataShema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  sum: {
    type: Number,
    required: true,
  },
  balans: {
    type: Number,
    required: true,
  },
  owner: {
    type: { type: Schema.Types.ObjectId, ref: 'data' },
    required: true,
  },
});

module.exports = mongoose.model('data', DataShema);

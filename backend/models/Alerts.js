const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['crowd', 'delay', 'breakdown', 'construction'],
    required: true,
  },
  message: { type: String, required: true },
  location: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);
const mongoose = require('mongoose');

const crowdReportSchema = new mongoose.Schema({
  stopName: {
    type: String,
    required: true,
    trim: true,
  },
  crowdLevel: {
    type: String,
    enum: ['EMPTY', 'OKAY', 'CROWDED'],
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CrowdReport', crowdReportSchema);
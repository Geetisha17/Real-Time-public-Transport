const mongoose = require('mongoose');

const crowdReportSchema = new mongoose.Schema({
  vehicleId: String,
  routeId: String,
  crowdLevel: {
    type: String,
    enum: ['EMPTY', 'OKAY', 'CROWDED'],
    required: true,
  },
  area: String,
  stopName: String,
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('CrowdReport', crowdReportSchema);

const mongoose = require('mongoose');
const VisitSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    required: true
  },
  restaurantId: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});

module.exports = {
  Visit: mongoose.model('Visit', VisitSchema),
  VisitSchema
};

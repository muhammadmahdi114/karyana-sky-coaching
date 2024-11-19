const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "/default-service-image.png",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  provider: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discPrice: {
    type: Number,
    required: false,
  },
  categories: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);

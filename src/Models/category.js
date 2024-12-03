const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  image: {
    type: String,
    default: "/default-category-image.png",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Category', categorySchema);

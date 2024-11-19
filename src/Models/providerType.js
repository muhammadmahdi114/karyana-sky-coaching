const mongoose = require('mongoose');

const providerTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  commission: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('ProviderType', providerTypeSchema);

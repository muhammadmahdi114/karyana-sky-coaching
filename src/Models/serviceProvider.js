const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  providerType: {
    type: String,
    required: true,
  },
  phNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10,15}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10,15}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
  },
  addresses: {
    type: [String],
    required: true,
  },
  availableRange: {
    type: String,
    required: true,
  },
  taxes: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String, 
    default: "/dp-user.png",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ServiceProvider', providerSchema);

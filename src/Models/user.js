const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, 
    default: "/dp-user.png",
  },
  email: {
    type: String,
    required: true,
  },
  type: {
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
  availableRange: {
    type: String, 
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
    required: false, 
  },
  accept: {
    type: Boolean,
    default: false,
  },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

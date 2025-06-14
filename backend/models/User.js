
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, match: /^\d{10,15}$/ },
  password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

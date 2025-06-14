
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  price: Number
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

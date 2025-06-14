
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product ? res.status(200).json(product) : res.status(404).json({ message: 'Product not found' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

router.post('/', async (req, res) => {
  const { title, image, description, price } = req.body;
  const product = new Product({ title, image, description, price });
  await product.save();
  res.status(201).json(product);
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updated ? res.status(200).json(updated) : res.status(404).json({ message: 'Not found' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    deleted ? res.status(200).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const sort = req.query.sort || 'createdAt';
  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { description: { $regex: req.query.keyword, $options: 'i' } }
        ]
      }
    : {};

  try {
    const products = await Product.find(keyword)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product ? res.status(200).json(product) : res.status(404).json({ message: 'Product not found' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, image, description, price } = req.body;
  const product = new Product({ title, image, description, price });
  await product.save();
  res.status(201).json(product);
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updated ? res.status(200).json(updated) : res.status(404).json({ message: 'Not found' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    deleted ? res.status(200).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

module.exports = router;

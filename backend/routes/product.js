/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product list
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Single product
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Product created
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product updated
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product deleted
 */

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

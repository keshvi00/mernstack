const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { swaggerUi, swaggerSpec } = require('./swagger'); // 👈 ADD THIS

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://prodsmanagement.netlify.app'],
  credentials: true
}));

app.use(express.json());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // 👈 ADD THIS

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection failed:', err));

const authRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

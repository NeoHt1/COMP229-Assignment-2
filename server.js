// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI } = require('./config'); // Import the configuration

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/product', productRoutes);

// Simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Marketplace Application');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

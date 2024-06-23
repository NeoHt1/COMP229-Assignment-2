// controllers/productController.js
const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductsByName = async (req, res) => {
    const { name } = req.query; // Extracting the 'name' query parameter

    try {
        const products = await Product.find({ name: { $regex: name, $options: 'i' } }); // Using regex for case-insensitive search
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, price, description , quantity, category } = req.body;
    if (!name || !price || !description || !quantity || !category) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const newProduct = new Product({
        name,
        price,
        description,
        quantity,
        category
    });

    try {
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { name, price, description, quantity, category } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (name) product.name = name;
        if (price) product.price = price;
        if (description) product.description = description;
        if (quantity) product.quantity = quantity;
        if (category) product.category = category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deleteResult = await Product.deleteMany({});
        res.json({ message: `${deleteResult.deletedCount} products deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a product
exports.deleteProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: productId });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

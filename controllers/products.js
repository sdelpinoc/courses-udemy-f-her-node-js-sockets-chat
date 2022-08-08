import { request, response } from 'express';

import { Product } from '../models/index.js';

// getProducts - paginate - total - populate
const getProducts = async (req = request, res = response) => {

    const { from = 0, limit = 5 } = req.query;
    const where = { status: true };

    // console.log(from);
    // console.log(limit);

    const [total, products] = await Promise.all([
        Product.countDocuments(where),
        Product.find(where)
            .populate('user', 'name email')
            .populate('category', 'name')
            .skip(from)
            .limit(limit)
    ]);

    res.json({
        total,
        products
    });
};

// getProduct - populate
const getProduct = async (req = request, res = response) => {
    const { id } = req.params;

    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

    res.status(200).json(product);
};

const createProduct = async (req = request, res = response) => {
    const { name, description, price, available, category } = req.body;

    // Generate the data to save in mongodb
    const data = {
        name: name.toUpperCase(),
        description,
        price,
        available,
        category,
        user: req.authenticatedUser._id // Is set in the validateJwt function(middleware) in the validate-jwt.js
    };

    console.log(data);

    const product = new Product(data);

    // Save in mongodb
    await product.save();

    res.status(201).json(product);
};

/**
 * Update the name of the product and the user 
 */
const updateProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, description, price, available } = req.body;

    // console.log(req.authenticatedUser);

    const data = {
        name: name.toUpperCase(),
        description,
        price,
        available,
        user: req.authenticatedUser._id
    };

    // console.log(data);

    const product = await Product.findByIdAndUpdate(id, data, { new: true })
        .populate('category', 'name')
        .populate('user', 'name');

    res.status(200).json(product);
};

const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

    res.status(200).json(product);
};

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
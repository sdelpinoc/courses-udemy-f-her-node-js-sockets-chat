import mongoose from 'mongoose';
import { request, response } from 'express';

import { Category, Product, User } from '../models/index.js';

const allowCollections = [
    'users',
    'categories',
    'products',
    'roles',
    'productsByCategory'
];

const searchUsers = async (term = '', res = response) => {

    const isMongoId = mongoose.isValidObjectId(term);

    if (isMongoId) {
        const user = await User.findById(term);

        return res.json({
            total: (user) ? 1 : 0,
            results: (user) ? [user] : []
        });
    }

    const regexp = new RegExp(term, 'i'); // Case insensitive

    // $or, logical or, $and logical and
    const users = await User.find({
        $or: [{ name: regexp }, { email: regexp }],
        $and: [{ status: true }]
    });

    // console.log(users);

    res.json({
        total: users.length,
        results: users
    });
};

const searchCategories = async (term = '', res = response) => {

    const isMongoId = mongoose.isValidObjectId(term);

    if (isMongoId) {
        const category = await Category.findById(term);

        return res.json({
            total: (category) ? 1 : 0,
            results: (category) ? [category] : []
        });
    }

    const regexp = new RegExp(term, 'i'); // Case insensitive

    const categories = await Category.find({ name: regexp, status: true });

    res.json({
        total: categories.length,
        results: categories
    });
};

const searchProducts = async (term = '', res = response) => {

    const isMongoId = mongoose.isValidObjectId(term);

    if (isMongoId) {
        const product = await Product.findById(term)
            .populate('category', 'name')
            .populate('user', 'name');

        return res.json({
            total: (product) ? 1 : 0,
            results: (product) ? [product] : []
        });
    }

    const regexp = new RegExp(term, 'i'); // Case insensitive

    const products = await Product.find({ name: regexp, status: true })
        .populate('category', 'name')
        .populate('user', 'name');
    // console.log(products);

    res.json({
        total: products.length,
        results: products
    });
};

const searchProductsByCategory = async (term = '', res = response) => {

    const isMongoId = mongoose.isValidObjectId(term);

    let categoryId = null; 

    if (isMongoId) {
        const category = await Category.findById(term);
        categoryId = category._id;
    } else {
        const regexp = new RegExp(term, 'i'); // Case insensitive
    
        const categories = await Category.find({ name: regexp, status: true });
    
        // console.log(categories);
    
        if (categories[0]) {
            categoryId = categories[0]._id;
        }
    }

    const products = await Product.find({ category: categoryId, status: true })
        .populate('category', 'name')
        .populate('user', 'name');

    // console.log(products);

    res.json({
        total: products.length,
        results: products
    });
};

const search = (req = request, res = response) => {

    const { collection, term } = req.params;

    if (!allowCollections.includes(collection)) {
        return res.status(400).json({
            msg: `The allow collections are: ${allowCollections}`
        });
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;

        case 'categories':
            searchCategories(term, res);
            break;

        case 'products':
            searchProducts(term, res);
            break;
        
        case 'productsByCategory':
            searchProductsByCategory(term, res);
            break;

        default:
            res.status(500).json({
                msg: `Search not allowed`
            });
            break;
    }
};

export {
    search
};
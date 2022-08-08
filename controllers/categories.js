import { request, response } from 'express';

import { Category } from '../models/index.js';

// getCategories - paginate - total - populate
const getCategories = async (req = request, res = response) => {

    const { from = 0, limit = 5 } = req.query;
    const where = { status: true };

    // console.log(from);
    // console.log(limit);

    const [total, categories] = await Promise.all([
        Category.countDocuments(where),
        Category.find(where)
            .populate('user', 'name email')
            .skip(from)
            .limit(limit)
    ]);

    res.json({
        total,
        categories
    });
};

// getCategory - populate
const getCategory = async (req = request, res = response) => {
    const { id } = req.params;
    
    const category = await Category.findById(id).populate('user', 'name email');
    
    res.status(200).json(category);
};

const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    
    // Generate the data to save in mongodb
    const data = {
        name,
        user: req.authenticatedUser._id // Is set in the validateJwt function(middleware) in the validate-jwt.js
    };
    
    const category = new Category(data);
    
    // Save in mongodb
    await category.save();
    
    res.status(201).json(category);
};

// updateCategory(name) - check name
/**
 * Update the name of the category and the user 
 */
const updateCategory = async (req = request, res = response) => {
    const { id } = req.params;
    // const { status, authenticatedUser, ...data} = req.body;

    // console.log(req.authenticatedUser);
    const data = {
        name: req.body.name.toUpperCase(),
        user: req.authenticatedUser._id
    };

    // console.log(data);

    const category = await Category.findByIdAndUpdate(id, data, { new: true }).populate('user', 'name');

    res.status(200).json(category);
};

// deleteCategory - change status to false
const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

    res.status(200).json(category);
};

export {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};
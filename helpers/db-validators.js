import mongoose from 'mongoose';

import { Role, User, Category, Product } from '../models/index.js';

const isValidMongoId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error(`Is not a valid id: ${id}`)
    }

    return true;
};

const isValidRole = async (role = '') => {
    const exitsRole = await Role.findOne({ role });
    if (!exitsRole) {
        throw new Error(`The role: ${role} is not registred in database`);
    }
};

const emailExists = async (email = '') => {
    const emailExistsDB = await User.findOne({ email: email });

    if (emailExistsDB) {
        // return res.status(400).json({
        //     msg: 'Email is already in use'
        // });
        throw new Error(`The email ${email} is already in use`);
    }
}

const existsUserById = async (id = '') => {

    if (!mongoose.isValidObjectId(id)) {
        throw new Error(`Is not a valid id: ${id}`)
    }

    const userExistsDB = await User.findById(id);

    if (!userExistsDB) {
        throw new Error(`The user does not exits, id: ${id}`);
    }
};

const existsCategoryById = async (id = '') => {

    if (!mongoose.isValidObjectId(id)) {
        throw new Error(`Is not a valid id: ${id}`)
    }

    const existInDB = await Category.findById(id);

    if (!existInDB) {
        throw new Error(`Record does not exist in database, id: ${id}`);
    }
};

const existsCategoryByName = async (name = '') => {

    const existInDB = await Category.findOne({ 'name' : name.toUpperCase() });

    if (existInDB) {
        throw new Error(`A record with that name already exists, name: ${name}`);
    }
};

const existsProductById = async (id = '') => {

    if (!mongoose.isValidObjectId(id)) {
        throw new Error(`Is not a valid id: ${id}`)
    }

    const existInDB = await Product.findById(id);

    if (!existInDB) {
        throw new Error(`Record does not exist in database, id: ${id}`);
    }
};

const existsProductByName = async (name = '') => {

    const existInDB = await Product.findOne({ 'name' : name.toUpperCase() });

    if (existInDB) {
        throw new Error(`A record with that name already exists, name: ${name}`);
    }
};

const validCollections = (collection = '', collections = []) => {
    if (!collections.includes(collection)) {
        throw new Error(`${collection} is not a valid collection, ${collections}`);
    }

    return true;
};

export {
    isValidMongoId,
    isValidRole,
    emailExists,
    existsUserById,
    existsCategoryById,
    existsCategoryByName,
    existsProductById,
    existsProductByName,
    validCollections
};
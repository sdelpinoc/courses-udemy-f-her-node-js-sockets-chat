import { request, response } from 'express';
import fs from 'fs';
import cloudinary from 'cloudinary';

import { uploadFile, path, __dirname } from '../helpers/index.js';

import { Product, User } from '../models/index.js';

cloudinary.v2.config(process.env.CLOUDINARY_URL);

const loadFile = async (req = request, res = response) => {
    // console.log(req.files);

    try {
        // Images
        const fileName = await uploadFile(req.files, { directory: 'images' });

        res.json(fileName);
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateImage = async (req = request, res = response) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No exist a user with the id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No exist a product with the id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: `Collections is not valid`
            });
    }

    // Delete old image
    if (model.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);

        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    model.img = await uploadFile(req.files, { directory: collection });

    await model.save();

    res.json(model);
};

const showImage = async (req = request, res = response) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No exist a user with the id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No exist a product with the id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: `Collections is not valid`
            });
    }

    if (model.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);

        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }

    const pathNoImage = path.join(__dirname, '../public/images', 'no-image.jpg');

    if (fs.existsSync(pathNoImage)) {
        return res.sendFile(pathNoImage);
    }
    // res.json({ msg: 'Placeholder missed' });
};

const updateImageCloudinary = async (req = request, res = response) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No exist a user with the id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No exist a product with the id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: `Collections is not valid`
            });
    }

    // Delete old image
    if (model.img) {
        const imgSplit = model.img.split('/');
        const imgName = imgSplit[imgSplit.length - 1];
        const [ public_id ] = imgName.split('.'); // [asdfdsafa], [jpg]

        cloudinary.v2.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;

    try {
        const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath);

        model.img = secure_url;

        await model.save();

        res.json(model);

    } catch (error) {
        res.json(error);
    }
};

export {
    loadFile,
    showImage,
    updateImage,
    updateImageCloudinary
};
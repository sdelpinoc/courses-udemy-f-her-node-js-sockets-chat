import { request, response } from 'express'; // To use autocomplete(suggest functions of req and res)
import bcryptjs from 'bcryptjs';

import User from '../models/user.js'; // Will allow to create instances of the model

const usersGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const where = { status: true };

    // const users = await User.find(where)
    //     .skip(from)
    //     .limit(limit);

    // const total = await User.countDocuments(where);

    const [total, users] = await Promise.all([
        User.countDocuments(where),
        User.find(where)
            .skip(from)
            .limit(limit)
    ]);

    res.json({
        // msg: 'get API - controllers',
        total,
        users
        // result
    });
};

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    // TODO: validate in db
    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }

    // We add parameter new: true to return the updated object
    const user = await User.findByIdAndUpdate(id, rest, { new: true });

    res.json(user);
};

const usersPost = async (req, res = response) => {
    // The Content-Type of the request must be json
    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });

    // Encrypt password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    // Save the data in MongoDB
    await user.save();

    res.json(user);
};

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controllers'
    });
};

const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    const { uid, authenticatedUser } = req;

    // Delete from the db
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

    // res.json({ user, authenticatedUser, uid });
    res.json(user);
};

export {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
};
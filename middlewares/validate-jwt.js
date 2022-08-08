import { request, response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('jwt-token');
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: 'There is no jwt-token in the request'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATE_KEY);
        // console.log(payload);
        // {
        //     payload: '62df0cb5142319ee00cff76d', // user.uid
        //     iat: 1658867102, // creation date
        //     exp: 1658881502 // expiration date
        // }

        // Read user by id in mongodb
        const user = await User.findById(uid);
        // {
        //     name: 'Test 1',
        //     email: 'test1@email.com',
        //     role: 'ADMIN_ROLE',
        //     status: true,
        //     google: false,
        //     _id: new ObjectId("62def8450c05a19c9b1bd10c")
        // }

        if (!user) {
            return res.status(401).json({
                msg: `Invalid jwt-token - user no exists in db`
            });
        }

        // Check user status
        if (!user.status) {
            return res.status(401).json({
                msg: `Invalid jwt-token - user status: false`
            });
        }

        req.uid = uid;
        req.authenticatedUser = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid jwt-token'
        });
    }
};

export {
    validateJWT
};
import { request, response } from 'express';
import bycryptjs from 'bcryptjs';

import User from '../models/user.js';

import { generateJWT, googleVerify } from '../helpers/index.js';

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Check is email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: `User / Password is incorrect - Email`
            });
        }

        // Check is user is active
        if (!user.status) {
            return res.status(400).json({
                msg: `User / Password is incorrect - status: false`
            });
        }

        // Check password
        const validPassword = bycryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: `User / Password is incorrect - password invalid`
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'An unexpected error has ocurred'
        });
    }
};

const googleSignIn = async (req = request, res = response) => {
    const IDtoken = req.body['ID-token'];
    // console.log({IDtoken});

    try {
        const { name, email, picture: img } = await googleVerify(IDtoken);
        // console.log(googleUser);

        let user = await User.findOne({ email });

        // If user does not exist, we create it
        if (!user) {
            const data = {
                name,
                email,
                password: ':p',
                img,
                role: 'USER_ROLE',
                google: true
            };

            user = new User(data);
            await user.save();
        }

        // If the user exist but was deleted(status: false)
        if (!user.status) {
            res.status(401).json({
                msg: `User blocked, talk to the administador`
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        // if (!googleUser) {
        //     return res.status(500).json({
        //         msg: `Error in verify google authentication`
        //     });
        // }

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error in google authentication`
        });
    }
};

const renewJWT = async (req = request, res = response) => {
    const { authenticatedUser } = req;

    // Generate JWT
    const token = await generateJWT(authenticatedUser.id);

    res.json({
        authenticatedUser,
        token
    });
};

export {
    login,
    googleSignIn,
    renewJWT
};
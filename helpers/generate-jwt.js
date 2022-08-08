import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }; // object.uid

        jwt.sign(payload, process.env.SECRETORPRIVATE_KEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Token could not be generated');
            } else {
                resolve(token);
            }
        });

        // jwt.sign({
        //     data: payload
        // }, process.env.PRIVATE_KEY, { 
        //     expiresIn: '4h' 
        // }, (error, token) => {
        //     if (error) {
        //         console.log(error);
        //         reject('Token could not be generated');
        //     } else {
        //         resolve(token);
        //     }
        // });
    });
};

const checkJWT = async (token) => {
    try {
        if (token.length < 10) {
            return null;
        }

        // uid is in the payload of the token(we added it (the uid) when generating it)
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATE_KEY);

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

        return user;

    } catch (error) {
        return null;
    }
}

export {
    generateJWT,
    checkJWT
};
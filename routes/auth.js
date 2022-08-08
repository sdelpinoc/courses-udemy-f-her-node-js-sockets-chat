import { Router } from 'express';
import { body } from 'express-validator';

import { googleSignIn, login, renewJWT } from '../controllers/auth.js';
import { validateFields, validateJWT } from '../middlewares/index.js';

const routerAuth = Router();

routerAuth.post('/login', [
    body('email', 'Email is obligatory').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

routerAuth.post('/google', [
    body('ID-token', 'ID-token is obligatory').not().isEmpty(),
    validateFields
], googleSignIn);

routerAuth.get('/', [
    validateJWT,
    validateFields
], renewJWT);

export {
    routerAuth
};
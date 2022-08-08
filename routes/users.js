import { Router } from 'express';
import { body, param, query } from 'express-validator';

import {
    usersGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete } from '../controllers/users.js';

import { isValidRole, emailExists, existsUserById } from '../helpers/index.js';

import { validateFields, validateJWT, hasRole } from '../middlewares/index.js';

export const routerUsers = Router();

routerUsers.get('/',
    query('from', 'from must be a number').optional().isNumeric(),
    query('limit', 'limit must be a number').optional().isNumeric(),
    validateFields,
    usersGet
);

routerUsers.put('/:id',
    param('id', 'Is not a valid id').isMongoId().custom(existsUserById),
    body('name', 'Name is obligatory').not().isEmpty(),
    body('password', 'Password is too short').isLength({ min: 5 }),
    body('role').custom(isValidRole),
    validateFields,
    usersPut
);

// We add a middleware in the second argument, if we send several we use a array
routerUsers.post('/',
    body('name', 'Name is obligatory').not().isEmpty(),
    body('password', 'Password is too short').isLength({ min: 5 }),
    body('email', 'Email is not valid').isEmail().custom(emailExists),
    // body('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    body('role').custom(isValidRole), // role => isValidRole(role)
    validateFields,
    usersPost
);

routerUsers.patch('/', usersPatch);

// Another way of use the middleware functions
routerUsers.delete('/:id',
    [
        // param('id', 'Is not a valid id').isMongoId(),
        validateJWT,
        // isAdminRole,
        hasRole('ADMIN_ROLE', 'SALES_ROLE'),
        param('id', 'Id no exists in db').custom(existsUserById),
        validateFields
    ],
    usersDelete
);
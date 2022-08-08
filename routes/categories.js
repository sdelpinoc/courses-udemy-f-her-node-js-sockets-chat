import { Router } from 'express';
import { param, query, body } from 'express-validator';

import { validateFields, validateJWT } from '../middlewares/index.js';

import { 
    createCategory, 
    deleteCategory, 
    getCategories, 
    getCategory, 
    updateCategory 
} from '../controllers/categories.js';

import { existsCategoryById, existsCategoryByName } from '../helpers/db-validators.js';
import { isAdminRole } from '../middlewares/validate-roles.js';

const routerCategories = Router();

// Get all categories - public
routerCategories.get('/', [
    query('from').optional().isNumeric(),
    query('limit').optional().isNumeric(),
    validateFields
], getCategories);

// Get one category by id - public
routerCategories.get('/:id', [
    param('id').custom(existsCategoryById),
    validateFields
], getCategory);

// Create a category - private - access to all with a valid token(jwt)
routerCategories.post('/', [
    validateJWT,
    body('name', 'The name is obligatory').not().isEmpty().custom(existsCategoryByName),
    validateFields
], createCategory);

// Update a category by id - private - access to all with a valid token(jwt)
routerCategories.put('/:id', [
    validateJWT,
    param('id').custom(existsCategoryById),
    body('name').custom(existsCategoryByName),
    validateFields
], updateCategory);

// Delete a category by id - Admin with a valid token(jwt)
routerCategories.delete('/:id', [
    validateJWT,
    isAdminRole,
    param('id').custom(existsCategoryById),
    validateFields
] ,deleteCategory);

export {
    routerCategories
};
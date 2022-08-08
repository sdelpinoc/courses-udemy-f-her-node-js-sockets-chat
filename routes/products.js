import { Router } from 'express';
import { param, query, body } from 'express-validator';

import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';
import { existsCategoryById, existsProductById, existsProductByName } from '../helpers/index.js';

import { isAdminRole, validateFields, validateJWT } from '../middlewares/index.js';

const routerProducts = Router();

routerProducts.get('/', [
    query('from').optional().isNumeric(),
    query('limit').optional().isNumeric()
], getProducts);

routerProducts.get('/:id', [
    param('id').custom(existsProductById),
    validateFields
], getProduct);

routerProducts.post('/', [
    validateJWT,
    body('name').notEmpty().custom(existsProductByName),
    body('description').optional(),
    body('price').optional().isNumeric(),
    body('available').optional().isBoolean(),
    body('category').custom(existsCategoryById),
    validateFields
], createProduct);

routerProducts.put('/:id', [
    validateJWT,
    body('name').notEmpty().custom(existsProductByName),
    body('description').optional(),
    body('price').optional().isNumeric(),
    body('available').optional().isBoolean(),
    validateFields
], updateProduct);

routerProducts.delete('/:id', [
    validateJWT,
    isAdminRole,
    param('id').custom(existsProductById),
    validateFields
], deleteProduct);

export {
    routerProducts
};
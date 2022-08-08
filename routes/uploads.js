import { Router } from 'express';
import { param } from 'express-validator';

import { loadFile, showImage, updateImage, updateImageCloudinary } from '../controllers/uploads.js';
import { isValidMongoId, validCollections } from '../helpers/index.js';
import { validateFields, validateFileUpload } from '../middlewares/index.js';

const routerUploads = Router();

routerUploads.post('/', [
    validateFileUpload,
    validateFields
], loadFile);

routerUploads.put('/:collection/:id', [
    param('id', 'Invalid id').custom(id => isValidMongoId(id)),
    param('collection').custom(c => validCollections(c, ['users', 'products'])), // if we called the function this way, is necessary a return true(if its all ok)
    validateFileUpload,
    validateFields
], updateImageCloudinary);
// ], updateImage);

routerUploads.get('/:collection/:id', [
    param('id', 'Invalid id').custom(id => isValidMongoId(id)),
    param('collection').custom(c => validCollections(c, ['users', 'products'])), // if we called the function this way, is necessary a return true(if its all ok)
    // validateFileUpload,
    validateFields
], showImage);

export {
    routerUploads
};
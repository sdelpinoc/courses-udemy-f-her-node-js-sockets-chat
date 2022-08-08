import { validationResult } from 'express-validator';

const validateFields = (req, res, next) => {
    // Errors from express-validator used in js file from routes directory
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
        // return res.status(400).json({ errors: errors.array() });
    }

    // Is it ok, continue with the next function(or middleware)
    next();
};

const validateJSON = (err, req, res, next) => {
    console.log({err});
    // console.log({req});
    // console.log({res});
    // console.log({next});
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 400, message: err.message }); // Bad request
    }

    next();
};

export {
    validateFields,
    validateJSON
};

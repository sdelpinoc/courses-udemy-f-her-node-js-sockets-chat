import { request, response } from 'express';

const isAdminRole = (req = request, res = response, next) => {

    if (!req.authenticatedUser) {
        return res.status(500).json({
            msg: `You want to verify the role without having an authenticated user`
        });
    }

    const { role, name } = req.authenticatedUser;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not Administrator`
        });
    }

    next();
};

const hasRole = (...roles) => {
    return (req, res, next) => {

        if (!req.authenticatedUser) {
            return res.status(500).json({
                msg: `You want to verify the role without having an authenticated user`
            });
        }

        if (!roles.includes(req.authenticatedUser.role)) {
            return res.status(401).json({
                msg: `${req.authenticatedUser.role} is not a valid role`
            });
        }

        next();
    };
};

export {
    isAdminRole,
    hasRole
};
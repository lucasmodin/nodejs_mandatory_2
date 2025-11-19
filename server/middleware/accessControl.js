import { Roles } from '../constants/roles.js';

const simulatedUser = {
    username: "Titus",
    role: Roles.ADMIN
}

export function isUser(req, res, next) {
    const userRole = simulatedUser.role;

    if (userRole === Roles.USER || userRole === Roles.ADMIN) {
        req.user = simulatedUser;
        return next();
    }

    return res.status(403).send({
        error: "ACCESS DENIED: Insufficient clearance. " +
        "Unverified flesh detected. Awaiting approval from the Omnissiah."
    });
 
}

export function isAdmin(req, res, next) {
    const userRole = simulatedUser.role;

    if (userRole === Roles.ADMIN) {
        req.user = simulatedUser;
        return next();
    }

    return res.status(403).send({
        error: "ACCESS DENIED: Admin-tier authorization required. " +
        "Your credentials do not bear the sigil of the Mechanicus."
    });
}
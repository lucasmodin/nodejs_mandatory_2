import { Roles } from '../constants/roles.js';



export function isUser(req, res, next) {
    const sessionUser = req.session.user;

    if (!sessionUser) {
        return res.status(401).send({
            data: {
                error: "UNAUTHORIZED: No active session detected. Flesh lacks authorization."
            }
        });
    }

    if (sessionUser.role === Roles.USER || sessionUser.role === Roles.ADMIN) {
        req.user = sessionUser;
        return next();
    }

    return res.status(403).send({
        error: "ACCESS DENIED: Insufficient clearance. " +
        "Unverified flesh detected. Awaiting approval from the Omnissiah."
    });
 
}

export function isAdmin(req, res, next) {
    const sessionUser = req.session.user;

    if (!sessionUser) {
        return res.status(401).send({
            data: {
                error: "UNAUTHORIZED: No active session detected. Flesh lacks authorization."
            }
        });
    }

    if (sessionUser.role === Roles.ADMIN) {
        req.user = sessionUser
        return next();
    }

    return res.status(403).send({
        error: "ACCESS DENIED: Admin-tier authorization required. " +
        "Your credentials do not bear the sigil of the Mechanicus."
    });
}
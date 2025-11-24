import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../database/connection.js';
import { isUser } from '../middleware/accessControl.js';
import { sendEmail } from '../services/emailService.js';

const router = Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    //sqlite docs says db.get for a single row
    const user = await db.get(
        'SELECT * FROM users WHERE username = ?;', username    
    );

    if (!user) {
        return res.status(401).send({
            error: "ACCESS DENIED: No matching genetic imprint found."
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        return res.status(401).send({
            error: "ACCESS DENIED: Flesh authentication failed"
        });
    }

    req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    await sendEmail(
        user.username + "@example.com",
        "Omnissiah Login Verification",
        `
            <h1>+++ BINARY AUTH CONFIRMATION +++</h1>
            <p>Adept ${user.username},</p>
            <p>Your presence within the sacred system has been detected.</p>
            <p>Status: <b>DIVINE MACHINE SPIRIT – SATISFIED</b></p>
            <hr />
            <p>Glory to the Omnissiah.</p>
        `
    );

    return res.send({
        data: {
            message: "Login successful. The Omnissiah recognizes your presence",
            user: req.session.user
        }
    });
});

router.post("/logout", (req, res) => {

    if (!req.session.user) {
        return res.status(401).send({
            error: "UNAUTHORIZED: No active session to destroy"
        });
    }

    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.send({
            data: "You have been logged out. Machine Spirit slumbers"
        });
    });
});

router.get("/me", isUser, (req, res) => {
    res.send({
        data: {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role
        }
    });
});

export default router;


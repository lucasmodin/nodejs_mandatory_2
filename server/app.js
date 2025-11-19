import express from 'express';
import session from 'express-session';
import 'dotenv/config';
import authRouter from './routes/authRouter.js';
import apiRouter from "./routes/apiRouter.js";
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

// *************** util, limit and session setup

const app = express();
app.use(express.json());
app.use(helmet());

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: false,
    legacyHeaders: false
});

app.use(rateLimiter);
app.use("/auth", authLimiter);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// *************** routes

app.use("/auth", authRouter);
app.use("/api", apiRouter);

/*
app.get("/{*splat}", (req, res) => {
    res.send({ data: "Route not found. The Machine spirit does not recognize this path."})
})
*/



const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
});
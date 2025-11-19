import express from 'express';
import session from 'express-session';
import 'dotenv/config';

const app = express();


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


const PORT = Number(process.env.PORT) ||8080;

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
});
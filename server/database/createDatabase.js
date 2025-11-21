import db from './connection.js';
import bcrypt from 'bcryptjs';

const deleteMode = process.argv.includes('delete');

if (deleteMode) {
    db.exec("DROP TABLE IF EXISTS users");
}

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(200) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT CHECK( role IN("ADMIN", "USER") )
);    
`);

// seeding
if (deleteMode) {

    const admin = {
        username: "Titus",
        password: "fleshbad",
        role: "ADMIN"
    }

    const adminPasswordHash = await bcrypt.hash(admin.password, 12);

    const user = {
        username: "Servitor",
        password: "fleshbad",
        role: "USER"
    }

    const userPasswordHash = await bcrypt.hash(user.password, 12);


    db.run(`INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)`,
        admin.username, adminPasswordHash, admin.role);
    
    db.run(`INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)`,
        user.username, userPasswordHash, user.role);       
}
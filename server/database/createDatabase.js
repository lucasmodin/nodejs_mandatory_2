import db from './connection.js';

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


if (deleteMode) {

    const 


    db.run(`INSERT INTO users (username, password_hash, role) VALUES ()`)
}
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'hjl_site.db');

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

const initDb = () => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Table users created or already exists.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_email TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_email) REFERENCES users(email)
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Table posts created or already exists.');
        }
    });
};

initDb();

module.exports = db;

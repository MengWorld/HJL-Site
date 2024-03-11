const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'hjl_site.db')

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log('Connected to the hjl_site.db database.')
})

const initDb = () => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
};

initDb();

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const {username, password, email} = user;
        const sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;

        db.run(sql, [username, password, email], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({id: this.lastID});
            }
        });
    });
};

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE email = ?`;

        db.get(sql, [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE id = ?`;

        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });

}

module.exports = {createUser, findUserByEmail, findUserById};
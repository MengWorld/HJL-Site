const db = require('./dbInit');

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const {username, password, email} = user;
        const sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;

        db.run(sql, [username, password, email], function(err) {
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
};

module.exports = {createUser, findUserByEmail, findUserById};

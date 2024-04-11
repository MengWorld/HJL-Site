const db = require('./dbInit');

const getPosts = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM posts`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const createPost = (post) => {
    return new Promise((resolve, reject) => {
        const {userId, title, content} = post;
        const sql = `INSERT INTO posts (userId, title, content) VALUES (?, ?, ?)`;

        db.run(sql, [userId, title, content], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({id: this.lastID});
            }
        });
    });
};

module.exports = {getPosts, createPost};

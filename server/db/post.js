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
        const {user_email, title,  content} = post;
        const sql = `INSERT INTO posts (user_email, title, content) VALUES (?, ?)`;

        db.run(sql, [user_email, title, content], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({id: this.lastID});
            }
        });
    });
};

module.exports = {createPost, getPosts};

const express = require('express');
const { getPosts, createPost } = require('../db/post');

const router = express.Router();

router.get('/get-posts', async (req, res) => {
    try {
        const posts = await getPosts();
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.post('/create-post', async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const newPost = await createPost({userId, title, content});
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.toString());
    }
});

module.exports = router;

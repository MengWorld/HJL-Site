const express = require('express');
const { getPosts, addPost } = require('../db/post');

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
        const { title, content, userId } = req.body;
        const newPost = await addPost(title, content, userId);
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;

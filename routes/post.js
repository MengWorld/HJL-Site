const express = require("express")
const db = require('../db')
const router = express.Router()

router.get('/get-posts', async (req, res) => {
    const posts = await db.getPosts()
    res.status(200).send(posts)
})

router.post('/submit', async (req, res) => {
    const {email, message} = req.body;
    try {
        const result = await db.createPost({user_email: email, content: message});
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating post');
    }
})

module.exports = router
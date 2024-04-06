const express = require('express');
const bcrypt = require('bcrypt')

const {createUser, findUserByEmail} = require('../db/user');

const router = express.Router();

router.get('/check-login-status', (req, res) => {
    if (req.session.userId) {
        res.status(200).send({userId: req.session.userId, email: req.session.email, username: req.session.username})
        console.log(`${req.session.username}已登录`)
    } else {
        res.status(401).json({ message: "用户未登录" });
        console.log("用户未登录")
    }
})

router.post('/register', async (req, res) => {
    try {
        const {email, username, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await createUser({email, username, password: hashedPassword})
        res.status(200).send(result)
        console.log("注册成功")
    } catch (error) {
        console.error(error.message);
        res.status(500).send('注册用户时出错');
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await findUserByEmail(email)

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id
        req.session.email = user.email
        req.session.username = user.username
        console.log(`${user.username}登录成功`)
        res.status(200).send({message: `${user.username}登录成功`})
    } else {
        res.status(401).send({error: "邮箱或密码错误"})
    }
})

router.get('/logout', (req, res) => {
    try {
        req.session = null
        res.status(200).send({ message: '已成功注销' })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('注销时出错');
    }
})

module.exports = router;

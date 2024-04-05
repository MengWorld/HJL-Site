const express = require("express")
const bcrypt = require('bcrypt')
const db = require('../database/db.js')
const router = express.Router()

router.get('/get-user-info', (req, res) => {
    if (req.session.email) {
        res.status(200).send({email: req.session.email, username: req.session.username})
    } else {
        res.status(401).json({ message: "用户未登录" });
    }
})

router.post('/register', async (req, res) => {
    const {email, username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.createUser({email, username, password: hashedPassword})
    res.status(200).send(result)
    console.log("注册成功")
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await db.findUserByEmail(email)

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.email = user.email
        req.session.username = user.username
        console.log(`${user.username}登录成功`)
        res.status(200).send({message: `${user.username}登录成功`})
    } else {
        res.status(401).send({error: "邮箱或密码错误"})
    }
})

router.get('/logout', (req, res) => {
    req.session = null
    res.send({ message: '已成功注销' })
})

module.exports = router
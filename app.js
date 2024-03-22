const express = require('express')
const cookieSession = require('cookie-session')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

const bcrypt = require('bcrypt')
const db = require('./db')

app.use(express.static('./static'))
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get('/get-user-info', (req, res) => {
    if (req.session.email) {
        res.status(200).send({email: req.session.email, username: req.session.username})
    } else {
        res.status(401).json({ message: "用户未登录" });
    }
})

app.post('/register', async (req, res) => {
    const {email, username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    // 将用户信息保存到数据库
    const result = await db.createUser({email, username, password: hashedPassword})
    res.status(200).send(result)
    console.log("注册成功~")
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await db.findUserByEmail(email)

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.email = user.email
        req.session.username = user.username
        console.log(`${user.username}登录成功~`)
        res.status(200).send({message: `${user.username}登录成功~`})
    } else {
        res.status(401).send({error: "Email or password is incorrect"})
    }
})

app.get('/logout', (req, res) => {
    req.session = null;
    res.send({ message: '已成功注销' });
});


// 这里添加留言板帖子的CRUD路由


app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

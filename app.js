const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'secret'

const db = require('./db')
app.use(express.static('./static'))
app.use('/static', (req, res, next) => {
    const token = localStorage.getItem('token')
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).send({error: 'Unauthorized'})
        } else {
            next()
        }
    })
})


app.post('/register', async (req, res) => {
    const {email, username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    // 将用户信息保存到数据库
    const result = await db.createUser({email, username, password: hashedPassword})
    res.status(201).send(result)
    console.log("注册成功~")
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await db.findUserByEmail(email)

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: '0.01h'})

        if (typeof localStorage === "undefined" || localStorage === null) {
            let LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
        }
        localStorage.setItem('token', token);
        res.json({token, email: user.email});
        console.log(`${user.username}登录成功~`)
    } else {
        res.status(401).send({error: "Email or password is incorrect"})
    }
})

// 这里添加留言板帖子的CRUD路由


app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})
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

app.use(express.static('./static'))
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const user = require('./routes/user')
app.use("/user", user)

const post = require('./routes/post')
app.use("/post", post)

app.use((req, res) => {
    res.status(404).send("Sorry can't find that!")
})

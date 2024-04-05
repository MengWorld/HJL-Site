const express = require('express')
const cookieSession = require('cookie-session')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const apiRoutes = require('./routes/api')
app.use("/api", apiRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use((req, res) => {
    res.status(404).send("Sorry can't find that!")
})

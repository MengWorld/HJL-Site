const express = require('express');
const apiRouter = require('./api');
const cookieSession = require('cookie-session')
const cors = require('cors')
require('./db/dbInit')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000
}))

app.use('/api', apiRouter);
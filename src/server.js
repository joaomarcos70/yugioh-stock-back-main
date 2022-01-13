const express = require('express')
const app = express();
const PORT = 3000
const cors = require('cors')

app.use(express.json())
require('../config/dbStart')

corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const login = require('./controllers/Login')
app.use('/auth', login)

const users = require('./controllers/User')
app.use('/users', users )


app.listen(3000, function () {
    console.log(`Example app listening on port ${PORT}`);
});

module.exports = app
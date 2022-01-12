const express = require('express')
const app = express();
const PORT = 3000

app.use(express.json())
require('../config/dbStart')

const users = require('./controllers/User')
app.use('/users', users )

const login = require('./controllers/Login')
app.use('/auth', login)

app.listen(3000, function () {
    console.log(`Example app listening on port ${PORT}`);
});

module.exports = app
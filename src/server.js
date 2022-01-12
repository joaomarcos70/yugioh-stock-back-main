const express = require('express')
const app = express();
app.get('/', function (req, res) {
    res.send('hello world');
});

const PORT = 3000
app.listen(3000, function () {
    console.log(`Example app listening on port ${PORT}`);
});
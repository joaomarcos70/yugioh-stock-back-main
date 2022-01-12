const express = require('express');
const app = express();
app.get('/', function (req, res) {
    res.send('Última mensagem de Olá Mundo!');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
module.exports = app;
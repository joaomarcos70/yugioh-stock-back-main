var express = require('express')
var router = express.Router();
const LoginService = require('../services/login.service')

router.post('/login', async function (req, res) {
    try {
        let bodyLogin = req.body

        let canAccess = await LoginService.allowedLogin(bodyLogin)

        if (canAccess) {
            res.status(200).json('Acesso permitido!')
        } else {
            res.status(400).json('Usuário ou senha incorretos!')
        }

    } catch (error) {
        res.status(500).json('erro interno no servidor')
    }
});

module.exports = router
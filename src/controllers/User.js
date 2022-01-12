var express = require('express')
var router = express.Router();
const UserService = require('../services/User')


router.post('/create', async function (req, res) {
    try {
        let newUser = req.body
        const user = await UserService.create(newUser)
        res.status(201).json({ message: "Usuario criado com sucesso", user });

    } catch (error) {
        res.status(500).json({ message: "erro interno no servidor" })
    }
});

router.get('/get-all', async function (req, res) {
    try {
        const users = await UserService.getAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "erro interno no servidor" })
    }
})

router.get('/getUserByEmail', async function (req, res) {
    try {
        const emailUser = req.header.email

        const user = await UserService.findUserByEmail(emailUser)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "erro interno no servidor" })
    }
})

module.exports = router
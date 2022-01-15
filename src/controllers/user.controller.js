var express = require('express');
const { User } = require('../models/Users.model');
var router = express.Router();
const UserService = require('../services/user.service')


router.post('/create', async function (req, res) {
    try {
        let newUser = req.body
        const user = await UserService.create(newUser)
        res.status(201).json({ message: "Usuario criado com sucesso", user });

    } catch (error) {
        res.status(500).json({ message: error })
    }
});

router.put('/update', async function (req, res) {
    try {
        const id = req.params.id;
        const body = req.body;

        const updatedUser = await UserService.update(id, body)
        res.status(202).json({ message: "Usuario alterado com sucesso", updatedUser });
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/get-all', async function (req, res) {
    try {
        const users = await UserService.getAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/getUserByEmail', async function (req, res) {
    try {
        const emailUser = req.header.email

        const user = await UserService.findUserByEmail(emailUser)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.delete('/delete', async function (req, res) {
    try {
        const id = req.params.id
        await UserService.delete(id)
        res.status(204).json({ message: 'Usuário deletado com sucesso!' })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router
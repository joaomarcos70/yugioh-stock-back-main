var express = require('express')
var router = express.Router();
const UserService = require('../services/User')


router.post('/create', async function(req, res) {
    try {
        let newUser = req.body
        const user = await UserService.create(newUser)
        res.status(201).json({message:"Usuario criado com sucesso", user});
        
    } catch (error) {
        res.status(500).json({message:"erro interno no servidor"})
    }
});

module.exports = router
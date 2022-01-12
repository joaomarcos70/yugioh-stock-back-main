var express = require('express')
var router = express.Router();
const UserService = require('../services/User')


router.post('/create', async function(req, res) {
    let newUser = req.body
    const user = await UserService.create(newUser)
    res.status(201).json({message:"Usuario criado com sucesso", user});
});


module.exports = router
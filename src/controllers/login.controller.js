var express = require("express");
var router = express.Router();
const LoginService = require("../services/login.service");
const { generateToken } = require("../services/token.service");

router.post("/login", async function (req, res) {
	try {
		const bodyLogin = req.body;

		const response = await LoginService.allowedLogin(bodyLogin);

		if (!response.success) {
			return res.status(400).json({ message: "Usuário ou senha incorretos!" });
		}

		const token = generateToken(response.user);

		return res.status(200).json({ message: response.message, token });
	} catch (error) {
		res.status(500).json("erro interno no servidor");
	}
});

module.exports = router;

var express = require("express");
var router = express.Router();
const UserService = require("../services/user.service");
const { decodeToken } = require("../services/token.service");
const { removeBearer } = require("../helpers/remove-bearer");

router.get("/me", async function (req, res) {
	try {
		let token = req.headers.authorization;

		if (!token) {
			res.status(401).json({ message: "Token não informado" });
		}

		token = removeBearer(token);

		const userDecoded = decodeToken(token);

		if (!userDecoded) {
			res.status(401).json({ message: "Token inválido" });
		}
		return res.status(200).json(userDecoded);
	} catch (error) {}
});

router.post("/create", async function (req, res) {
	try {
		let newUser = req.body;
		const user = await UserService.create(newUser);
		res.status(201).json({ message: "Usuario criado com sucesso", user });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.put("/update/:id", async function (req, res) {
	try {
		const id = req.params.id;
		const body = req.body;

		const updatedUser = await UserService.update(id, body);
		res.status(202).json({ message: "Usuario alterado com sucesso", updatedUser });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAll", async function (req, res) {
	try {
		const users = await UserService.getAll();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getUserByEmail", async function (req, res) {
	try {
		const emailUser = req.header.email;

		const user = await UserService.findUserByEmail(emailUser);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.delete("/delete/:id", async function (req, res) {
	try {
		const id = req.params.id;
		await UserService.delete(id);
		res.status(204).json({ message: "Usuário deletado com sucesso!" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.post("/registerCollection/:id", async function (req, res) {
	try {
		const id = req.params.id;
		const infoCard = req.body;

		await UserService.registerCardOnCollection(id, infoCard);
		res.status(204).json({ message: "Carta adicionada a sua coleção ;)" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.post("/registerWants/:id", async function (req, res) {
	try {
		const id = req.params.id;
		const infoCard = req.body;

		await UserService.registerCardOnWants(id, infoCard);
		res.status(204).json({ message: "Carta adicionada a sua Wants ;)" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

module.exports = router;

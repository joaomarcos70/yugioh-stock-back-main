var express = require("express");
var router = express.Router();
const UserService = require("../services/user.service");
const { decodeToken } = require("../services/token.service");
const { removeBearer } = require("../helpers/remove-bearer");
const { authenticateToken } = require("../middleware/check-is-logged.middleware");
const e = require("express");

router.get("/me", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;

		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}

		let token = req.headers.authorization;

		if (!token) {
			return res.status(401).json({ message: "Token não informado" });
		}

		token = removeBearer(token);

		const userDecoded = decodeToken(token);

		if (!userDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		return res.status(200).json(userDecoded);
	} catch (error) {
		return res.status(500).json({ message: "Erro no servidor", error: error.message });
	}
});

router.post("/create", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;

		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}

		let newUser = req.body;
		const user = await UserService.create(newUser);
		res.status(201).json({ message: "Usuario criado com sucesso", user });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.put("/update/:id", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;

		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const id = req.params.id;
		const body = req.body;

		const updatedUser = await UserService.update(id, body);
		res.status(202).json({ message: "Usuario alterado com sucesso", updatedUser });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAll", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;
		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const users = await UserService.getAll();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getUserByEmail", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;

		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const emailUser = req.headers["email"];

		const user = await UserService.findUserByEmail(emailUser);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getDataById", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;
		console.log(tokenDecoded);
		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const userId = req.headers["id"];

		const user = await UserService.findUserById(userId);
		res.status(200).json({
			data: {
				cardCollection: user.cardCollection,
				wants: user.wants,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.delete("/delete/:id", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;

		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const id = req.params.id;
		await UserService.delete(id);
		res.status(204).json({ message: "Usuário deletado com sucesso!" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.post("/registerCollection", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;

		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const userId = req.headers["id"];
		const infoCard = req.body;

		await UserService.registerCardOnCollection(userId, infoCard);
		res.status(204).json({ message: "Carta adicionada a sua coleção ;)" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.post("/registerWants/:id", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;

		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const id = req.params.id;
		const infoCard = req.body;

		await UserService.registerCardOnWants(id, infoCard);
		res.status(204).json({ message: "Carta adicionada a sua Wants ;)" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

module.exports = router;

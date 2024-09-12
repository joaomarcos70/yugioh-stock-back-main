var express = require("express");
var router = express.Router();
const UserService = require("../services/user.service");
const { decodeToken } = require("../services/token.service");
const { removeBearer } = require("../helpers/remove-bearer");
const { authenticateToken } = require("../middleware/check-is-logged.middleware");
const e = require("express");
const path = require("path");
const { directorySet } = require("../helpers/directory-set");

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

router.post("/register-collection", authenticateToken, async function (req, res) {
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

router.post("/register-wants", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;

		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const id = req.headers["id"];
		const infoCard = req.body;

		await UserService.registerCardOnWants(id, infoCard);
		res.status(204).json({ message: "Carta adicionada a sua Wants ;)" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/collection", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;

		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const userId = req.headers["id"];

		const collection = await UserService.getCardCollection(userId);

		if (!collection.data) {
			return res.status(404).json({ message: "Coleção não encontrada" });
		}

		console.log("chega aqui");
		collectionWithImages = collection.data.map((card) => {
			const directory = directorySet(card.cardType);
			return {
				...card,
				cardImage: `${req.protocol}://${req.get("host")}/api/card-images/${directory}/${
					card.cardId
				}.jpg`,
			};
		});

		console.log(collectionWithImages);

		res.status(200).json({ data: collectionWithImages });
	} catch (error) {
		return res.status(500).json({ message: "Erro no servidor", error: error.message });
	}
});

router.get("/wants", authenticateToken, async function (req, res) {
	try {
		const tokenDecoded = req.tokenDecoded;

		if (!tokenDecoded) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const userId = req.headers["id"];

		const wants = await UserService.getCardWants(userId);

		if (!wants.data) {
			return res.status(404).json({ message: "Wants não encontradas" });
		}

		res.status(200).json({ data: wants.data });
	} catch (error) {
		return res.status(500).json({ message: "Erro no servidor", error: error.message });
	}
});

module.exports = router;

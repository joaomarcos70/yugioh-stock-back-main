var express = require("express");
var router = express.Router();
const filterCardService = require("../services/filterCard.service");
const { default: axios } = require("axios");
const path = require("path");
const { directorySet } = require("../helpers/directory-set");
const { authenticateToken } = require("../middleware/check-is-logged.middleware");

router.get("/getAllAttributes", async function (req, res) {
	try {
		const attributes = await filterCardService.getAllAttributeCards();
		res.status(200).json({ data: attributes });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAllRaces", async function (req, res) {
	try {
		let flagSearch = req.query.flag;
		const races = await filterCardService.getAllRaceCards(flagSearch);
		res.status(200).json({ data: races });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAllRarities", async function (req, res) {
	try {
		const raryties = await filterCardService.getAllRarityCards();
		res.status(200).json({ data: raryties });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAllTypes", async function (req, res) {
	try {
		let flagSearch = req.query.flag;
		const types = await filterCardService.getAllTypeCards(flagSearch);
		res.status(200).json({ data: types });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.use("/card-images", express.static(path.join(__dirname, "../card-images")));

router.get("/get-cards", authenticateToken, async function (req, res) {
	const tokenDecoded = req.tokenDecoded;

	if (!tokenDecoded) {
		return res.status(401).json({ message: "Token inválido" });
	}
	try {
		const filteredQuery = Object.fromEntries(
			Object.entries(req.query).filter(([_, value]) => value !== undefined)
		);
		const searchParams = new URLSearchParams(filteredQuery);
		const cards = await axios.get(`${process.env.YGO_API}?${searchParams.toString()}`);
		console.log(cards);
		if (!cards?.data || !cards?.data?.data) {
			return res.status(404).json({ message: "Cards não encontrados" });
		}

		cards.data.data.map((card) => {
			const directory = directorySet(card.type);
			card.card_images = card.card_images.map((image) => {
				const imgServer = `${req.protocol}://${req.get("host")}/api/card-images/${directory}/${
					card.id
				}.jpg`;
				return {
					image_url: imgServer,
				};
			});
		});

		res.status(200).json(cards.data);
	} catch (error) {
		if (error.response.status === 400) {
			return res.status(400).json({ message: "Cards não encontrados com esses filtros" });
		}
		res.status(500).json({ message: error });
	}
});

router.get("/next-or-prev", authenticateToken, async function (req, res) {
	const tokenDecoded = req.tokenDecoded;

	if (!tokenDecoded) {
		return res.status(401).json({ message: "Token inválido" });
	}
	try {
		const query = req.headers["query"];

		if (!query) {
			return res.status(400).json({ message: "Query não informada" });
		}

		const cards = await axios.get(query);

		if (!cards.data || !cards.data.data) {
			return res.status(404).json({ message: "Cards não encontrados" });
		}

		cards.data.data.map((card) => {
			const directory = directorySet(card.type);

			card.card_images = card.card_images.map((image) => {
				const imgServer = `${req.protocol}://${req.get("host")}/api/card-images/${directory}/${
					card.id
				}.jpg`;
				return {
					image_url: imgServer,
				};
			});
		});

		res.status(200).json(cards.data);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

module.exports = router;

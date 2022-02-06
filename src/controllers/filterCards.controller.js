var express = require("express");
var router = express.Router();
const filterCardService = require("../services/filterCard.service");

router.get("/getAll", async function (res) {
	try {
		const attributes = await filterCardService.getAllAttributeCards();
		res.status(200).json(attributes);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAll", async function (res) {
	try {
		const races = await filterCardService.getAllRaceCards();
		res.status(200).json(races);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAll", async function (res) {
	try {
		const raryties = await filterCardService.getAllRarityCards();
		res.status(200).json(raryties);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAll", async function (res) {
	try {
		const types = await filterCardService.getAllTypeCards;
		res.status(200).json(types);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

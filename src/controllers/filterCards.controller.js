var express = require('express');
var router = express.Router();
const filterCardService = require("../services/filterCard.service");

router.get("/getAllAttributes", async function (req,res) {
	try {
		const attributes = await filterCardService.getAllAttributeCards();
		res.status(200).json(attributes);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAllRaces", async function (req, res) {
	try {
		let flagSearch = req.query.flag
		const races = await filterCardService.getAllRaceCards(flagSearch);
		res.status(200).json(races);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAllRarities", async function (req,res) {
	try {
		const raryties = await filterCardService.getAllRarityCards();
		res.status(200).json(raryties);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/getAllTypes", async function (req, res) {
	try {
		let flagSearch = req.query.flag
		const types = await filterCardService.getAllTypeCards(flagSearch)
		res.status(200).json(types);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

module.exports = router
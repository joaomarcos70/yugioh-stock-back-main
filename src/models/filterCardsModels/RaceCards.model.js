const mongoose = require("mongoose");

const RaceCard = new mongoose.Schema({
	name: { type: String, required: true },
	value: { type: String, required: true }
});

module.exports.RaceCard = mongoose.model("raceCard", RaceCard);

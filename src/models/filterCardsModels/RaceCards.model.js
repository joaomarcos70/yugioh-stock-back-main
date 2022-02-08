const mongoose = require("mongoose");

const RaceCard = new mongoose.Schema({
	name: { type: String, required: true },
	value: { type: String, required: true },
	isSpell: { type:Boolean, required: true},
	isTrap: { type:Boolean, required: true}
});

module.exports.RaceCard = mongoose.model("raceCard", RaceCard);

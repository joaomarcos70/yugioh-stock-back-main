const mongoose = require("mongoose");

const RarityCard = new mongoose.Schema({
	name: { type: String, required: true },
	value: { type: String, required: true }
});

module.exports.RarityCard = mongoose.model("rarityCard", RarityCard);

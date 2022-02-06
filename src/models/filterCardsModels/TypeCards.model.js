const mongoose = require("mongoose");

const TypeCard = new mongoose.Schema({
	name: { type: String, required: true },
	value: { type: String, required: true }
});

module.exports.TypeCard = mongoose.model("typeCard", TypeCard);

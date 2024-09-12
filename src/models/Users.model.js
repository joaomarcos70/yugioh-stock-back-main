const mongoose = require("mongoose");

const User = new mongoose.Schema({
	name: { type: String, required: true },
	nickName: { type: String, required: false },
	email: { type: String, required: true },
	password: { type: String, required: true },
	cardCollection: [
		{
			cardId: { type: String, required: true },
			quantity: { type: Number, required: true },
			rarity: { type: String, required: true },
			idiom: { type: String, required: true },
			cardState: { type: String, required: true },
			price: { type: String, required: true },
			cardType: { type: String, required: true },
			cardName: { type: String, required: true },
		},
	],
	wants: [
		{
			cardId: { type: String, required: true },
			quantity: { type: Number, required: true },
			rarity: { type: String, required: false },
			idiom: { type: String, required: false },
			cardState: { type: String, required: false },
			cardType: { type: String, required: true },
			cardName: { type: String, required: true },
		},
	],
	typeRole: { type: String, default: "user" },
});

module.exports.User = mongoose.model("User", User);

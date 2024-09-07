const mongoose = require("mongoose");

const User = new mongoose.Schema({
	name: { type: String, required: true },
	nickName: { type: String, required: false },
	email: { type: String, required: true },
	password: { type: String, required: true },
	cardCollection: [
		{
			cardId: { type: String, required: false },
			quantity: { type: Number, required: false },
			rarity: { type: String, required: false },
			idiom: { type: String, required: false },
			cardState: { type: String, required: false },
			price: { type: String, required: false },
		},
	],
	wants: [
		{
			cardId: { type: String, required: false },
			quantity: { type: Number, required: false },
			rarity: { type: String, required: false },
			idiom: { type: String, required: false },
		},
	],
	typeRole: { type: String, default: "user" },
});

module.exports.User = mongoose.model("User", User);

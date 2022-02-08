const mongoose = require("mongoose");

const AttributeCard = new mongoose.Schema({
	name: { type: String, required: true },
	value: { type: String, required: true }
});

module.exports.AttributeCard = mongoose.model("attributeCard", AttributeCard);

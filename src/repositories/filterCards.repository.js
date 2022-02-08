const Attribute = require("../models/filterCardsModels/AttributeCards.model").AttributeCard;
const Race = require("../models/filterCardsModels/RaceCards.model").RaceCard;
const Rarity = require("../models/filterCardsModels/RarityCards.model").RarityCard;
const Type = require("../models/filterCardsModels/TypeCards.model").TypeCard;

exports.getAllAttributes = async () => {
	return await Attribute.find().sort({
		name: 1,
	});
};

exports.getAllRaces = async (flag) => {
	try {
		if (flag && flag == "spell") {
			return await Race.find({
				isSpell: true,
			}).sort({
				name: 1,
			});
		} else if (flag && flag == "trap") {
			return await Race.find({
				isTrap: true,
			}).sort({
				name: 1,
			});
		} else {
			return await Race.find({
				isTrap: false,
				isSpell: false,
			}).sort({
				name: 1,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

exports.getAllRarities = async () => {
	return await Rarity.find().sort({
		name: 1,
	});
};

exports.getAllTypes = async (isExtra) => {
	if (isExtra) {
		return await Type.find({
			isExtra: true,
		}).sort({
			name: 1,
		});
	} else {
		return await Type.find().sort({
			name: 1,
		});
	}
};

const filterCardsRepository = require("../repositories/filterCards.repository");

exports.getAllAttributeCards = async () => {
	try {
		return await filterCardsRepository.getAllAttributes();
	} catch (error) {
		console.log(error);
	}
};
exports.getAllRaceCards = async (flag) => {
	console.log(flag);
	try {
		return await filterCardsRepository.getAllRaces(flag);
	} catch (error) {
		console.log(error);
	}
};
exports.getAllRarityCards = async () => {
	try {
		return await filterCardsRepository.getAllRarities();
	} catch (error) {
		console.log(error);
	}
};
exports.getAllTypeCards = async (isExtra) => {
	try {
		return await filterCardsRepository.getAllTypes(isExtra);
	} catch (error) {
		console.log(error);
	}
};

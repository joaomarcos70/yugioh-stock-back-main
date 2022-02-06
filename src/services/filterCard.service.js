const filterCardsRepository = require("../repositories/filterCards.repository");

exports.getAllAttributeCards = async () => {
	try {
		return await filterCardsRepository.getAllAttributes();
	} catch (error) {
		console.log(error);
	}
};
exports.getAllRaceCards = async () => {
	try {
		return await filterCardsRepository.getAllRaces();
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
exports.getAllTypeCards = async () => {
	try {
		return await filterCardsRepository.getAllTypes;
	} catch (error) {
		console.log(error);
	}
};

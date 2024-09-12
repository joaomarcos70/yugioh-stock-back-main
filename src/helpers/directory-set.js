directorySet = (type) => {
	let directory = "";
	if (type.includes("Monster")) {
		directory = "monster";
	} else if (type.includes("Spell")) {
		directory = "spell";
	} else if (type.includes("Trap")) {
		directory = "trap";
	}
	return directory;
};

module.exports = {
	directorySet,
};

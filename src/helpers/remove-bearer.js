removeBearer = (token) => {
	console.log(token.replace("Bearer ", ""));
	return token.replace("Bearer ", "");
};

module.exports = { removeBearer };

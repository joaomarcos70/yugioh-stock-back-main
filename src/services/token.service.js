const jwt = require("jsonwebtoken");

generateToken = (user) => {
	const token = jwt.sign(
		{
			id: user._id,
			email: user.email,
			name: user.name,
			nick: user.nickName,
		},
		process.env.SECRET,
		{
			expiresIn: 86400,
		}
	);
	return token;
};

decodeToken = (token) => {
	const decode = jwt.verify(token, process.env.SECRET);
	return decode;
};

module.exports = {
	generateToken,
	decodeToken,
};

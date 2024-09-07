authenticateToken = (req, res, next) => {
	const token = req.headers["authorization"];
	if (!token) {
		return res.status(401).json({ message: "Acesso negado" });
	}
	const formattedToken = token && token.split(" ")[1];

	jwt.verify(formattedToken, process.env.SECRET, (err, tokenDecoded) => {
		if (err) {
			return res.status(403).json({ message: "Token inválido" });
		}
		req.tokenDecoded = tokenDecoded;
		next();
	});
};

module.exports = { authenticateToken };

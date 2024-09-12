const User = require("../models/Users.model").User;

exports.createUser = async (newUser) => {
	try {
		const user = new User(newUser);
		return await user.save();
	} catch (error) {
		console.log(error);
	}
};

exports.updateUser = async (id, body) => {
	return await User.findOneAndUpdate(
		{
			_id: id,
		},
		body
	);
};

exports.deleteUser = async (id) => {
	return await User.findOneAndRemove({
		_id: id,
	});
};

exports.findUserByEmail = async (email) => {
	return await User.findOne({ email: email });
};

exports.findUserById = async (userId) => {
	return await User.findOne({ _id: userId });
};

exports.getAll = async () => {
	return await User.find().sort({
		email: 1,
	});
};

exports.updateCardCollection = async (userId, card) => {
	const user = await User.findOne({ _id: userId });

	if (!user) {
		return { message: "Usuário não encontrado", status: 404 };
	}

	const hasCard = user.cardCollection.find((c) => c.cardId === card.cardId);

	if (hasCard) {
		hasCard.quantity++;
		return user.save();
	}

	user.cardCollection.push({
		cardId: card.cardId,
		quantity: card.cardCount,
		rarity: card.cardRarity,
		idiom: card.cardLanguage,
		cardState: card.cardState,
		price: card.cardPrice,
		cardType: card.cardType,
		cardName: card.cardName,
	});

	return user.save();
};

exports.updateCardWants = async (id, card) => {
	const user = await User.findOne({ _id: id });
	if (user) {
		for (let c of user.wants) {
			if (c.cardId == card.cardId) {
				c.quantity++;
				return user.save();
			}
		}
		user.wants.push(card);
		return user.save();
	}
};

exports.getCardCollection = async (userId) => {
	const user = await User.findOne({ _id: userId }).lean();

	if (!user) {
		return { message: "Usuário não encontrado", status: 404 };
	}

	return { data: user.cardCollection };
};
exports.getCardWants = async (userId) => {
	const user = await User.findOne({ _id: userId }).lean();

	if (!user) {
		return { message: "Usuário não encontrado", status: 404 };
	}

	return { data: user.wants };
};

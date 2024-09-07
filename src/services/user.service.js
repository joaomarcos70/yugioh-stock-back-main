const UserRepository = require("../repositories/user.repository");
const { isEmpty, isUndefined } = require("lodash");
const { json } = require("express/lib/response");

exports.create = async (newUser) => {
	try {
		if (isEmpty(newUser)) {
			return Promise.reject("verifique se preencheu os os campos obrigatórios!").catch((err) => {
				throw new Error(err);
			});
		}

		let userEmail = newUser.email;
		let userByEmail = await UserRepository.findUserByEmail(userEmail);

		if (userByEmail) {
			return Promise.reject("Usuário já cadastrado na base!").catch((err) => {
				throw new Error(err);
			});
		}

		await UserRepository.createUser(newUser);
	} catch (error) {
		console.log(error);
	}
};

exports.update = async (id, body) => {
	try {
		if (isEmpty(body) || isUndefined(id)) {
			return Promise.reject("verifique se preencheu os os campos obrigatórios!").catch((err) => {
				throw new Error(err);
			});
		}

		await UserRepository.updateUser(id, body);
	} catch (error) {
		return json({ message: error });
	}
};

exports.delete = async (id) => {
	try {
		if (isUndefined(id)) {
			return Promise.reject("verifique se o id do usuario é valido").catch((err) => {
				throw new Error(err);
			});
		}
		await UserRepository.deleteUser(id);
	} catch (error) {
		return json({ message: error });
	}
};

exports.getAll = async () => {
	try {
		return await UserRepository.getAll();
	} catch (error) {
		console.log(error);
	}
};

exports.findUserByEmail = async (emailUser) => {
	try {
		return await UserRepository.findUserByEmail(emailUser);
	} catch (error) {
		console.log(error);
	}
};
exports.findUserById = async (userId) => {
	try {
		return await UserRepository.findUserById(userId);
	} catch (error) {
		console.log(error);
	}
};

exports.registerCardOnCollection = async (userId, cardInfo) => {
	try {
		console.log(userId, cardInfo);
		return await UserRepository.updateCardCollection(userId, cardInfo);
	} catch (error) {
		return json({ message: error });
	}
};

exports.registerCardOnWants = async (id, cardInfo) => {
	try {
		return await UserRepository.updateCardWants(id, cardInfo);
	} catch (error) {
		return json({ message: error });
	}
};

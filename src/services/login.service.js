const UserRepository = require("../repositories/user.repository");

exports.allowedLogin = async (userBody) => {
	try {
		let password = userBody.password;
		let email = userBody.email;

		const user = await UserRepository.findUserByEmail(email);
		if (!user) {
			return { success: false, message: "Usuário não encontrado!" };
		}

		if (user.password === password && user.email === email) {
			return { success: true, message: "Acesso permitido!", user };
		}
	} catch (error) {
		return { success: false, message: "Erro interno no servidor" };
	}
};

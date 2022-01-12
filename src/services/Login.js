const UserRepository = require('../repositories/User');

exports.allowedLogin = async (userBody) => {
    try {
        let password = userBody.password;
        let email = userBody.email
        
        const user = await UserRepository.findUserByEmail(email)
        if (user) {
            if (password === user.password && email === user.email)
                return true
        }
    } catch (error) {
        console.log(error);
    }
}
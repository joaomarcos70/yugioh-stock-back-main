const UserRepository = require('../repositories/User')
const { isEmpty } = require('lodash')

exports.create = async (newUser) => {
    try {
        if (isEmpty(newUser)) {
            return Promise.reject("verifique se preencheu os os campos obrigatórios!").catch(err => {
                throw new Error(err)
            })
        }

        let userEmail = newUser.email
        let userByEmail = await UserRepository.findUserByEmail(userEmail)

        if (userByEmail) {
            return Promise.reject("Usuário já cadastrado na base!").catch(err => {
                throw new Error(err)
            })
        }

        await UserRepository.createUser(newUser)
    } catch (error) {
        console.log(error);
    }
}
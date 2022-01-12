require('dotenv').config()

module.exports = {
    mongodb: {
        uri: 'mongodb://localhost:27017/yugiohStock',
        options: {
            user: 'admin',
            pass: 'admin',
            useMongoClient: true
        }
    }
}
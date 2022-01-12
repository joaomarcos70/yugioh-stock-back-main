require('dotenv').config()

module.exports = {
    mongodb: {
        uri: 'mongodb://localhost:27017/yugiohStock',
        options: {
            user: 'root',
            pass: 'root',
            useMongoClient: true
        }
    }
}
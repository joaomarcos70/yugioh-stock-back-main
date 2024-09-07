const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const configDB = {
	uri: "mongodb://127.0.0.1:27017/yugiohStock",
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true, // Adicione essa linha para o novo mecanismo de descoberta de servidores
	},
};

const mongoConnection = mongoose.connect(configDB.uri, configDB.options);

mongoConnection.then(
	(db) => console.log("\x1b[36m%s\x1b[0m", "MongoDB successfully connected"),
	(err) => console.log("\x1b[33m%s\x1b[0m", "Error while connecting to mongodb: ", err)
);

module.exports = {
	MongoConnection: mongoConnection,
};

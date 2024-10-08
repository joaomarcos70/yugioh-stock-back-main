const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
require("../config/dbStart");

corsOptions = {
	origin: "http://localhost:4200",
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const login = require("./controllers/login.controller");
app.use("/auth", login);

const users = require("./controllers/user.controller");
app.use("/users", users);

const filterCards = require("./controllers/filterCards.controller");
app.use("/api", filterCards);

app.listen(3000, function () {
	console.log(`app listening on port ${PORT}`);
});

module.exports = app;

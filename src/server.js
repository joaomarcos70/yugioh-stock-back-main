const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
require("../config/dbStart");
const { downloadAllImages, updateNewImages } = require("./services/download-cards.service");
const cron = require("node-cron");

corsOptions = {
	origin: "http://localhost:4200",
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//downloadAllImages();

cron.schedule("0 0 * * 0", () => {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();
	const startDate = `${currentYear}-${currentMonth + 1}-01`;
	updateNewImages(startDate);
});

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

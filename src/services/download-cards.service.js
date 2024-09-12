const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function downloadCardImage(url, filePath) {
	const writer = fs.createWriteStream(filePath);

	const response = await axios({
		url,
		method: "GET",
		responseType: "stream",
	});

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on("finish", resolve);
		writer.on("error", reject);
	});
}

async function downloadAllImages() {
	const apiUrl = process.env.YGO_API;

	try {
		const response = await axios.get(apiUrl);
		const cards = response.data.data;

		for (const card of cards) {
			const imageUrl = card.card_images[0].image_url;
			const cardId = card.id;
			let localImagePath = null;

			if (card.type.includes("Monster")) {
				localImagePath = path.join(__dirname, "../card-images/monster", `${cardId}.jpg`);
			}
			if (card.type.includes("Spell")) {
				localImagePath = path.join(__dirname, "../card-images/spell", `${cardId}.jpg`);
			}
			if (card.type.includes("Trap")) {
				localImagePath = path.join(__dirname, "../card-images/trap", `${cardId}.jpg`);
			}

			if (localImagePath !== null && !fs.existsSync(localImagePath)) {
				const dir = path.dirname(localImagePath);
				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir, { recursive: true });
				}
				await downloadCardImage(imageUrl, localImagePath);
				console.log(`Imagem do card ${card.name} baixada.`);
			} else {
				console.log(`Imagem do card ${card.name} já está baixada.`);
			}
		}

		console.log("Todas as imagens foram baixadas!");
	} catch (err) {
		console.error("Erro ao buscar ou baixar imagens:", err);
	}
}

async function updateNewImages(startDate) {
	const apiUrl = `${process.env.YGO_API}?startdate=${startDate}`;

	try {
		const response = await axios.get(apiUrl);
		const cards = response.data.data;

		for (const card of cards) {
			const imageUrl = card.card_images[0].image_url;
			const cardId = card.id;
			let localImagePath = null;

			if (card.type.includes("Monster")) {
				localImagePath = path.join(__dirname, "../card-images/monster", `${cardId}.jpg`);
			}
			if (card.type.includes("Spell")) {
				localImagePath = path.join(__dirname, "../card-images/spell", `${cardId}.jpg`);
			}
			if (card.type.includes("Trap")) {
				localImagePath = path.join(__dirname, "../card-images/trap", `${cardId}.jpg`);
			}

			if (!fs.existsSync(localImagePath)) {
				await downloadCardImage(imageUrl, localImagePath);
				console.log(`Imagem do card ${card.name} (lançado em ${card.d}) baixada.`);
			} else {
				console.log(`Imagem do card ${card.name} já está baixada.`);
			}
		}

		console.log("Imagens atualizadas com novos lançamentos!");
	} catch (err) {
		console.error("Erro ao buscar ou baixar novas imagens:", err);
	}
}

module.exports = {
	downloadAllImages,
	updateNewImages,
};

const { scrapeIMDb } = require("./controllers/imdbController");
const keyword = process.argv[2];

if (!keyword) {
  console.error(
    "❌ Missing search keyword.\nPlease provide a genre or keyword to search.\nExample:\n  👉 npm start comedy \n  👉 npm start action"
  );
  process.exit(1);
}

scrapeIMDb(keyword);

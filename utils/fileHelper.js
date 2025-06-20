const fs = require("fs");

const writePaginatedJSON = (data, pageSize = 5) => {
  for (let i = 0; i < data.length; i += pageSize) {
    const page = data.slice(i, i + pageSize);
    const pageNum = i / pageSize + 1;
    fs.writeFileSync(`page${pageNum}.json`, JSON.stringify(page, null, 2));
    console.log(`✅ page${pageNum}.json created`);
  }
};

module.exports = { writePaginatedJSON };

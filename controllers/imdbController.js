const request = require("request-promise");
const cheerio = require("cheerio");
const { writePaginatedJSON } = require("../utils/fileHelper");

const scrapeIMDb = async (keyword) => {
  const searchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(
    keyword
  )}&s=tt&ttype=ft&ref_=fn_ft`;

  try {
    const response = await request({
      uri: searchUrl,
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(response);
    const movieLinks = [];

    $("a.ipc-metadata-list-summary-item__t").each((i, el) => {
      const href = $(el).attr("href");
      if (href?.startsWith("/title/")) {
        const fullUrl = `https://www.imdb.com${href.split("?")[0]}`;
        movieLinks.push(fullUrl);
      }
    });

    const uniqueMovieLinks = [...new Set(movieLinks)].slice(0, 15);

    if (uniqueMovieLinks.length === 0) {
      console.warn("⚠️ No movie URLs found.");
      return;
    }

    const imdbData = [];

    for (let url of uniqueMovieLinks) {
      try {
        const response = await request({
          uri: url,
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept-Language": "en-US,en;q=0.9",
          },
          gzip: true,
        });

        const $ = cheerio.load(response);

        const title =
          $('div[class="sc-f9ad6c98-0 bqDcCk"]>h1>span').text().trim() || "N/A";

        const releaseYear =
          $("div.sc-42c2285c-3.fEamwA ul li a").first().text().trim() || "N/A";

        const rating =
          $('span[data-testid*="rating"] span').first().text().trim() || "N/A";

        const summary =
          $('span[data-testid="plot-l"]').first().text().trim() ||
          $('span[data-testid="plot-xl"]').first().text().trim() ||
          "N/A";

        const directors =
          [
            ...new Set(
              $(
                'li[data-testid="title-pc-principal-credit"]:contains("Director") a'
              )
                .map((i, el) => $(el).text().trim())
                .get()
            ),
          ].join(", ") || "N/A";

        const cast =
          $('a[data-testid="title-cast-item__actor"]')
            .slice(0, 5)
            .map((i, el) => $(el).text().trim())
            .get()
            .join(", ") || "N/A";

        imdbData.push({ title, releaseYear, rating, directors, cast, summary });
      } catch (err) {
        console.error(`❌ Failed to fetch ${url}:`, err.message);
      }
    }

    if (imdbData.length === 0) {
      console.warn("⚠️ No IMDb data collected.");
    } else {
      writePaginatedJSON(imdbData, 5);
    }
  } catch (err) {
    if (err.statusCode === 429) {
      console.error("🚫 Rate limit hit. Please slow down your requests.");
    } else {
      console.error("❌ Error scraping IMDb:", err.message);
    }
  }
};

module.exports = { scrapeIMDb };

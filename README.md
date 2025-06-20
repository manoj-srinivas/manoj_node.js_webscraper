# 🎬 IMDb Movie Scraper (Node.js)

A simple and powerful Node.js command-line tool to scrape movie details from IMDb using a keyword (e.g., "comedy", "action", "romance") and store the results in paginated `.json` files.

-------------------------------------------------------

## 📖 What This Tool Does

- Takes a **search keyword** from the terminal.
- Searches IMDb for that keyword (e.g., `npm start comedy`).
- Extracts basic details about the movies found:
  - Title
  - Release Year
  - IMDb Rating
  - Director(s)
  - Cast
  - Summary
- Saves this movie data into multiple `.json` files (5 movies per file).

----------------------------------------------------------------------------------------------------------------------------

## 🧰 Tech Stack Used

This project uses the following technologies, each chosen for a specific purpose in building a CLI web scraper:

| Component           | Category    | What It’s Used For                                                                   |
| ------------------- | ----------- | ------------------------------------------------------------------------------------ |
| **request-promise** | HTTP Client | Sends HTTP requests to IMDb to fetch the HTML content of the search results page.    |
| **cheerio**         | HTML Parser | Parses the HTML response and extracts relevant movie data (title, rating, etc.).     |
| **fs**              | File System | Node.js built-in module used to write the extracted movie data into `.json` files.   |
| **process.argv**    | CLI Input   | Captures user input from the terminal (e.g., `npm start comedy`) to pass as keyword. |
| **nodemon**         | Dev Tool    | Automatically restarts the script during development when changes are detected.      |
| **JSON**            | Data Format | Used to store structured movie data in a clean, readable, and transferable format.   |

---

### 🔍 Justification for Each Tool

- **request-promise**: Lightweight and easy-to-use HTTP client for sending requests and handling responses in a promise-based manner.
- **cheerio**: Efficient and fast HTML parser that mimics jQuery syntax, making it simple to select and extract HTML elements from the IMDb page.
- **fs**: No external library needed—Node.js provides this module to read/write files directly on the filesystem.
- **process.argv**: Allows users to run the scraper using dynamic keywords via command-line, making the tool flexible.
- **nodemon**: Speeds up development by eliminating the need to manually restart the script after changes.
- **JSON**: Ideal for storing and working with structured movie data that can be reused or integrated with other apps or APIs.

---------------------------------------------------------------------------------------------------------

## 🛠️ Installation & Setup

Follow these steps to set up and run the IMDb Movie Scraper on your local machine:

### . 📦 Clone the Repository

First, clone the project using Git:

```bash
git clone https://github.com/manoj-srinivas/manoj_node.js_webscraper.git
cd .\manoj_node.js_webscraper-main\
#  Install Project Dependencies
npm install

# Run the Scraper

npm start comedy

----------------------------------------------------------------------------------------------------------------------

## 📂 Folder Structure

imdb-scraper/
├── server.js # Main scraper logic
├── package.json # Project metadata and dependencies
├── page1.json # Output file (auto-generated)
├── page2.json # Output file (auto-generated)
└── README.md # You're reading it 🙂
--------------------------------------------------------------------------------------------------------------------------

**Output Format**
Each output file contains up to 5 # movies in JSON format.

Example: page1.json
[
  {
    "title": "The King of Comedy",
    "releaseYear": "1982",
    "rating": "7.8",
    "directors": "Martin Scorsese",
    "cast": "Robert De Niro, Jerry Lewis, Diahnne Abbott, Sandra Bernhard, Ed Herlihy",
    "summary": "Rupert is an aspiring stand-up comedian, who is willing to go the extra mile...."
  },
]
----------------------------------------------------------------------------------------------------------------


## ✅ Bonus Features Implemented

To make this tool more robust, efficient, and user-friendly, the following advanced features have been added:

---

### 1. 🛑 Error Handling and Logging

- Comprehensive `try-catch` blocks are used to catch and log any unexpected errors.
- Gracefully handles scenarios like:
  - Network errors
  -  request failures
  - Missing or malformed data in IMDb pages
- Console logging provides meaningful feedback for debugging and monitoring.

---

### 2. ⚡ Asynchronous Programming for Better Performance

- Utilizes `async/await`, asynchronous HTTP requests.
- Keeps the code clean, readable, and maintainable.

---

### 3. 📥 User Input via terminal

- Allows dynamic input of search keyword (genre, title, etc.) directly from the terminal.
- Example usage:
  ```bash
  npm start comedy

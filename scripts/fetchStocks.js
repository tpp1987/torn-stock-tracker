const fs = require("fs");

const API_KEY = process.env.TORN_API_KEY;
const URL = `https://api.torn.com/torn/?selections=stocks&key=${API_KEY}`;

async function fetchStocks() {
  try {
    const res = await fetch(URL);
    const data = await res.json();

    const timestamp = new Date().toISOString();

    const snapshot = {
      timestamp,
      stocks: data.stocks
    };

    const filePath = "data/stocks.json";

    let existing = [];

    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath));
    }

    existing.push(snapshot);

    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    console.log("Stock data updated:", timestamp);

  } catch (err) {
    console.error("Error fetching stocks:", err);
  }
}

fetchStocks();

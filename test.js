const cheerio = require("cheerio");
const fs = require("fs");

try {
  const html = fs.readFileSync("indown_result.html", "utf8");
  const $ = cheerio.load(html);

  console.log("=== Text content of #result ===");
  console.log($('#result').text().trim());

  console.log("\n=== Text content of .row ===");
  $('.row').each((idx, el) => {
    console.log(`Row ${idx}:`, $(el).text().trim().substring(0, 300));
  });

} catch (err) {
  console.error("Error reading file:", err.message);
}

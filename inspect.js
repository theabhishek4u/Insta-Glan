const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('embed.html', 'utf8');
const $ = cheerio.load(html);

console.log('Title:', $('title').text());
console.log('H1:', $('h1').text());
console.log('H2:', $('h2').text());
console.log('Text content (first 500 chars):', $('body').text().trim().substring(0, 500));

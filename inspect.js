const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('indown_story_result.html', 'utf8');
const $ = cheerio.load(html);

// Print ALL script tags (even if not matching keywords)
console.log('Total script tags:', $('script').length);
$('script').each(function(idx) {
  const src = $(this).attr('src');
  const text = $(this).html() || '';
  if (src) {
    console.log(`Script ${idx}: external src="${src}"`);
  } else if (text.length > 50) {
    console.log(`Script ${idx}: inline (${text.length} chars) - first 500:`);
    console.log(text.substring(0, 500));
    console.log('---');
  }
});

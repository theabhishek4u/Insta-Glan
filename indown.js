const axios = require('axios');
const cheerio = require('cheerio');

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

async function test() {
  try {
    const response = await axios.get('https://indown.io/', {
      headers: BROWSER_HEADERS
    });
    
    const $ = cheerio.load(response.data);
    
    console.log('Indown Form HTML:');
    $('form').each((idx, el) => {
      console.log($(el).html());
      console.log('Action:', $(el).attr('action'));
      console.log('Method:', $(el).attr('method'));
    });
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
